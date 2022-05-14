import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialIconCategories } from '@shared-lib/common/icons/models/material-icon-categories';
import { tap } from 'rxjs/operators';
import { MaterialIconType } from '@shared-lib/common/icons/models/enums/material-icon-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SwMatIconService {

  private libsAssetsPath = `libs/shared/src/assets/icons/material-icons-list.json`;
  materialIcon: MaterialIconCategories;
  icons: Array<string> = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }

  init() {
    return this.httpClient.get<MaterialIconCategories>(this.libsAssetsPath).pipe(tap(materialIcon => {
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

  private commonType(materialIconType: MaterialIconType) {
    return materialIconType === MaterialIconType.DEVICE ||
      materialIconType === MaterialIconType.HARDWARE ||
      materialIconType === MaterialIconType.MAPS ||
      materialIconType === MaterialIconType.NOTIFICATION ||
      materialIconType === MaterialIconType.PLACES ||
      materialIconType === MaterialIconType.SOCIAL;
  }
}
