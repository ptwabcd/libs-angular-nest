import { UserSyncForm } from './forms/user-sync-form';
import { UserImaCloudStatus } from './enum/user-ima-cloud-status.enum';
import { UserStatus } from './enum/user-status.enum';

export class ImaCloudUser {
  signinStatus: number;
  message: string;
  userType: number;
  industrys: string;
  types: string;
  publishers: string;
  packages: string;
  nickname: string;
  profile: string;
  phone: string;

  sync(account: string, password: string, data: ImaCloudUser): UserSyncForm {
    return {
      userEmail: account,
      userPassword: '',
      userNickname: data.nickname,
      userBusinessNo: data.profile,
      userImaCloudStatus: UserImaCloudStatus.SYNC,
      userStatus: UserStatus.ENABLE
    }
  }
}
