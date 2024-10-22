import Client from '../Model/client';

class ConverterController {
    private client: Client;

    constructor() {
        this.client = new Client();
    }

    public async convertFile(file: File): Promise<void> {
        if (file.type !== 'video/mp4' && file.type !== 'audio/wav') {
            throw new Error('Only MP4 and WAV files are allowed.');
        }
        console.log('ConverterController: Calling client.convertFile');
        return await this.client.convertFile(file);
    }
}

export default ConverterController;