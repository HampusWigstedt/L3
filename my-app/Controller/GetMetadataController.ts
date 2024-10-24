// GetMetadataController.ts
import Client from '../Model/client';
import FileValidator from '../Model/FileValidator';

class GetMetadataController {
    private client: Client;
    private fileValidator: FileValidator;

    constructor(allowedFileTypes: string[] = ['audio/mpeg', 'audio/wav', 'video/mp4'], errorMessage: string = 'Please select a valid file.') {
        this.client = new Client();
        this.fileValidator = new FileValidator(allowedFileTypes, errorMessage);
    }

    // Validates the file type
    public validateFile(file: File): void {
        this.fileValidator.validate(file);
    }

    // Fetches metadata using the provided client
    public async fetchMetadata(file: File) {
        try {
            this.validateFile(file); // Validate the file type before fetching metadata
            console.log('GetMetadataController: Calling client.getMetadata');
            const metadata = await this.client.getMetadata(file);
            console.log('Metadata:', metadata); // Log the metadata to the console
            return metadata;
        } catch (error) {
            console.error('Error fetching metadata:', error);
            throw new Error('Failed to fetch metadata. Please try again.');
        }
    }
}

export default GetMetadataController;