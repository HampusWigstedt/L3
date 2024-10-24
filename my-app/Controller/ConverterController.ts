import Client from '../Model/client';

class ConverterController {
    private static readonly allowedFileTypes = ['video/mp4', 'audio/wav'];
    private static readonly errorMessage = 'Only MP4 and WAV files are allowed.';

    private client: Client;

    constructor() {
        this.client = new Client();
    }


    public async convertFile(file: File): Promise<void> {
        try {
            this.validateFileType(file);
            console.log('ConverterController: Calling client.convertFile');
            await this.client.convertFile(file);
        } catch (error) {
            console.error('Error converting file:', error);
            throw new Error('Failed to convert file. Please try again.');
        }
    }

    
    private validateFileType(file: File): void {
        if (!ConverterController.allowedFileTypes.includes(file.type)) {
            throw new Error(ConverterController.errorMessage);
        }
    }
}

export default ConverterController;