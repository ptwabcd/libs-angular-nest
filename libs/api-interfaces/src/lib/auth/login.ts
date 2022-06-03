import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class Login {
  @ApiModelProperty({description: '帳號'})
  username: string;
  @ApiModelProperty({description: '密碼'})
  password: string;

  constructor(data: Login) {
    this.username = data.username;
    this.password = data.password;
  }
}
