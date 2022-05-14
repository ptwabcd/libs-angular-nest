import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SwBaseComponent } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class SwSeoService extends SwBaseComponent {

  constructor(
    @Inject(DOCUMENT) private dom,
    private meta: Meta,
    private titleMeta: Title
  ) {
    super();
  }


  init(title: string) {
    this.meta.addTags([
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]);
    this.titleMeta.setTitle(title);
  }

  reload(title: string) {
    this.createCanonicalLink();
    this.titleMeta.setTitle(title);
    this.meta.removeTag('name=\'description\'');
    this.meta.removeTag('name=\'robot\'');
  }

  setTitle(title: string) {
    this.titleMeta.setTitle(title);
  }

  addDesc(content: string) {
    this.addRobot('all');
    this.meta.addTag({ name: 'description', content });
  }

  addRobot(content: string) {
    this.meta.addTag({ name: 'robots', content });
  }

  disableRobot() {
    this.addRobot('noindex, nofollow');
  }

  addTag(tag: MetaDefinition) {
    this.meta.addTag(tag);
  }

  updateTag(tag: MetaDefinition, selector?: string) {
    this.meta.updateTag(tag, selector);
  }

  createCanonicalLink(url?: string) {
    let canURL = url == undefined ? this.dom.URL : url;
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', canURL);
  }
}
