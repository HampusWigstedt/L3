import Client from '../Model/client';

class StereoToSurroundController {
    private static readonly allowedFileTypes = ['audio/mpeg', 'audio/wav'];
    private static readonly errorMessage = 'Only MP3 and WAV files are allowed.';

    private client: Client;

    constructor() {
        this.client = new Client();
    }

    // Converts a stereo audio file to surround sound
    public async convertToSurround(file: File): Promise<void> {
        try {
            this.validateFileType(file);
            console.log('StereoToSurroundController: Calling client.stereoToSurround');
            await this.client.stereoToSurround(file);
        } catch (error) {
            console.error('Error converting file to surround sound:', error);
            throw new Error('Failed to convert file to surround sound. Please try again.');
        }
    }

    // Validates the file type
    private validateFileType(file: File): void {
        if (!StereoToSurroundController.allowedFileTypes.includes(file.type)) {
            throw new Error(StereoToSurroundController.errorMessage);
        }
    }
}

export default StereoToSurroundController;