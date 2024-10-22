'use client'
import React, { useState } from 'react';
import GetMetadataController from '../../Controller/GetMetadataController';

const Metadata = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const [showFullMetadata, setShowFullMetadata] = useState<boolean>(false);
    const getMetadataController = new GetMetadataController();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    }

    const handleGetMetadata = async () => {
        if (selectedFile) {
            try {
                console.log('Fetching metadata for file:', selectedFile);
                const metadata = await getMetadataController.getMetadata(selectedFile);
                console.log('Metadata:', metadata); // Log the metadata to the console
                setMetadata(metadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        } else {
            console.error('Please select a file to get metadata');
        }
    }

    const toggleFullMetadata = () => {
        setShowFullMetadata(!showFullMetadata);
    }

    const renderUsefulInformation = () => {
        if (!metadata) return null;

        // Extract useful information from the metadata object
        const { format, streams } = metadata;
        const { duration, size, bit_rate } = format;
        const { codec_name, sample_rate, channels } = streams[0];

        return (
            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold">Useful Information:</h2>
                <ul>
                    {duration && <li><strong>Duration:</strong> {duration} seconds</li>}
                    {size && <li><strong>Size:</strong> {size} bytes</li>}
                    {bit_rate && <li><strong>Bit Rate:</strong> {bit_rate} bps</li>}
                    {codec_name && <li><strong>Codec:</strong> {codec_name}</li>}
                    {sample_rate && <li><strong>Sample Rate:</strong> {sample_rate} Hz</li>}
                    {channels && <li><strong>Channels:</strong> {channels}</li>}
                </ul>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-bold underline">Read Metadata</h1>
            <div className="flex justify-center items-center pt-4">
                <input type="file" className="file-input file-input-bordered w-full max-w-xs m-2" onChange={handleFileChange} />
                <button className="btn btn-primary" onClick={handleGetMetadata}>Get Metadata</button>
            </div>
            {metadata && (
                <div className="mt-4">
                    {renderUsefulInformation()}
                    <div className="mt-4">
                        <button className="btn btn-secondary" onClick={toggleFullMetadata}>
                            {showFullMetadata ? 'Hide Full Metadata' : 'Show Full Metadata'}
                        </button>
                        {showFullMetadata && (
                            <pre className="mt-2">{JSON.stringify(metadata, null, 2)}</pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Metadata;