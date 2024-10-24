import Client from '../Model/client';
import FileValidator from '../Model/FileValidator';

class RemoveAudioController {
    private client: Client;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['video/mp4'], errorMessage: string = 'Please select an MP4 file.') {
        this.client = new Client();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async removeAudio(file: File): Promise<void> {
        try {
            this.validateFile(file);
            console.log('RemoveAudioController: Calling client.removeAudio');
            await this.client.removeAudio(file);
        } catch (error) {
            console.error('Error removing audio from video:', error);
            throw new Error('Failed to remove audio from video. Please try again.');
        }
    }
}

export default RemoveAudioController;