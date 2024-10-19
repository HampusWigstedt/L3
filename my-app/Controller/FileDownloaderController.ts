import FileDownloader from '../Model/FileDownloader';

class FileDownloadController {
  private fileDownloader: FileDownloader;

  constructor(fileName: string, fileContent: Blob) {
    this.fileDownloader = new FileDownloader(fileName, fileContent);
  }

  public initiateDownload(): void {
    this.fileDownloader.download();
  }
}

export default FileDownloadController;