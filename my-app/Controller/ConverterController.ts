import Client from '../Model/client';
import FileValidator from '../Model/FileValidator';

class ConverterController {
    private client: Client;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['video/mp4'], errorMessage: string = 'Please select an MP4 file.') {
        this.client = new Client();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async convertFile(file: File): Promise<void> {
        try {
            this.validateFile(file);
            console.log('ConverterController: Calling client.convertFile');
            await this.client.convertFile(file);
            console.log('File converted successfully');
        } catch (error) {
            console.error('Error converting file:', error);
            throw new Error('Failed to convert file. Please try again.');
        }
    }
}

export default ConverterController;