'use client'
import React, { useState } from 'react';
import GetMetadataController from '../../Controller/ConverterController';

const ConvertFile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const ConverterController = new GetMetadataController();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    }

    const handleConvertFile = async () => {
        if (selectedFile) {
            try {
                console.log('Converting file:', selectedFile);
                await ConverterController.convertFile(selectedFile);
                console.log('File converted successfully');
            } catch (error) {
                console.error('Error converting file:', error);
            }
        } else {
            console.error('Please select a file to convert');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Convert Mp4 to Mp3</h1>
            <div className="flex justify-center items-center pt-4">
                <input type="file" className="file-input file-input-bordered w-full max-w-xs m-2" onChange={handleFileChange} />
                <button className="btn btn-primary" onClick={handleConvertFile}>Download File</button>
            </div>
        </div>
    );
}

export default ConvertFile;