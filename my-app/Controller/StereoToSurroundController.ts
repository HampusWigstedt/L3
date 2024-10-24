import MediaApiCaller from '../Model/MediaApiCaller';
import FileValidator from '../Model/FileValidator';

class StereoToSurroundController {
    private MediaApiCaller: MediaApiCaller;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['audio/mpeg', 'audio/wav'], errorMessage: string = 'Please select an MP3 or WAV file.') {
        this.MediaApiCaller = new MediaApiCaller();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async convertToSurround(file: File): Promise<void> {
        try {
            this.validateFile(file);
            await this.MediaApiCaller.stereoToSurround(file);
        } catch (error) {
            console.error('Error converting file to surround sound:', error);
            throw new Error('Failed to convert file to surround sound. Please try again.');
        }
    }
}

export default StereoToSurroundController;