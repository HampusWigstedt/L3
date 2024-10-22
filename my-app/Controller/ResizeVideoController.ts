import Client from '../Model/client';

class ResizeVideoController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async resizeVideo(file: File, width: number, height: number): Promise<void> {
        console.log('ResizeVideoController: Calling client.resizeVideo');
        return this.client.resizeVideo(file, width, height);
    }
}

export default ResizeVideoController;