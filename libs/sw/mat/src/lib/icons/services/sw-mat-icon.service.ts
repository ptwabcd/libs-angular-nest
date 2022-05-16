import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SwMaterialIconType, SwMatIconCategories } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SwMatIconService {

  private swAssetsPath = `sw-mat/assets/icons/material-icons-list.json`;
  materialIcon: SwMatIconCategories;
  icons: Array<string> = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  init() {
    return this.httpClient.get<SwMatIconCategories>(this.swAssetsPath).pipe(tap(materialIcon => {
      this.materialIcon = materialIcon;
      materialIcon.categories.forEach(category => category.icons.forEach(icon => this.icons.push(icon.ligature)));
    })).toPromise();
  }

  getIcons(): Array<string> {
    return this.icons;
  }

  getCommonIcons(): Array<string> {
    this.icons = [];
    this.materialIcon.categories.forEach(category => {
      if (this.commonType(category.name)) {
        category.icons.forEach(icon => this.icons.push(icon.ligature));
      }
    });
    return this.icons;
  }

  private commonType(materialIconType: SwMaterialIconType) {
    return materialIconType === SwMaterialIconType.DEVICE ||
      materialIconType === SwMaterialIconType.HARDWARE ||
      materialIconType === SwMaterialIconType.MAPS ||
      materialIconType === SwMaterialIconType.NOTIFICATION ||
      materialIconType === SwMaterialIconType.PLACES ||
      materialIconType === SwMaterialIconType.SOCIAL;
  }
}
