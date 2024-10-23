'use client'
import React, { useState } from 'react';
import StereoToSurroundController from '../../Controller/StereoToSurroundController';

const allowedFileTypes = ['audio/mpeg', 'audio/wav'];
const errorMessage = 'Please select an MP3 or WAV file.';

// Object to handle file validation and conversion
class FileHandler {
    private allowedFileTypes: string[];
    private errorMessage: string;

    constructor(allowedFileTypes: string[], errorMessage: string) {
        this.allowedFileTypes = allowedFileTypes;
        this.errorMessage = errorMessage;
    }

    // Validates the file type
    public validateFileType(file: File): string | null {
        if (!this.allowedFileTypes.includes(file.type)) {
            return this.errorMessage;
        }
        return null;
    }

    // Converts the file using the provided controller
    public async convertFile(file: File, controller: StereoToSurroundController): Promise<void> {
        console.log('Converting file to surround sound:', file);
        await controller.convertToSurround(file);
        console.log('File converted successfully');
    }
}

// Component for converting stereo audio to surround sound
const StereoToSurround = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const stereoToSurroundController = new StereoToSurroundController();
    const fileHandler = new FileHandler(allowedFileTypes, errorMessage);

    // Handles file selection and validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const error = fileHandler.validateFileType(file);
            setError(error);
            setSelectedFile(error ? null : file);
        }
    }

    // Initiates the file conversion process
    const handleConvertFile = async () => {
        if (selectedFile) {
            try {
                await fileHandler.convertFile(selectedFile, stereoToSurroundController);
            } catch (error) {
                console.error('Error converting file:', error);
            }
        } else {
            console.error('Please select a file to convert');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Convert Stereo to Surround</h1>
            <div className="flex justify-center items-center pt-4">
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs m-2" 
                    onChange={handleFileChange} 
                />
                <button className="btn btn-primary" onClick={handleConvertFile}>Convert File</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default StereoToSurround;