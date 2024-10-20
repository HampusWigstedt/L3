import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { WriteStream } from 'fs';

class Client {
    private serverHost: string;
    private serverPort: number;

    constructor(serverHost: string = 'localhost', serverPort: number = 3000) {
        this.serverHost = serverHost;
        this.serverPort = serverPort;
    }

    private createFormData(filePath: string): FormData {
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        return form;
    }

    private async saveStreamToFile(dataStream: NodeJS.ReadableStream, outputFilePath: string): Promise<void> {
        const writer: WriteStream = fs.createWriteStream(outputFilePath);
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
    }

    public async convertFile(filePath: string): Promise<void> {
        const form = this.createFormData(filePath);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/convert`, form, {
                headers: form.getHeaders(),
                responseType: 'stream'
            });

            await this.saveStreamToFile(response.data as NodeJS.ReadableStream, 'output.mp3');
        } catch (err) {
            console.error('Error making API request:', err);
        }
    }

    public async getMetadata(filePath: string): Promise<void> {
        const form = this.createFormData(filePath);

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/metadata`, form, {
                headers: form.getHeaders()
            });

            console.log('Metadata:', response.data);
        } catch (err) {
            console.error('Error retrieving metadata:', err);
        }
    }

    public async stereoToSurround(filePath: string): Promise<void> {
        const form = this.createFormData(filePath);

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
        const form = this.createFormData(filePath);
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
        const form = this.createFormData(filePath);

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