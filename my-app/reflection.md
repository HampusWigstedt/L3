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
Error handling has been changed by quite a bit to match clean code rules. I implemented the handleError method that logs the errors and throws a descriptive message which both Ensures Proper Cleanup and Recovery and Writes descriptive error messages. To further add onto that i used exceptions instead of return codes to handle the errors. I feel like this has made the code more clean and adresses "do one thing" while still making it possible for differnet classes to have different exceptions.

Example from Client class 
```Javascript
    private handleError(message: string, err: Error | string | unknown): void {
        console.error(message, err);
        throw new Error(`${message} ${err instanceof Error ? err.message : err}`);

        // In every method we have somthing like the example below.
         this.handleError('Failed to remove audio from video:', error);
    }
```
### Chapter 8
Chapter 8 states rules for how we should use extrenal libraries. In the first iteration of the client code i used axios and some other packages to support this. This is the way i usualy do my api request and feel most comfortable with. To follow the clean code rules i needed to put these libraries in wrappers or interfaces so that they could be updated or replaced easier. I took a different approach and stepped out of my comfort-zone and rewrote all axios call into two fetch call method. One for postFile and one for metadata. This is the easies approach as we, most of the time don't need external libraries at all. You could say that i "explored and learned" as the stated example in the book.
### Chapter 9
This chapter was interesting but i can't figure out how to implement the rules in my code. I could have made a automated test with 2-3 files that test all the public methods in the project and test which ones go through without errors and if we get the correct conversions back. I chose to do semi-automated and manual test instead as this is a smaller project. I think the 3 rules of TDD are a interesting and very smart approach and i think i follow these rules even without automated tests. My thought is that if you have a vison, you are testing somthing. I think this is a interesting thought and i would love to build on it even if it isn't theoreticaly true. The optimal way would have been to do automated tests for almost everything but i think manual tests are more suted for client code in general and especially in this project. 
### Chapter 10

### Chapter 11
I chose to follow the MVC structure in this project to follow "separation of concerns" and keep testability as high as possible. The model handles the data, the view manages the presentation and the controller processes user inputs. I thought this would be the best way to approach this project as the code needed to be object oriented and react isn't very good at being object oriented. I think i did a decent job of breaking down the system down into smaller and more independent modules. This helps alot with reuseability and will help if i choose to add automated tests in future development of the project. React/next route system also helps with the structure as seen in the example below.

Example Showing the structure.

![Example Image](/public/stucture.png)
# Reflection

+ klar
? kolla igen