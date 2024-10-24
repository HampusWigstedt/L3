import Client from '../Model/client';

class ResizeVideoController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }
    

    public async resizeVideo(file: File, width: number, height: number): Promise<void> {
        try {
            console.log('ResizeVideoController: Calling client.resizeVideo');
            await this.client.resizeVideo(file, width, height);
        } catch (error) {
            console.error('Error resizing video:', error);
            throw new Error('Failed to resize video. Please try again.');
        }
    }
}

export default ResizeVideoController;