import FileDownloader from './FileDownloader';

class MediaApiCaller {
    private static readonly defaultServerHost = 'localhost';
    private static readonly defaultServerPort = 3000;
    private static readonly apiBaseUrl = 'https://cscloud6-195.lnu.se/hmus';

    private serverHost: string;
    private serverPort: number;

    constructor(serverHost: string = MediaApiCaller.defaultServerHost, serverPort: number = MediaApiCaller.defaultServerPort) {
        this.serverHost = serverHost;
        this.serverPort = serverPort;
    }

    private async createFormData(file: File): Promise<FormData> {
        const form = new FormData();
        form.append('file', file);
        return form;
    }

    public async convertFile(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['video/mp4', 'audio/wav'], 'Only MP4 and WAV files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'convert', 'audio/mpeg', 'output.mp3');
        } catch (error) {
            this.handleError('Failed to convert file to MP3:', error);
        }
    }

    public async getMetadata(file: File) {
        try {
            const form = await this.createFormData(file);
            return await this.postMetadata(form);
        } catch (error) {
            this.handleError('Failed to retrieve metadata:', error);
        }
    }

    public async stereoToSurround(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['audio/mpeg', 'audio/wav'], 'Only MP3 or WAV files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'StereoToSurround', 'audio/mpeg', 'output_surround.mp3');
        } catch (error) {
            this.handleError('Failed to convert stereo to surround sound:', error);
        }
    }

    public async resizeVideo(file: File, width: number, height: number): Promise<void> {
        try {
            this.validateFileType(file, ['video/mp4'], 'Only MP4 files are allowed.');
            const form = await this.createFormData(file);
            form.append('width', width.toString());
            form.append('height', height.toString());
            await this.postFile(form, 'resize', 'video/mp4', `resized_${file.name}`);
        } catch (error) {
            this.handleError('Failed to resize video:', error);
        }
    }

    public async removeAudio(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['video/mp4'], 'Only MP4 files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'removeaudio', 'video/mp4', `no_audio_${file.name}`);
        } catch (error) {
            this.handleError('Failed to remove audio from video:', error);
        }
    }

    private validateFileType(file: File, allowedTypes: string[], errorMessage: string): void {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(errorMessage);
        }
    }

    private async handleResponse(response: Response, mimeType: string, fileName: string): Promise<void> {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }

        const blob = await response.blob();
        const fileDownloader = new FileDownloader(fileName, blob);
        fileDownloader.download();
    }

    private handleError(message: string, err: Error | string | unknown): void {
        console.error(message, err);
        throw new Error(`${message} ${err instanceof Error ? err.message : err}`);
    }

    private async postFile(form: FormData, endpoint: string, mimeType: string, fileName: string): Promise<void> {
        try {
            const response = await fetch(`${MediaApiCaller.apiBaseUrl}/${endpoint}`, {
                method: 'POST',
                body: form
            });
            await this.handleResponse(response, mimeType, fileName);
        } catch (err) {
            this.handleError(`Error making API request to ${endpoint}:`, err);
        }
    }

    private async postMetadata(form: FormData) {
        try {
            const response = await fetch(`${MediaApiCaller.apiBaseUrl}/metadata`, {
                method: 'POST',
                body: form
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to retrieve metadata: ${errorText}`);
            }
            const data = await response.json();
            console.log('Metadata:', data);
            return data;
        } catch (err) {
            this.handleError('Error retrieving metadata:', err);
        }
    }
}

export default MediaApiCaller;