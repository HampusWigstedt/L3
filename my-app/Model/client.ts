import axios from 'axios';
import FormData from 'form-data';
import FileDownloader from '../Model/FileDownloader';

class Client {
    private serverHost: string;
    private serverPort: number;

    constructor(serverHost: string = 'localhost', serverPort: number = 3000) {
        this.serverHost = serverHost;
        this.serverPort = serverPort;
    }

    private async createFormData(file: File): Promise<FormData> {
        const form = new FormData();
        form.append('file', file);
        return form;
    }

    private async saveStreamToFile(dataStream: NodeJS.ReadableStream, outputFilePath: string): Promise<void> {
        if (typeof window === 'undefined') {
            const fs = await import('fs');
            const writer = fs.createWriteStream(outputFilePath);

            dataStream.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => {
                    console.log(`File successfully downloaded and saved as ${outputFilePath}`);
                    resolve();
                });

                writer.on('error', (err: Error) => {
                    console.error('Error writing file:', err);
                    reject(err);
                });
            });
        } else {
            console.error("File operations can only be run on the server.");
            return Promise.reject(new Error("File operations can only be run on the server."));
        }
    }

    public async convertFile(file: File): Promise<void> {
        if (file.type !== 'video/mp4') {
            throw new Error('Only MP4 files are allowed.');
        }

        const form = await this.createFormData(file);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/convert`, form, {
                responseType: 'blob'
            });

            if (!response.data) {
                throw new Error('No data received from the server.');
            }

            const blob = new Blob([response.data], { type: 'audio/mpeg' });
            const fileName = 'output.mp3';
            const fileDownloader = new FileDownloader(fileName, blob);
            fileDownloader.download();
        } catch (err) {
            console.error('Error making API request:', err);
            throw err;
        }
    }

    public async getMetadata(file: File): Promise<any> {
        const form = await this.createFormData(file);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/metadata`, form);
            console.log('Metadata:', response.data);
            return response.data; // Return metadata for further processing
        } catch (err) {
            console.error('Error retrieving metadata:', err);
            throw err; // Re-throw error for handling in the UI
        }
    }

    public async stereoToSurround(filePath: string): Promise<void> {
        const form = await this.createFormData(filePath);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/StereoToSurround`, form, {
                headers: form.getHeaders(),
                responseType: 'stream'
            });

            await this.saveStreamToFile(response.data as NodeJS.ReadableStream, 'output_surround.mp3');
        } catch (err) {
            console.error('Error making API request:', err);
        }
    }

    public async resizeVideo(filePath: string, width: number, height: number): Promise<void> {
        const form = await this.createFormData(filePath);
        form.append('width', width.toString());
        form.append('height', height.toString());

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/resize`, form, {
                headers: form.getHeaders(),
                responseType: 'stream'
            });

            await this.saveStreamToFile(response.data as NodeJS.ReadableStream, `resized_${filePath}`);
        } catch (err) {
            console.error('Error making API request:', err);
        }
    }

    public async removeAudio(filePath: string): Promise<void> {
        const form = await this.createFormData(filePath);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/removeaudio`, form, {
                headers: form.getHeaders(),
                responseType: 'stream'
            });

            await this.saveStreamToFile(response.data as NodeJS.ReadableStream, `no_audio_${filePath}`);
        } catch (err) {
            console.error('Error making API request:', err);
        }
    }
}

export default Client;
