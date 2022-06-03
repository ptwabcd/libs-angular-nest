import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Identity } from '../../auth';
import { UserImaCloudStatus } from '../enum/user-ima-cloud-status.enum';
import { UserIndustry } from '../enum/user-industrys.enum';
import { UserStatus } from '../enum/user-status.enum';

export class UserForm {
  @ApiModelProperty({description: '使用者編號'})
  userIndex: number;

  @ApiModelProperty({description: '使用者暱稱'})
  userNickname: string;

  @ApiModelProperty({description: '使用者公司編號'})
  userBusinessNo: string;

  @ApiModelProperty({description: '電話'})
  userTelephone: string;

  @ApiModelProperty({description: '使用者所屬產業別'})
  userIndustries: UserIndustry;

  @ApiModelProperty({description: '使用者身分'})
  userIdentity: Identity;

  @ApiModelProperty({description: '使用者權限'})
  userCompetence: string;

  @ApiModelProperty({description: 'imaCloud轉拋狀態'})
  userImaCloudStatus: UserImaCloudStatus;

  @ApiModelProperty({description: '使用者狀態'})
  userStatus: UserStatus;

  @ApiModelProperty({description: '人員使用起日'})
  userAccessStartDate: string;

  @ApiModelProperty({description: '人員使用迄日'})
  userAccessEndDate: string;

  constructor(data: UserForm) {
    this.userIndex = data.userIndex;
    this.userNickname = data.userNickname;
    this.userBusinessNo = data.userBusinessNo;
    this.userTelephone = data.userTelephone;
    this.userIndustries = data.userIndustries;
    this.userIdentity = data.userIdentity;
    this.userCompetence = data.userCompetence;
    this.userImaCloudStatus = data.userImaCloudStatus;
    this.userStatus = data.userStatus;
    this.userAccessStartDate = data.userAccessStartDate;
    this.userAccessEndDate = data.userAccessEndDate;
  }
}
