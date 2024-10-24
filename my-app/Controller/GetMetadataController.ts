import Client from '../Model/client';

class GetMetadataController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    // Retrieves metadata for the provided file
    public async getMetadata(file: File) {
        try {
            return await this.client.getMetadata(file);
        } catch (error) {
            console.error('Error retrieving metadata:', error);
            throw new Error('Failed to retrieve metadata. Please try again.');
        }
    }
}

export default GetMetadataController;