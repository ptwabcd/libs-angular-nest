import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SwAuthService<T extends object = any> {

  constructor(
    private jwtService: JwtService
  ) {}

  createToken(authPayload: T) {
    /*
    payload不建議放淺顯易懂的敏感資料，如要放敏感資料最好有加密過，
    這邊以不重複的id作替代，對應的是資料表ID欄位。
    */
    const token = this.jwtService.sign({ ...authPayload });
    return {
      token: token
    };
  }

  decode<T>(token: string) {
    return this.jwtService.decode(token.split(' ')[1]) as T;
  }

  cusDecode<T>(token: string) {
    return this.jwtService.decode(token) as T;
  }

  verify(token: string) {
    return this.jwtService.verify(token.split(' ')[1]);
  }

}
