import { saveAs } from 'file-saver';

// Class responsible for handling file downloads
export class FileDownloader {
  private fileName: string;
  private fileContent: Blob;

  constructor(fileName: string, fileContent: Blob) {
    this.fileName = fileName;
    this.fileContent = fileContent;
  }

  // Initiates the download of the file
  public download(): void {
    saveAs(this.fileContent, this.fileName);
  }
}

export default FileDownloader;