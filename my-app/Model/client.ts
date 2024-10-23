import axios from 'axios';
import FormData from 'form-data';
import FileDownloader from '../Model/FileDownloader';

class Client {
    private static readonly DEFAULT_SERVER_HOST = 'localhost';
    private static readonly DEFAULT_SERVER_PORT = 3000;
    private static readonly ApiBaseUrl = 'https://cscloud6-195.lnu.se/hmus';

    private serverHost: string;
    private serverPort: number;

    constructor(serverHost: string = Client.DEFAULT_SERVER_HOST, serverPort: number = Client.DEFAULT_SERVER_PORT) {
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
        this.validateFileType(file, ['video/mp4', 'audio/wav'], 'Only MP4 and WAV files are allowed.');

        const form = await this.createFormData(file);

        try {
            const response = await axios.post<Blob>(`${Client.ApiBaseUrl}/convert`, form, {
                responseType: 'blob'
            });

            this.handleResponse(response, 'audio/mpeg', 'output.mp3');
        } catch (err) {
            this.handleError('Error making API request:', err);
        }
    }

    // Retrieves metadata of a file
    public async getMetadata(file: File) {
        const form = await this.createFormData(file);

        try {
            const response = await axios.post(`${Client.ApiBaseUrl}/metadata`, form);
            console.log('Metadata:', response.data);
            return response.data;
        } catch (err) {
            this.handleError('Error retrieving metadata:', err);
        }
    }

    // Converts stereo audio to surround sound
    public async stereoToSurround(file: File): Promise<void> {
        this.validateFileType(file, ['audio/mpeg', 'audio/wav'], 'Only MP3 or WAV files are allowed.');

        const form = await this.createFormData(file);

        try {
            const response = await axios.post<Blob>(`${Client.ApiBaseUrl}/StereoToSurround`, form, {
                responseType: 'blob'
            });

            this.handleResponse(response, 'audio/mpeg', 'output_surround.mp3');
        } catch (err) {
            this.handleError('Error making API request:', err);
        }
    }

    // Resizes a video file
    public async resizeVideo(file: File, width: number, height: number): Promise<void> {
        this.validateFileType(file, ['video/mp4'], 'Only MP4 files are allowed.');

        const form = await this.createFormData(file);
        form.append('width', width.toString());
        form.append('height', height.toString());

        try {
            const response = await axios.post<Blob>(`${Client.ApiBaseUrl}/resize`, form, {
                responseType: 'blob'
            });

            this.handleResponse(response, 'video/mp4', `resized_${file.name}`);
        } catch (err) {
            this.handleError('Error making API request:', err);
        }
    }

    // Removes audio from a video file
    public async removeAudio(file: File): Promise<void> {
        this.validateFileType(file, ['video/mp4'], 'Only MP4 files are allowed.');

        const form = await this.createFormData(file);

        try {
            const response = await axios.post<Blob>(`${Client.ApiBaseUrl}/removeaudio`, form, {
                responseType: 'blob'
            });

            this.handleResponse(response, 'video/mp4', `no_audio_${file.name}`);
        } catch (err) {
            this.handleError('Error making API request:', err);
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
        throw err;
    }
}

export default Client;