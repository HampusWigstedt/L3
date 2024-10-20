'use client'
import React, { useState } from 'react';
import GetMetadataController from '../../Controller/GetMetadataController';

const Metadata = () => {
    const [filePath, setFilePath] = useState('');
    const [metadata, setMetadata] = useState<any>(null);
    const getMetadataController = new GetMetadataController();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFilePath(file.path);
        }
    }

    const handleGetMetadata = async () => {
        if (filePath) {
            try {
                const metadata = await getMetadataController.getMetadata(filePath);
                setMetadata(metadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        } else {
            console.error('File path must be provided');
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-bold underline">Get Metadata</h1>
            <div className="flex justify-center items-center pt-4">
                <input type="file" onChange={handleFileChange} />
                <button className="btn btn-primary" onClick={handleGetMetadata}>Get Metadata</button>
            </div>
            {metadata && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Metadata:</h2>
                    <pre>{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Metadata;