import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserForm } from './forms/user-form.model';

export class User extends UserForm{
  @ApiModelProperty({description: '使用者帳號'})
  userEmail: string;

  constructor(data: User) {
    super(data);
    this.userEmail = data.userEmail;
  }
}
