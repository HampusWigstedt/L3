import { saveAs } from 'file-saver';

// FileDownloader class responsible for handling file downloads
export class FileDownloader {
  private fileName: string;
  private fileContent: Blob;

  constructor(fileName: string, fileContent: Blob) {
    this.fileName = fileName;
    this.fileContent = fileContent;
  }

  public download(): void {
    saveAs(this.fileContent, this.fileName);
  }
}

export default FileDownloader;