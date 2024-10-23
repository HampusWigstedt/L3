import Client from '../Model/client';

class ConverterController {
    private static readonly allowedFileTypes = ['video/mp4', 'audio/wav'];
    private static readonly errorMessage = 'Only MP4 and WAV files are allowed.';

    private client: Client;

    constructor() {
        this.client = new Client();
    }

    // Converts the provided file if it is of an allowed type
    public async convertFile(file: File): Promise<void> {
        this.validateFileType(file);
        console.log('ConverterController: Calling client.convertFile');
        return await this.client.convertFile(file);
    }

    // Validates the file type
    private validateFileType(file: File): void {
        if (!ConverterController.allowedFileTypes.includes(file.type)) {
            throw new Error(ConverterController.errorMessage);
        }
    }
}

export default ConverterController;