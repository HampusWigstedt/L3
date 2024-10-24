import axios from 'axios';
import FormData from 'form-data';
import FileDownloader from '../Model/FileDownloader';

class Client {
    private static readonly defaultServerHost = 'localhost';
    private static readonly defaultServerPort = 3000;
    private static readonly apiBaseUrl = 'https://cscloud6-195.lnu.se/hmus';

    private serverHost: string;
    private serverPort: number;

    constructor(serverHost: string = Client.defaultServerHost, serverPort: number = Client.defaultServerPort) {
        this.serverHost = serverHost;
        this.serverPort = serverPort;
    }

    // Creates FormData object from a file
    private async createFormData(file: File): Promise<FormData> {
        const form = new FormData();
        form.append('file', file);
        return form;
    }

    // Converts a file to MP3 format
    public async convertFile(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['video/mp4', 'audio/wav'], 'Only MP4 and WAV files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'convert', 'audio/mpeg', 'output.mp3');
        } catch (error) {
            this.handleError('Failed to convert file to MP3:', error);
        }
    }

    // Retrieves metadata of a file
    public async getMetadata(file: File) {
        try {
            const form = await this.createFormData(file);
            return await this.postMetadata(form);
        } catch (error) {
            this.handleError('Failed to retrieve metadata:', error);
        }
    }

    // Converts stereo audio to surround sound
    public async stereoToSurround(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['audio/mpeg', 'audio/wav'], 'Only MP3 or WAV files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'StereoToSurround', 'audio/mpeg', 'output_surround.mp3');
        } catch (error) {
            this.handleError('Failed to convert stereo to surround sound:', error);
        }
    }

    // Resizes a video file
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

    // Removes audio from a video file
    public async removeAudio(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['video/mp4'], 'Only MP4 files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'removeaudio', 'video/mp4', `no_audio_${file.name}`);
        } catch (error) {
            this.handleError('Failed to remove audio from video:', error);
        }
    }

    // Validates the file type
    private validateFileType(file: File, allowedTypes: string[], errorMessage: string): void {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(errorMessage);
        }
    }

    // Handles the API response and initiates file download
    private handleResponse(response: { data: Blob }, mimeType: string, fileName: string): void {
        if (!response.data) {
            throw new Error('No data received from the server.');
        }

        const blob = new Blob([response.data], { type: mimeType });
        const fileDownloader = new FileDownloader(fileName, blob);
        fileDownloader.download();
    }

    // Handles errors consistently
    private handleError(message: string, err: Error | string | unknown): void {
        console.error(message, err);
        throw new Error(`${message} ${err instanceof Error ? err.message : err}`);
    }

    // Posts file to the specified endpoint and handles the response
    private async postFile(form: FormData, endpoint: string, mimeType: string, fileName: string): Promise<void> {
        try {
            const response = await axios.post<Blob>(`${Client.apiBaseUrl}/${endpoint}`, form, {
                responseType: 'blob'
            });
            this.handleResponse(response, mimeType, fileName);
        } catch (err) {
            this.handleError(`Error making API request to ${endpoint}:`, err);
        }
    }

    // Posts form data to the metadata endpoint and returns the response data
    private async postMetadata(form: FormData) {
        try {
            const response = await axios.post(`${Client.apiBaseUrl}/metadata`, form);
            console.log('Metadata:', response.data);
            return response.data;
        } catch (err) {
            this.handleError('Error retrieving metadata:', err);
        }
    }
}

export default Client;