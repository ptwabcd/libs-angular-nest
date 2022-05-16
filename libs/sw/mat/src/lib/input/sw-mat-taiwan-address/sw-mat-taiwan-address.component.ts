import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwBaseComponent } from 'sw-ng';
import { SwAddressForm, SwCity, SwDistrict } from 'sw-common';

@Component({
  selector: 'sw-mat-taiwan-address',
  templateUrl: './sw-mat-taiwan-address.component.html',
  styleUrls: ['./sw-mat-taiwan-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwMatTaiwanAddressComponent,
      multi: true,
    }
  ]
})
export class SwMatTaiwanAddressComponent extends SwBaseComponent implements OnInit, ControlValueAccessor {

  onChange: (value: SwAddressForm) => void;
  onTouched: () => {};

  cities: Array<SwCity> = this.getCities();
  districts: Array<SwDistrict> = [];

  form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl(''),
      zipCode: new FormControl(''),
      district: new FormControl(''),
      address: new FormControl('')
    });
  }

  findCity() {
    return this.cities.find(city => city.value === this.form.get('city').value);
  }

  findDistrict() {
    this.districts = this.findCity().districts;
  }

  getZipCode() {
    const zipCode = this.findCity().districts.find(district => district.value === this.form.get('district').value).zip;
    this.form.get('zipCode').setValue(zipCode);
  }

  valueChange() {
    this.onChange(this.form.value);
  }

  updateDistrict() {
    this.findDistrict();
    this.form.get('district').setValue(this.districts[0].value);
    this.getZipCode();
    this.valueChange();
  }

  registerOnChange(fn: (value: SwAddressForm) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: SwAddressForm): void {
    if (value && value.zipCode) {
      this.form.setValue(value);
      this.findDistrict();
    }
  }

  private getCities(): Array<SwCity> {
    return [
      {
        districts: [
          {
            zip: 100,
            value: '中正區'
          },
          {
            zip: 103,
            value: '大同區'
          },
          {
            zip: 104,
            value: '中山區'
          },
          {
            zip: 105,
            value: '松山區'
          },
          {
            zip: 106,
            value: '大安區'
          },
          {
            zip: 108,
            value: '萬華區'
          },
          {
            zip: 110,
            value: '信義區'
          },
          {
            zip: 111,
            value: '士林區'
          },
          {
            zip: 112,
            value: '北投區'
          },
          {
            zip: 114,
            value: '內湖區'
          },
          {
            zip: 115,
            value: '南港區'
          },
          {
            zip: 116,
            value: '文山區'
          }
        ],
        value: '臺北市'
      },
      {
        districts: [
          {
            zip: 200,
            value: '仁愛區'
          },
          {
            zip: 201,
            value: '信義區'
          },
          {
            zip: 202,
            value: '中正區'
          },
          {
            zip: 203,
            value: '中山區'
          },
          {
            zip: 204,
            value: '安樂區'
          },
          {
            zip: 205,
            value: '暖暖區'
          },
          {
            zip: 206,
            value: '七堵區'
          }
        ],
        value: '基隆市'
      },
      {
        districts: [
          {
            zip: 207,
            value: '萬里區'
          },
          {
            zip: 208,
            value: '金山區'
          },
          {
            zip: 220,
            value: '板橋區'
          },
          {
            zip: 221,
            value: '汐止區'
          },
          {
            zip: 222,
            value: '深坑區'
          },
          {
            zip: 223,
            value: '石碇區'
          },
          {
            zip: 224,
            value: '瑞芳區'
          },
          {
            zip: 226,
            value: '平溪區'
          },
          {
            zip: 227,
            value: '雙溪區'
          },
          {
            zip: 228,
            value: '貢寮區'
          },
          {
            zip: 231,
            value: '新店區'
          },
          {
            zip: 232,
            value: '坪林區'
          },
          {
            zip: 233,
            value: '烏來區'
          },
          {
            zip: 234,
            value: '永和區'
          },
          {
            zip: 235,
            value: '中和區'
          },
          {
            zip: 236,
            value: '土城區'
          },
          {
            zip: 237,
            value: '三峽區'
          },
          {
            zip: 238,
            value: '樹林區'
          },
          {
            zip: 239,
            value: '鶯歌區'
          },
          {
            zip: 241,
            value: '三重區'
          },
          {
            zip: 242,
            value: '新莊區'
          },
          {
            zip: 243,
            value: '泰山區'
          },
          {
            zip: 244,
            value: '林口區'
          },
          {
            zip: 247,
            value: '蘆洲區'
          },
          {
            zip: 248,
            value: '五股區'
          },
          {
            zip: 249,
            value: '八里區'
          },
          {
            zip: 251,
            value: '淡水區'
          },
          {
            zip: 252,
            value: '三芝區'
          },
          {
            zip: 253,
            value: '石門區'
          }
        ],
        value: '新北市'
      },
      {
        districts: [
          {
            zip: 209,
            value: '南竿鄉'
          },
          {
            zip: 210,
            value: '北竿鄉'
          },
          {
            zip: 211,
            value: '莒光鄉'
          },
          {
            zip: 212,
            value: '東引鄉'
          }
        ],
        value: '連江縣'
      },
      {
        districts: [
          {
            zip: 260,
            value: '宜蘭市'
          },
          {
            zip: 263,
            value: '壯圍鄉'
          },
          {
            zip: 261,
            value: '頭城鎮'
          },
          {
            zip: 262,
            value: '礁溪鄉'
          },
          {
            zip: 264,
            value: '員山鄉'
          },
          {
            zip: 265,
            value: '羅東鎮'
          },
          {
            zip: 266,
            value: '三星鄉'
          },
          {
            zip: 267,
            value: '大同鄉'
          },
          {
            zip: 268,
            value: '五結鄉'
          },
          {
            zip: 269,
            value: '冬山鄉'
          },
          {
            zip: 270,
            value: '蘇澳鎮'
          },
          {
            zip: 272,
            value: '南澳鄉'
          },
          {
            zip: 290,
            value: '釣魚臺'
          }
        ],
        value: '宜蘭縣'
      },
      {
        districts: [
          {
            zip: 290,
            value: '釣魚臺'
          }
        ],
        value: '釣魚臺'
      },
      {
        districts: [
          {
            zip: 300,
            value: '東區'
          },
          {
            zip: 300,
            value: '北區'
          },
          {
            zip: 300,
            value: '香山區'
          }
        ],
        value: '新竹市'
      },
      {
        districts: [
          {
            zip: 308,
            value: '寶山鄉'
          },
          {
            zip: 302,
            value: '竹北市'
          },
          {
            zip: 303,
            value: '湖口鄉'
          },
          {
            zip: 304,
            value: '新豐鄉'
          },
          {
            zip: 305,
            value: '新埔鎮'
          },
          {
            zip: 306,
            value: '關西鎮'
          },
          {
            zip: 307,
            value: '芎林鄉'
          },
          {
            zip: 310,
            value: '竹東鎮'
          },
          {
            zip: 311,
            value: '五峰鄉'
          },
          {
            zip: 312,
            value: '橫山鄉'
          },
          {
            zip: 313,
            value: '尖石鄉'
          },
          {
            zip: 314,
            value: '北埔鄉'
          },
          {
            zip: 315,
            value: '峨眉鄉'
          }
        ],
        value: '新竹縣'
      },
      {
        districts: [
          {
            zip: 320,
            value: '中壢區'
          },
          {
            zip: 324,
            value: '平鎮區'
          },
          {
            zip: 325,
            value: '龍潭區'
          },
          {
            zip: 326,
            value: '楊梅區'
          },
          {
            zip: 327,
            value: '新屋區'
          },
          {
            zip: 328,
            value: '觀音區'
          },
          {
            zip: 330,
            value: '桃園區'
          },
          {
            zip: 333,
            value: '龜山區'
          },
          {
            zip: 334,
            value: '八德區'
          },
          {
            zip: 335,
            value: '大溪區'
          },
          {
            zip: 336,
            value: '復興區'
          },
          {
            zip: 337,
            value: '大園區'
          },
          {
            zip: 338,
            value: '蘆竹區'
          }
        ],
        value: '桃園市'
      },
      {
        districts: [
          {
            zip: 350,
            value: '竹南鎮'
          },
          {
            zip: 351,
            value: '頭份市'
          },
          {
            zip: 352,
            value: '三灣鄉'
          },
          {
            zip: 353,
            value: '南庄鄉'
          },
          {
            zip: 354,
            value: '獅潭鄉'
          },
          {
            zip: 356,
            value: '後龍鎮'
          },
          {
            zip: 357,
            value: '通霄鎮'
          },
          {
            zip: 358,
            value: '苑裡鎮'
          },
          {
            zip: 360,
            value: '苗栗市'
          },
          {
            zip: 361,
            value: '造橋鄉'
          },
          {
            zip: 362,
            value: '頭屋鄉'
          },
          {
            zip: 363,
            value: '公館鄉'
          },
          {
            zip: 364,
            value: '大湖鄉'
          },
          {
            zip: 365,
            value: '泰安鄉'
          },
          {
            zip: 366,
            value: '銅鑼鄉'
          },
          {
            zip: 367,
            value: '三義鄉'
          },
          {
            zip: 368,
            value: '西湖鄉'
          },
          {
            zip: 369,
            value: '卓蘭鎮'
          }
        ],
        value: '苗栗縣'
      },
      {
        districts: [
          {
            zip: 400,
            value: '中區'
          },
          {
            zip: 401,
            value: '東區'
          },
          {
            zip: 402,
            value: '南區'
          },
          {
            zip: 403,
            value: '西區'
          },
          {
            zip: 404,
            value: '北區'
          },
          {
            zip: 406,
            value: '北屯區'
          },
          {
            zip: 407,
            value: '西屯區'
          },
          {
            zip: 408,
            value: '南屯區'
          },
          {
            zip: 411,
            value: '太平區'
          },
          {
            zip: 412,
            value: '大里區'
          },
          {
            zip: 413,
            value: '霧峰區'
          },
          {
            zip: 414,
            value: '烏日區'
          },
          {
            zip: 420,
            value: '豐原區'
          },
          {
            zip: 421,
            value: '后里區'
          },
          {
            zip: 422,
            value: '石岡區'
          },
          {
            zip: 423,
            value: '東勢區'
          },
          {
            zip: 424,
            value: '和平區'
          },
          {
            zip: 426,
            value: '新社區'
          },
          {
            zip: 427,
            value: '潭子區'
          },
          {
            zip: 428,
            value: '大雅區'
          },
          {
            zip: 429,
            value: '神岡區'
          },
          {
            zip: 432,
            value: '大肚區'
          },
          {
            zip: 433,
            value: '沙鹿區'
          },
          {
            zip: 434,
            value: '龍井區'
          },
          {
            zip: 435,
            value: '梧棲區'
          },
          {
            zip: 436,
            value: '清水區'
          },
          {
            zip: 437,
            value: '大甲區'
          },
          {
            zip: 438,
            value: '外埔區'
          },
          {
            zip: 439,
            value: '大安區'
          }
        ],
        value: '臺中市'
      },
      {
        districts: [
          {
            zip: 500,
            value: '彰化市'
          },
          {
            zip: 502,
            value: '芬園鄉'
          },
          {
            zip: 503,
            value: '花壇鄉'
          },
          {
            zip: 504,
            value: '秀水鄉'
          },
          {
            zip: 505,
            value: '鹿港鎮'
          },
          {
            zip: 506,
            value: '福興鄉'
          },
          {
            zip: 507,
            value: '線西鄉'
          },
          {
            zip: 508,
            value: '和美鎮'
          },
          {
            zip: 509,
            value: '伸港鄉'
          },
          {
            zip: 510,
            value: '員林市'
          },
          {
            zip: 511,
            value: '社頭鄉'
          },
          {
            zip: 512,
            value: '永靖鄉'
          },
          {
            zip: 513,
            value: '埔心鄉'
          },
          {
            zip: 514,
            value: '溪湖鎮'
          },
          {
            zip: 515,
            value: '大村鄉'
          },
          {
            zip: 516,
            value: '埔鹽鄉'
          },
          {
            zip: 520,
            value: '田中鎮'
          },
          {
            zip: 521,
            value: '北斗鎮'
          },
          {
            zip: 522,
            value: '田尾鄉'
          },
          {
            zip: 523,
            value: '埤頭鄉'
          },
          {
            zip: 524,
            value: '溪州鄉'
          },
          {
            zip: 525,
            value: '竹塘鄉'
          },
          {
            zip: 526,
            value: '二林鎮'
          },
          {
            zip: 527,
            value: '大城鄉'
          },
          {
            zip: 528,
            value: '芳苑鄉'
          },
          {
            zip: 530,
            value: '二水鄉'
          }
        ],
        value: '彰化縣'
      },
      {
        districts: [
          {
            zip: 540,
            value: '南投市'
          },
          {
            zip: 541,
            value: '中寮鄉'
          },
          {
            zip: 542,
            value: '草屯鎮'
          },
          {
            zip: 544,
            value: '國姓鄉'
          },
          {
            zip: 545,
            value: '埔里鎮'
          },
          {
            zip: 546,
            value: '仁愛鄉'
          },
          {
            zip: 551,
            value: '名間鄉'
          },
          {
            zip: 552,
            value: '集集鎮'
          },
          {
            zip: 553,
            value: '水里鄉'
          },
          {
            zip: 555,
            value: '魚池鄉'
          },
          {
            zip: 556,
            value: '信義鄉'
          },
          {
            zip: 557,
            value: '竹山鎮'
          },
          {
            zip: 558,
            value: '鹿谷鄉'
          }
        ],
        value: '南投縣'
      },
      {
        districts: [
          {
            zip: 600,
            value: '西區'
          },
          {
            zip: 600,
            value: '東區'
          }
        ],
        value: '嘉義市'
      },
      {
        districts: [
          {
            zip: 602,
            value: '番路鄉'
          },
          {
            zip: 603,
            value: '梅山鄉'
          },
          {
            zip: 604,
            value: '竹崎鄉'
          },
          {
            zip: 605,
            value: '阿里山鄉'
          },
          {
            zip: 606,
            value: '中埔鄉'
          },
          {
            zip: 607,
            value: '大埔鄉'
          },
          {
            zip: 608,
            value: '水上鄉'
          },
          {
            zip: 611,
            value: '鹿草鄉'
          },
          {
            zip: 612,
            value: '太保市'
          },
          {
            zip: 613,
            value: '朴子市'
          },
          {
            zip: 614,
            value: '東石鄉'
          },
          {
            zip: 615,
            value: '六腳鄉'
          },
          {
            zip: 616,
            value: '新港鄉'
          },
          {
            zip: 621,
            value: '民雄鄉'
          },
          {
            zip: 622,
            value: '大林鎮'
          },
          {
            zip: 623,
            value: '溪口鄉'
          },
          {
            zip: 624,
            value: '義竹鄉'
          },
          {
            zip: 625,
            value: '布袋鎮'
          }
        ],
        value: '嘉義縣'
      },
      {
        districts: [
          {
            zip: 630,
            value: '斗南鎮'
          },
          {
            zip: 631,
            value: '大埤鄉'
          },
          {
            zip: 632,
            value: '虎尾鎮'
          },
          {
            zip: 633,
            value: '土庫鎮'
          },
          {
            zip: 634,
            value: '褒忠鄉'
          },
          {
            zip: 635,
            value: '東勢鄉'
          },
          {
            zip: 636,
            value: '臺西鄉'
          },
          {
            zip: 637,
            value: '崙背鄉'
          },
          {
            zip: 638,
            value: '麥寮鄉'
          },
          {
            zip: 640,
            value: '斗六市'
          },
          {
            zip: 643,
            value: '林內鄉'
          },
          {
            zip: 646,
            value: '古坑鄉'
          },
          {
            zip: 647,
            value: '莿桐鄉'
          },
          {
            zip: 648,
            value: '西螺鎮'
          },
          {
            zip: 649,
            value: '二崙鄉'
          },
          {
            zip: 651,
            value: '北港鎮'
          },
          {
            zip: 652,
            value: '水林鄉'
          },
          {
            zip: 653,
            value: '口湖鄉'
          },
          {
            zip: 654,
            value: '四湖鄉'
          },
          {
            zip: 655,
            value: '元長鄉'
          }
        ],
        value: '雲林縣'
      },
      {
        districts: [
          {
            zip: 700,
            value: '中西區'
          },
          {
            zip: 701,
            value: '東區'
          },
          {
            zip: 702,
            value: '南區'
          },
          {
            zip: 704,
            value: '北區'
          },
          {
            zip: 708,
            value: '安平區'
          },
          {
            zip: 709,
            value: '安南區'
          },
          {
            zip: 710,
            value: '永康區'
          },
          {
            zip: 711,
            value: '歸仁區'
          },
          {
            zip: 712,
            value: '新化區'
          },
          {
            zip: 713,
            value: '左鎮區'
          },
          {
            zip: 714,
            value: '玉井區'
          },
          {
            zip: 715,
            value: '楠西區'
          },
          {
            zip: 716,
            value: '南化區'
          },
          {
            zip: 717,
            value: '仁德區'
          },
          {
            zip: 718,
            value: '關廟區'
          },
          {
            zip: 719,
            value: '龍崎區'
          },
          {
            zip: 720,
            value: '官田區'
          },
          {
            zip: 721,
            value: '麻豆區'
          },
          {
            zip: 722,
            value: '佳里區'
          },
          {
            zip: 723,
            value: '西港區'
          },
          {
            zip: 724,
            value: '七股區'
          },
          {
            zip: 725,
            value: '將軍區'
          },
          {
            zip: 726,
            value: '學甲區'
          },
          {
            zip: 727,
            value: '北門區'
          },
          {
            zip: 730,
            value: '新營區'
          },
          {
            zip: 731,
            value: '後壁區'
          },
          {
            zip: 732,
            value: '白河區'
          },
          {
            zip: 733,
            value: '東山區'
          },
          {
            zip: 734,
            value: '六甲區'
          },
          {
            zip: 735,
            value: '下營區'
          },
          {
            zip: 736,
            value: '柳營區'
          },
          {
            zip: 737,
            value: '鹽水區'
          },
          {
            zip: 741,
            value: '善化區'
          },
          {
            zip: 744,
            value: '新市區'
          },
          {
            zip: 742,
            value: '大內區'
          },
          {
            zip: 743,
            value: '山上區'
          },
          {
            zip: 745,
            value: '安定區'
          }
        ],
        value: '臺南市'
      },
      {
        districts: [
          {
            zip: 800,
            value: '新興區'
          },
          {
            zip: 801,
            value: '前金區'
          },
          {
            zip: 802,
            value: '苓雅區'
          },
          {
            zip: 803,
            value: '鹽埕區'
          },
          {
            zip: 804,
            value: '鼓山區'
          },
          {
            zip: 805,
            value: '旗津區'
          },
          {
            zip: 806,
            value: '前鎮區'
          },
          {
            zip: 807,
            value: '三民區'
          },
          {
            zip: 811,
            value: '楠梓區'
          },
          {
            zip: 812,
            value: '小港區'
          },
          {
            zip: 813,
            value: '左營區'
          },
          {
            zip: 814,
            value: '仁武區'
          },
          {
            zip: 815,
            value: '大社區'
          },
          {
            zip: 817,
            value: '東沙群島'
          },
          {
            zip: 819,
            value: '南沙群島'
          },
          {
            zip: 820,
            value: '岡山區'
          },
          {
            zip: 821,
            value: '路竹區'
          },
          {
            zip: 822,
            value: '阿蓮區'
          },
          {
            zip: 823,
            value: '田寮區'
          },
          {
            zip: 824,
            value: '燕巢區'
          },
          {
            zip: 825,
            value: '橋頭區'
          },
          {
            zip: 826,
            value: '梓官區'
          },
          {
            zip: 827,
            value: '彌陀區'
          },
          {
            zip: 828,
            value: '永安區'
          },
          {
            zip: 829,
            value: '湖內區'
          },
          {
            zip: 830,
            value: '鳳山區'
          },
          {
            zip: 831,
            value: '大寮區'
          },
          {
            zip: 832,
            value: '林園區'
          },
          {
            zip: 833,
            value: '鳥松區'
          },
          {
            zip: 840,
            value: '大樹區'
          },
          {
            zip: 842,
            value: '旗山區'
          },
          {
            zip: 843,
            value: '美濃區'
          },
          {
            zip: 844,
            value: '六龜區'
          },
          {
            zip: 845,
            value: '內門區'
          },
          {
            zip: 846,
            value: '杉林區'
          },
          {
            zip: 847,
            value: '甲仙區'
          },
          {
            zip: 848,
            value: '桃源區'
          },
          {
            zip: 849,
            value: '那瑪夏區'
          },
          {
            zip: 851,
            value: '茂林區'
          },
          {
            zip: 852,
            value: '茄萣區'
          }
        ],
        value: '高雄市'
      },
      {
        districts: [
          {
            zip: 817,
            value: '東沙群島'
          },
          {
            zip: 819,
            value: '南沙群島'
          }
        ],
        value: '南海島'
      },
      {
        districts: [
          {
            zip: 880,
            value: '馬公市'
          },
          {
            zip: 881,
            value: '西嶼鄉'
          },
          {
            zip: 882,
            value: '望安鄉'
          },
          {
            zip: 883,
            value: '七美鄉'
          },
          {
            zip: 884,
            value: '白沙鄉'
          },
          {
            zip: 885,
            value: '湖西鄉'
          }
        ],
        value: '澎湖縣'
      },
      {
        districts: [
          {
            zip: 890,
            value: '金沙鎮'
          },
          {
            zip: 891,
            value: '金湖鎮'
          },
          {
            zip: 892,
            value: '金寧鄉'
          },
          {
            zip: 893,
            value: '金城鎮'
          },
          {
            zip: 894,
            value: '烈嶼鄉'
          },
          {
            zip: 896,
            value: '烏坵鄉'
          }
        ],
        value: '金門縣'
      },
      {
        districts: [
          {
            zip: 900,
            value: '屏東市'
          },
          {
            zip: 901,
            value: '三地門鄉'
          },
          {
            zip: 902,
            value: '霧臺鄉'
          },
          {
            zip: 903,
            value: '瑪家鄉'
          },
          {
            zip: 904,
            value: '九如鄉'
          },
          {
            zip: 905,
            value: '里港鄉'
          },
          {
            zip: 906,
            value: '高樹鄉'
          },
          {
            zip: 907,
            value: '鹽埔鄉'
          },
          {
            zip: 908,
            value: '長治鄉'
          },
          {
            zip: 909,
            value: '麟洛鄉'
          },
          {
            zip: 911,
            value: '竹田鄉'
          },
          {
            zip: 912,
            value: '內埔鄉'
          },
          {
            zip: 913,
            value: '萬丹鄉'
          },
          {
            zip: 920,
            value: '潮州鎮'
          },
          {
            zip: 921,
            value: '泰武鄉'
          },
          {
            zip: 922,
            value: '來義鄉'
          },
          {
            zip: 923,
            value: '萬巒鄉'
          },
          {
            zip: 924,
            value: '崁頂鄉'
          },
          {
            zip: 925,
            value: '新埤鄉'
          },
          {
            zip: 926,
            value: '南州鄉'
          },
          {
            zip: 927,
            value: '林邊鄉'
          },
          {
            zip: 928,
            value: '東港鎮'
          },
          {
            zip: 929,
            value: '琉球鄉'
          },
          {
            zip: 931,
            value: '佳冬鄉'
          },
          {
            zip: 932,
            value: '新園鄉'
          },
          {
            zip: 940,
            value: '枋寮鄉'
          },
          {
            zip: 941,
            value: '枋山鄉'
          },
          {
            zip: 942,
            value: '春日鄉'
          },
          {
            zip: 943,
            value: '獅子鄉'
          },
          {
            zip: 944,
            value: '車城鄉'
          },
          {
            zip: 945,
            value: '牡丹鄉'
          },
          {
            zip: 946,
            value: '恆春鎮'
          },
          {
            zip: 947,
            value: '滿州鄉'
          }
        ],
        value: '屏東縣'
      },
      {
        districts: [
          {
            zip: 950,
            value: '臺東市'
          },
          {
            zip: 951,
            value: '綠島鄉'
          },
          {
            zip: 952,
            value: '蘭嶼鄉'
          },
          {
            zip: 953,
            value: '延平鄉'
          },
          {
            zip: 954,
            value: '卑南鄉'
          },
          {
            zip: 955,
            value: '鹿野鄉'
          },
          {
            zip: 956,
            value: '關山鎮'
          },
          {
            zip: 957,
            value: '海端鄉'
          },
          {
            zip: 958,
            value: '池上鄉'
          },
          {
            zip: 959,
            value: '東河鄉'
          },
          {
            zip: 961,
            value: '成功鎮'
          },
          {
            zip: 962,
            value: '長濱鄉'
          },
          {
            zip: 963,
            value: '太麻里鄉'
          },
          {
            zip: 964,
            value: '金峰鄉'
          },
          {
            zip: 965,
            value: '大武鄉'
          },
          {
            zip: 966,
            value: '達仁鄉'
          }
        ],
        value: '臺東縣'
      },
      {
        districts: [
          {
            zip: 970,
            value: '花蓮市'
          },
          {
            zip: 971,
            value: '新城鄉'
          },
          {
            zip: 972,
            value: '秀林鄉'
          },
          {
            zip: 973,
            value: '吉安鄉'
          },
          {
            zip: 974,
            value: '壽豐鄉'
          },
          {
            zip: 975,
            value: '鳳林鎮'
          },
          {
            zip: 976,
            value: '光復鄉'
          },
          {
            zip: 977,
            value: '豐濱鄉'
          },
          {
            zip: 978,
            value: '瑞穗鄉'
          },
          {
            zip: 979,
            value: '萬榮鄉'
          },
          {
            zip: 981,
            value: '玉里鎮'
          },
          {
            zip: 982,
            value: '卓溪鄉'
          },
          {
            zip: 983,
            value: '富里鄉'
          }
        ],
        value: '花蓮縣'
      }
    ];
  }

}
