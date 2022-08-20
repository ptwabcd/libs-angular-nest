export class SwUploadToolConfig {
  accept?: string;
  fileSize?: number;
  fileType?: Array<string>;
  currentFile: string; // 目前是否有檔案
  originalFile: string; // 原始檔案
}
