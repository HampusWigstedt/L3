'use client'
import React, { useState } from 'react';
import ConverterController from '../../Controller/ConverterController';

const allowedFileTypes = ['video/mp4'];
const errorMessage = 'Please select an MP4 file.';

// Object to handle file validation and conversion
class FileHandler {
    private allowedFileTypes: string[];
    private errorMessage: string;

    constructor(allowedFileTypes: string[], errorMessage: string) {
        this.allowedFileTypes = allowedFileTypes;
        this.errorMessage = errorMessage;
    }

    // Validates the file type
    public validateFileType(file: File): void {
        if (!this.allowedFileTypes.includes(file.type)) {
            throw new Error(this.errorMessage);
        }
    }

    // Converts the file using the provided controller
    public async convertFile(file: File, controller: ConverterController): Promise<void> {
        console.log('Converting file:', file);
        await controller.convertFile(file);
        console.log('File converted successfully');
    }
}

// Component for converting files from MP4 to MP3
const ConvertFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const converterController = new ConverterController();
    const fileHandler = new FileHandler(allowedFileTypes, errorMessage);

    // Handles file selection and validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                fileHandler.validateFileType(file);
                setError(null);
                setSelectedFile(file);
            } catch (error) {
                setError((error as Error).message);
                setSelectedFile(null);
            }
        }
    }

    // Initiates the file conversion process
    const handleConvertFile = async () => {
        if (selectedFile) {
            try {
                await fileHandler.convertFile(selectedFile, converterController);
            } catch (error) {
                console.error('Error converting file:', error);
                setError('Error converting file. Please try again.');
            }
        } else {
            console.error('Please select a file to convert');
            setError('Please select a file to convert');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Convert Mp4 to Mp3</h1>
            <div className="flex justify-center items-center pt-4">
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs m-2" 
                    onChange={handleFileChange} 
                />
                <button className="btn btn-primary" onClick={handleConvertFile}>Download File</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default ConvertFile;