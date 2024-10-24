import Client from '../Model/client';

class RemoveAudioController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }
    

    public async removeAudio(file: File): Promise<void> {
        try {
            console.log('RemoveAudioController: Calling client.removeAudio');
            await this.client.removeAudio(file);
        } catch (error) {
            console.error('Error removing audio from video:', error);
            throw new Error('Failed to remove audio from video. Please try again.');
        }
    }
}

export default RemoveAudioController;