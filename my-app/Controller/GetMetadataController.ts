import Client from '../Model/client';

class GetMetadataController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async getMetadata(filePath: string): Promise<any> {
        return await this.client.getMetadata(filePath);
    }
}

export default GetMetadataController;