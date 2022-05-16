export class SwUploadFileType {
  IMAGE = ['jpg', 'jpeg', 'png'];
  TIF = ['tif', 'tiff'];
  OFFICE = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  PDF = ['pdf'];
  MP4 = ['mp4'];
  RAR = ['zip', '7z', 'rar'];
  ANY_FORMAT = this.IMAGE.concat(this.TIF).concat(this.OFFICE).concat(this.PDF);
  ANY_RAR_FORMAT = this.ANY_FORMAT.concat(this.RAR);
}
