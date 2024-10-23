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
        this.validateFileType(file);
        console.log('StereoToSurroundController: Calling client.stereoToSurround');
        return this.client.stereoToSurround(file);
    }

    // Validates the file type
    private validateFileType(file: File): void {
        if (!StereoToSurroundController.allowedFileTypes.includes(file.type)) {
            throw new Error(StereoToSurroundController.errorMessage);
        }
    }
}

export default StereoToSurroundController;