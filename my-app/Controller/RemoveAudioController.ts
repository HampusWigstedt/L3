import Client from '../Model/client';

class RemoveAudioController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async removeAudio(file: File): Promise<void> {
        console.log('RemoveAudioController: Calling client.removeAudio');
        return this.client.removeAudio(file);
    }
}

export default RemoveAudioController;