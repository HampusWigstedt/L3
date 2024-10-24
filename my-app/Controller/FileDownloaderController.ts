import FileDownloader from '../Model/FileDownloader';

class FileDownloadController {
  private fileDownloader: FileDownloader;

  constructor(fileName: string, fileContent: Blob) {
    if (!fileName || !fileContent) {
      throw new Error('File name and content must be provided.');
    }
    this.fileDownloader = new FileDownloader(fileName, fileContent);
  }


  public initiateDownload(): void {
    try {
      this.fileDownloader.download();
    } catch (error) {
      console.error('Failed to initiate file download:', error);
      throw new Error('File download failed. Please try again.');
    }
  }
}

export default FileDownloadController;