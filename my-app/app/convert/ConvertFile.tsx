'use client'
import React, { useState } from 'react';
import ConverterController from '../../Controller/ConverterController';

const allowedFileTypes = ['video/mp4'];
const errorMessage = 'Please select an MP4 file.';

// Component for converting files from MP4 to MP3
const ConvertFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const converterController = new ConverterController(allowedFileTypes, errorMessage);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                converterController.validateFile(file);
                setError(null);
                setSelectedFile(file);
            } catch (error) {
                setError((error as Error).message);
                setSelectedFile(null);
            }
        }
    }


    const handleConvertFile = async () => {
        if (selectedFile) {
            try {
                await converterController.convertFile(selectedFile);
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