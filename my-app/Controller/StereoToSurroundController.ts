import Client from '../Model/client';

class StereoToSurroundController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async convertToSurround(file: File): Promise<void> {
        if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav') {
            throw new Error('Only MP3 and WAV files are allowed.');
        }
        console.log('StereoToSurroundController: Calling client.stereoToSurround');
        return this.client.stereoToSurround(file);
    }
}

export default StereoToSurroundController;