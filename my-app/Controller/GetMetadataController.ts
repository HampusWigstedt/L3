import Client from '../Model/client';

class GetMetadataController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    // Retrieves metadata for the provided file
    public async getMetadata(file: File) {
        return this.client.getMetadata(file);
    }
}

export default GetMetadataController;