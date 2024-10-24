import MediaApiCaller from '../Model/MediaApiCaller';
import FileValidator from '../Model/FileValidator';

class ConverterController {
    private MediaApiCaller: MediaApiCaller;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['video/mp4'], errorMessage: string = 'Please select an MP4 file.') {
        this.MediaApiCaller = new MediaApiCaller();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async convertFile(file: File): Promise<void> {
        try {
            this.validateFile(file);
            console.log('ConverterController: Calling MediaApiCaller.convertFile');
            await this.MediaApiCaller.convertFile(file);
            console.log('File converted successfully');
        } catch (error) {
            console.error('Error converting file:', error);
            throw new Error('Failed to convert file. Please try again.');
        }
    }
}

export default ConverterController;