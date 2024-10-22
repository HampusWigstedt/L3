import Client from '../Model/client';

class GetMetadataController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async getMetadata(file: File): Promise<any> {
        console.log('GetMetadataController: Calling client.getMetadata');
        return await this.client.getMetadata(file);
    }
}

export default GetMetadataController;