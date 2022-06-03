import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserStatus } from '../enum/user-status.enum';
import { UserImaCloudStatus } from '@full-stack/api-interfaces';

export class UserSyncForm {
  @ApiModelProperty({description: '使用者帳號'})
  userEmail: string;

  @ApiModelProperty({description: '使用者密碼'})
  userPassword: string;

  @ApiModelProperty({description: '使用者暱稱'})
  userNickname: string;

  @ApiModelProperty({description: '使用者公司編號'})
  userBusinessNo: string;

  @ApiModelProperty({description: 'imaCloud轉拋狀態'})
  userImaCloudStatus: UserImaCloudStatus;

  @ApiModelProperty({description: '使用者狀態'})
  userStatus: UserStatus;

}
