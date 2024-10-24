// StereoToSurroundController.ts
import Client from '../Model/client';
import FileValidator from '../Model/FileValidator';

class StereoToSurroundController {
    private client: Client;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['audio/mpeg', 'audio/wav'], errorMessage: string = 'Please select an MP3 or WAV file.') {
        this.client = new Client();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }

    // Validates the file type
    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }

    // Converts the file to surround sound
    public async convertToSurround(file: File): Promise<void> {
        try {
            this.validateFile(file); // Validate the file type before conversion
            console.log('StereoToSurroundController: Calling client.convertToSurround');
            await this.client.stereoToSurround(file);
        } catch (error) {
            console.error('Error converting file to surround sound:', error);
            throw new Error('Failed to convert file to surround sound. Please try again.');
        }
    }
}

export default StereoToSurroundController;