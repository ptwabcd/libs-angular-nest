import { Competence, Identity, ModuleMenuCategory, ModuleMenuStatus, UserImaCloudStatus, UserIndustry, UserStatus } from "@full-stack/api-interfaces";
import { SwBaseComponent } from "sw-ng";

export class MfcBaseComponent extends SwBaseComponent {
  COMPETENCE = Competence;
  IDENTITY = Identity;
  MODULE_MENU_CATEGORY = ModuleMenuCategory;
  MODULE_MENU_STATUS = ModuleMenuStatus;
  USER_INDUSTRY = UserIndustry;
  USER_IMA_CLOUD_STATUS = UserImaCloudStatus;
  USER_STATUS = UserStatus;
}
