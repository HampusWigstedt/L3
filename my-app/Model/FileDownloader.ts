import { saveAs } from 'file-saver';

// Class responsible for handling file downloads
export class FileDownloader {
  private fileName: string;
  private fileContent: Blob;

  constructor(fileName: string, fileContent: Blob) {
    this.validateInputs(fileName, fileContent);
    this.fileName = fileName;
    this.fileContent = fileContent;
  }

  // Validates the inputs
  private validateInputs(fileName: string, fileContent: Blob): void {
    if (!fileName || !fileContent) {
      throw new Error('File name and content must be provided.');
    }
  }

  // Initiates the download of the file
  public download(): void {
    try {
      this.triggerFileDownload();
    } catch (error) {
      console.error('Failed to download file:', error);
      throw new Error('File download failed. Please try again.');
    }
  }

  // Triggers the file download using the file-saver library
  private triggerFileDownload(): void {
    saveAs(this.fileContent, this.fileName);
  }
}

export default FileDownloader;