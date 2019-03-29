export interface IFileUpload {
  name: string;
  data: any;
  size?: string;
  encoding: string;
  tempFilePath?: string;  
  truncated: boolean;
  mimetype: string;

  mv: Function;
}