import MediaApiCaller from '../Model/MediaApiCaller';
import FileValidator from '../Model/FileValidator';

class RemoveAudioController {
    private MediaApiCaller: MediaApiCaller;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['video/mp4'], errorMessage: string = 'Please select an MP4 file.') {
        this.MediaApiCaller = new MediaApiCaller();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async removeAudio(file: File): Promise<void> {
        try {
            this.validateFile(file);
            console.log('RemoveAudioController: Calling MediaApiCaller.removeAudio');
            await this.MediaApiCaller.removeAudio(file);
        } catch (error) {
            console.error('Error removing audio from video:', error);
            throw new Error('Failed to remove audio from video. Please try again.');
        }
    }
}

export default RemoveAudioController;