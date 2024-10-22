import Client from '../Model/client';

class GetMetadataController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async getMetadata(file: File): Promise<any> {
        return await this.client.getMetadata(file);
    }
}

export default GetMetadataController;