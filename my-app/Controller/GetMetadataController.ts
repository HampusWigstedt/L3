import MediaApiCaller from '../Model/MediaApiCaller';
import FileValidator from '../Model/FileValidator';

class GetMetadataController {
    private MediaApiCaller: MediaApiCaller;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['audio/mpeg', 'audio/wav', 'video/mp4'], errorMessage: string = 'Please select a valid file.') {
        this.MediaApiCaller = new MediaApiCaller();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }


    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }


    public async fetchMetadata(file: File) {
        try {
            this.validateFile(file); 
            console.log('GetMetadataController: Calling MediaApiCaller.getMetadata');
            const metadata = await this.MediaApiCaller.getMetadata(file);
            return metadata;
        } catch (error) {
            console.error('Error fetching metadata:', error);
            throw new Error('Failed to fetch metadata. Please try again.');
        }
    }
}

export default GetMetadataController;