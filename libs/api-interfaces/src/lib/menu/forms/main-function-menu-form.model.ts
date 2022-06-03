import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { ModuleMenuCategory } from "../enum/module-menu-category.enum";
import { ModuleMenuStatus } from "../enum/module-menu-status.enum";

export class ModuleMenuForm {
  @ApiModelProperty({description: '選單名稱'})
  menuTitle: string;

  @ApiModelProperty({description: '選單英文名稱'})
  menuEnTitle: string;

  @ApiModelProperty({description: '選單狀態'})
  menuStatus: ModuleMenuStatus;

  @ApiModelProperty({description: '選單權限'})
  menuPermissions: string;

  @ApiModelProperty({description: '選單種類'})
  menuCategory: ModuleMenuCategory;

  @ApiModelProperty({description: 'URL'})
  externalLink?: string;

  @ApiModelProperty({description: '遠端檔案位址'})
  rdpFileLink?: string;

  @ApiModelProperty({description: '遠端位址'})
  rdpAddress?: string;

  @ApiModelProperty({description: '遠端使用者帳戶'})
  rdpUserName?: string;

  @ApiModelProperty({description: '選單使用起日'})
  menuAccessStartDate: string;

  @ApiModelProperty({description: '選單使用迄日'})
  menuAccessEndDate: string;

  constructor(data: ModuleMenuForm) {
    this.menuTitle = data.menuTitle;
    this.menuEnTitle = data.menuEnTitle;
    this.menuStatus = data.menuStatus;
    this.menuPermissions = data.menuPermissions;
    this.menuCategory = data.menuCategory;
    this.externalLink = data.externalLink;
    this.rdpFileLink = data.rdpFileLink;
    this.rdpAddress = data.rdpAddress;
    this.rdpUserName = data.rdpUserName;
    this.menuAccessStartDate = data.menuAccessStartDate;
    this.menuAccessEndDate = data.menuAccessEndDate;
  }
}
