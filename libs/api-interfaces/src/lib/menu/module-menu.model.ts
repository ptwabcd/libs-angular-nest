import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { ModuleMenuForm } from "./forms/main-function-menu-form.model"

export class ModuleMenu extends ModuleMenuForm {
  @ApiModelProperty({description: '選單ID'})
  menuId?: number

  constructor(data: ModuleMenu) {
    super(data);
    this.menuId = data.menuId;
  }
}
