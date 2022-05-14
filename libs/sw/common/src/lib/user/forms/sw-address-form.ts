export class SwAddressForm {
  // 郵遞區號
  zipCode: number;
  // 城市
  city: string;
  // 地區
  district: string;
  // 地址
  address: string;

  constructor(data: SwAddressForm) {
    this.zipCode = data.zipCode;
    this.city = data.city;
    this.district = data.district;
    this.address = data.address;
  }
}
