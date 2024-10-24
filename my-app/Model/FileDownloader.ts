import { saveAs } from 'file-saver';

export class FileDownloader {
  private fileName: string;
  private fileContent: Blob;
  

  constructor(fileName: string, fileContent: Blob) {
    this.validateInputs(fileName, fileContent);
    this.fileName = fileName;
    this.fileContent = fileContent;
  }


  private validateInputs(fileName: string, fileContent: Blob): void {
    if (!fileName || !fileContent) {
      throw new Error('File name and content must be provided.');
    }
  }


  public download(): void {
    try {
      this.triggerFileDownload();
    } catch (error) {
      console.error('Failed to download file:', error);
      throw new Error('File download failed. Please try again.');
    }
  }


  private triggerFileDownload(): void {
    saveAs(this.fileContent, this.fileName);
  }
}

export default FileDownloader;