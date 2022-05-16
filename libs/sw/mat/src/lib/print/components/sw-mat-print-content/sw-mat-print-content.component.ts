import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SwBaseComponent } from 'sw-ng';
import { SwPrintSize, SwPrintStandards, SwPrintType, SwPrintModes } from 'sw-common';
import { SwMatDialogService } from '../../../utils';

@Component({
  selector: 'sw-mat-print-content',
  templateUrl: './sw-mat-print-content.component.html',
  styleUrls: ['./sw-mat-print-content.component.scss']
})
export class SwMatPrintContentComponent extends SwBaseComponent implements OnInit, AfterViewInit {

  printing: boolean;

  private printHTML: string;
  private printWindow: Window;
  private printDoc: Document;
  private printCSS: string[];

  @Input() mode: SwPrintModes = SwPrintModes.IFRAME;

  @Input() printType: SwPrintType = SwPrintType.PORTRAIT;
  @Input() printSize: SwPrintSize = SwPrintSize.A4;
  @Input() printTitle = '';
  @Input() btnText = this.translate.instant('PRINT');
  @Input() printStyle: string;
  @Input() standard = SwPrintStandards.HTML5;
  @Input() isShowIcon = false;
  @Input() isShowButton = true;
  @Input() file = [];

  @Input()
  set isPrint(value) {
    if (value) {
      this.print();
    }
  }
  @Input() printFrameClassName = 'print-frame';

  @Output() printComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() printPrePare: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild('printData') printData;

  constructor(
    private translate: TranslateService,
    private dialogService: SwMatDialogService,
    private el: ElementRef,
    private render: Renderer2
  ) {
    super();

    this.printing = false;

    this.mode = SwPrintModes.IFRAME;
  }

  ngOnInit() {
    this.printCSS = [
      'assets/styles/prints/print.css'
    ];

    this.printCSS = this.printCSS.concat(this.file);
  }

  ngAfterViewInit() {
    this.printData.isDataReady.pipe(takeUntil(this.destroyed$)).subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.printHTML = this.el.nativeElement.querySelector('.print-only').children[0].innerHTML;
          const timeoutId: number = window.setTimeout(() => {
            window.clearTimeout(timeoutId);
            this.getPrintWindow();
            this.write();
            this.startPrint();
          }, 500);
        }, 0);
      } else {
        this.error();
      }
    });
  }

  print() {
    this.printing = true;
    this.printPrePare.emit(true);
  }

  private write(): any {
    this.printDoc.open();
    this.printDoc.write(`${this.docType()}${this.getHead()}${this.getBody()}`);
    this.printDoc.close();
  }

  /**
   * 取得DOCTYPE
   * @returns {string}
   */
  private docType(): string {
    if (this.standard === SwPrintStandards.HTML5) {
      return '<!DOCTYPE html>';
    }

    const transitional: string = this.standard === SwPrintStandards.LOOSE ? 'Transitional' : '',
      dtd: string = this.standard === SwPrintStandards.LOOSE ? 'loose' : 'strict';
    return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd + '.dtd">';
  }

  private getHead(): string {
    let links = '';
    let styles = '';

    if (this.printCSS) {
      this.printCSS.forEach((url) => {
        links += `<link href="${window.location.protocol}//${window.location.host}/${url}" rel="stylesheet">`;
      });
    }

    for (let i = 0; i <= document.querySelectorAll('style').length; i++) {
      if (!document.querySelectorAll('style').item(i)) {
        // styles += `<style>${document.querySelectorAll('style').item(i).innerHTML}</style>`;
      }
    }

    if (!this.printStyle) {
      styles += `<style>${this.printStyle}</style>`;
    }

    return `<head><title>${this.printTitle}</title>${links}${styles}</head>`;
  }

  private getBody(): string {
    return `<body><page size="${this.printSize}" layout="${this.printType}">${this.printHTML}</page></body>`;
  }


  private createIframe() {
    this.clearPrintFrame();
    try {
      const printIframe: any = this.render.createElement('iframe');
      document.body.appendChild(printIframe);
      printIframe.style.position = 'absolute';
      printIframe.style.border = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.left = '0';
      printIframe.style.top = '0';
      printIframe.style.zIndex = '-1';
      printIframe.className = this.printFrameClassName;
      this.printWindow = printIframe.contentWindow;
      this.printDoc = printIframe.contentDocument ? printIframe.contentDocument : (printIframe.contentWindow ? printIframe.contentWindow.document : printIframe.document);
    } catch (e) {
      this.error();
      throw new Error(e + '. iframes may not be supported in this browser.');
    }

    if (!this.printWindow) {
      this.error();
      throw new Error('Cannot find window.');
    }

    if (!this.printDoc) {
      this.error();
      throw new Error('Cannot find document.');
    }
  }

  private createPopup() {
    let windowAttr = `location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no`;
    windowAttr += `,width=${window.screen.width},height=${window.screen.height};`;
    windowAttr += ',resizable=yes,personalbar=no,scrollbars=yes';
    const newWin = window.open('', '_blank', windowAttr);
    this.printWindow = newWin;
    this.printDoc = newWin.document;
  }

  private getPrintWindow() {
    this.createIframe();
    if (this.mode === SwPrintModes.IFRAME) {
      this.createIframe();
    } else if (this.mode === SwPrintModes.POPUP) {
      this.createPopup();
    }
  }

  private clearPrintFrame() {
    const oldFrame: any = document.getElementsByClassName(this.printFrameClassName);
    if (oldFrame.length > 0) {
      oldFrame[0].parentNode.removeChild(oldFrame[0]);
    }
  }

  private startPrint() {
    const timeoutId = setTimeout(() => {
      this.printWindow.focus();
      this.printWindow.print();
      if (this.mode === SwPrintModes.POPUP) {
        const id = setTimeout(() => {
          clearTimeout(id);
          this.printWindow.close();
        }, 500);
      }
      clearTimeout(timeoutId);
      this.printing = false;
      this.printComplete.emit(true);
      this.clearPrintFrame();
    }, 500);
  }

  error() {
    this.dialogService.alertDialog('系統發生錯誤，請再重試一次', this.ALERT_TYPE.WARN);
    this.printComplete.emit(false);
  }
}
