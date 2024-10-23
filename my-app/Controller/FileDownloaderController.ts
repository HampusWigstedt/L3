import FileDownloader from '../Model/FileDownloader';

// Controller class to handle file download operations
class FileDownloadController {
  private fileDownloader: FileDownloader;

  constructor(fileName: string, fileContent: Blob) {
    this.fileDownloader = new FileDownloader(fileName, fileContent);
  }

  // Initiates the file download process
  public initiateDownload(): void {
    this.fileDownloader.download();
  }
}

export default FileDownloadController;