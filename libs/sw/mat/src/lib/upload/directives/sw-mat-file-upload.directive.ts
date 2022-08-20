import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SwUploadFileType } from 'sw-common';
import { SwMatUploadService } from '../services';
import { NumberPrototype } from 'sw-common';

@Directive({
  selector: '[swMatFileUpload]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatFileUploadDirective,
      multi: true,
    }
  ]
})
export class SwMatFileUploadDirective implements OnInit, ControlValueAccessor {
  onChange: (value: File | FileList | string | Blob | Array<Blob>) => void;
  onTouched: () => {};

  @Input() fileSize: number;

  // 壓縮圖片比率 (數值0~1)
  @Input() compressRatio = 1;

  @Input() watermark = '';

  @Input() fontSize = 120;

  @Input() fileType: Array<string> = new SwUploadFileType().ANY_FORMAT;

  @Output() getDataUrl: EventEmitter<Array<string>> = new EventEmitter();

  constructor(
    private uploadService: SwMatUploadService
  ) { }


  ngOnInit(): void {
    this.fileSize = this.fileSize ?? 10 * 1024 * 1024;
    this.fileType = this.fileType ?? new SwUploadFileType().ANY_FORMAT;
  }

  @HostListener('change', ['$event.target.files'])
  onInput(files: FileList) {
    const isValidator = this.uploadService.uploadValidator(files, this.fileSize, this.fileType);
    if (files.length > 0 && isValidator) {
      const base64Data: Array<string> = [];
      const blobs = [];
      for (let i = 0; i < files.length; i++) {
        const ratio = NumberPrototype.division(this.fontSize, 1000);
        const file = files.item(i);
        const reader = new FileReader();
        const img = new Image();
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        // const canvasPreview = document.createElement('canvas');
        // const contextPreview = canvasPreview.getContext('2d');

        reader.onload = (progressEvent: ProgressEvent) => {
          const fileReader = progressEvent.target as FileReader;
          if (this.compressRatio === 1) {
            base64Data.push(fileReader.result as string);
            if (files.length === base64Data.length) {
              this.onChange(files);
              this.getDataUrl.emit(base64Data);
            }
          } else { // 壓縮圖檔
            img.src = fileReader.result.toString();
            img.onload = () => {
              this.setSize(context, canvas, img, this.compressRatio);
              // this.setSize(contextPreview, canvasPreview, img, this.compressRatio);
              if (this.watermark) {
                this.setWatermark(context, canvas, ratio);
                // this.setWatermark(contextPreview, canvasPreview, ratio);
              }
              base64Data.push(canvas.toDataURL(file.type));
              if (files.length === base64Data.length) {
                this.getDataUrl.emit(base64Data);
              }
              this.covertPng(canvas, file.type).pipe(take(1)).subscribe((blob) => {
                const formData = new FormData();
                formData.append('file', blob, file.name);
                blobs.push(formData.get('file'));
                if (files.length === blobs.length) {
                  this.onChange(blobs);
                }
              });
            };
          }

        };
        reader.readAsDataURL(file);
      }
    } else {
      this.onChange('');
    }
  }

  setSize(context, canvas, img: HTMLImageElement, compressRatio) {
    canvas.width = img.width * compressRatio;
    canvas.height = img.height * compressRatio;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  setWatermark(context, canvas, ratio: number) {
    const _fontSize = NumberPrototype.multiplication(canvas.width, ratio);
    context.font = _fontSize + 'px verdana';
    const textWidth = context.measureText(this.watermark).width;
    context.globalAlpha = .50;
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.fillText(this.watermark, canvas.width / 2, (canvas.height / 2 ) + (_fontSize / 4));
    // context.fillText(this.watermark, canvas.width - textWidth - 10, canvas.height - 20); 右下
    context.fillStyle = 'black';
    context.fillText(this.watermark, canvas.width / 2, (canvas.height / 2 ) + (_fontSize / 4) + 2);
    // context.fillText(this.watermark, canvas.width - textWidth - 10 + 2, canvas.height - 20 + 2); 右下
  }

  covertPng(canvas, fileType: string): Observable<Blob> {
    return new Observable(observer => {
      canvas.toBlob((result: Blob) => {
        observer.next(result);
        observer.complete();
      }, fileType, this.compressRatio);
    });
  }

  writeValue(value) {}
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  dataURItoBlob(dataURI, fileName: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], {type: mimeString});

    blob['lastModifiedDate'] = new Date();
    blob['name'] = fileName;

    return blob;
  }
}
