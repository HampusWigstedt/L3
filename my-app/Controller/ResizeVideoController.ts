import Client from '../Model/client';
import FileValidator from '../Model/FileValidator';

class ResizeVideoController {
    private client: Client;
    private fileValidator: FileValidator;

    constructor(allowedFileType: string[] = ['video/mp4'], errorMessage: string = 'Please select an MP4 file.') {
        this.client = new Client();
        this.fileValidator = new FileValidator(allowedFileType, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async resizeVideo(file: File, width: number, height: number): Promise<void> {
        try {
            this.validateFile(file);
            console.log('ResizeVideoController: Calling client.resizeVideo');
            await this.client.resizeVideo(file, width, height);
        } catch (error) {
            console.error('Error resizing video:', error);
            throw new Error('Failed to resize video. Please try again.');
        }
    }
}

export default ResizeVideoController;