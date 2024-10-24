# Code Quality Reflection


### Chapter 2
Meaningful names is in my opinion one of the most important aspects of clean code. Caring about naming will help the author and other code readers in the long run an will make the code more readable and maintainable. I think that after L2 i have been thinking much more about the names in my code, especially with "Intent-revealing names" and "pronounceable names". I think i did a pretty good job with naming in L3.

Example from ConverterController.ts
```javascript
allowedFileTypes = ['video/mp4', 'audio/wav'];
this.validateFileType(file)
await this.client.convertFile(file);
```

### Chapter 3
The biggest change from L2 to L3 is that i cared alot more about the rules of chapter 3. Small, do one thing and number of parameters are some key parts i took with me and i think i did some pretty nice changes as to implementing these rules into my own writing. You can especially see this when looking at the client class from L2 and compare it to L3.

Below is an example of how StereoToSurround changed from L2 to L3. I extracted the methods into smaller, reusable and more maintainable methods. The only problem here is the clash between the rules of small and too many parameters. PostFile now has 4 parameters which could be seen as too many. I chose to prioritize small as im using this method in many different methods and can reused it for further implementation.

Example from L2
```javascript
    async StereoToSurround(filePath) {
        const form = new FormData()
        form.append('file', fs.createReadStream(filePath))

        try {
            const response = await axios.post(`https://cscloud6-195.lnu.se/hmus/StereoToSurround`, form, {
                headers: form.getHeaders(),
                responseType: 'stream'
            })

            // Save the response to a file
            const outputFilePath = 'output_surround.mp3'
            const writer = fs.createWriteStream(outputFilePath)
            response.data.pipe(writer)

            writer.on('finish', () => {
                console.log(`File successfully downloaded and saved as ${outputFilePath}`)
            })

            writer.on('error', (err) => {
                console.error('Error writing file:', err)
            })
        } catch (err) {
            console.error('Error making API request:', err)
        }
    }
```
Example from L3
```javascript

public async stereoToSurround(file: File): Promise<void> {
        try {
            this.validateFileType(file, ['audio/mpeg', 'audio/wav'], 'Only MP3 or WAV files are allowed.');
            const form = await this.createFormData(file);
            await this.postFile(form, 'StereoToSurround', 'audio/mpeg', 'output_surround.mp3');
        } catch (error) {
            this.handleError('Failed to convert stereo to surround sound:', error);
        }
    }



        private validateFileType(file: File, allowedTypes: string[], errorMessage: string): void {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(errorMessage);
        }
    }

        private async createFormData(file: File): Promise<FormData> {
        const form = new FormData();
        form.append('file', file);
        return form;
    }



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



        private handleError(message: string, err: Error | string | unknown): void {
        console.error(message, err);
        throw new Error(`${message} ${err instanceof Error ? err.message : err}`);
    }
```
### Chapter 4
With comments i took into account that comments should not be used too much. In L2 i used jsdoc comments and i will also keep those comments in that project as they follow the lint i use in that project. In L3 i challenged myself to write better names and only have a small description on top of methods that i feel need a little more explination. I think this is a good approach as it increases understandability and makes it easier to find what you want to change in that specified part of the code. I also removed all redundant comments and by doing the above, tried to write more Self-documenting code. 

Example from Client code where validateFileType dont need comment as this is a self explanitory method by reading the name. Also example handleResponse where i feel like it needed a little more explination.
```javascript
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
```
### Chapter 5
I think formatting has never really been a issue for me personaly. For the most part i use the format document setting in VSC and for me that is enough. In this project i took the approach of adding 2 spaces between every method and i think that was a nice touch to increase the readability of the code.
### Chapter 6
+?
### Chapter 7
+
### Chapter 8
?
### Chapter 9
+
### Chapter 10

### Chapter 11

# Reflection

+ klar
? kolla igen