'use client'
import React, { useState } from 'react';
import GetMetadataController from '../../Controller/GetMetadataController';

const errorMessage = 'Please select a valid file.';

// Object to handle file validation and metadata fetching
class FileHandler {
    private errorMessage: string;

    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    // Validates the file type
    public validateFile(file: File): void {
        if (!file) {
            throw new Error(this.errorMessage);
        }
    }

    // Fetches metadata using the provided controller
    public async fetchMetadata(file: File, controller: GetMetadataController) {
        console.log('Fetching metadata for file:', file);
        const metadata = await controller.getMetadata(file);
        console.log('Metadata:', metadata); // Log the metadata to the console
        return metadata;
    }
}

// Page component for the Metadata page
const Metadata = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showFullMetadata, setShowFullMetadata] = useState<boolean>(false);
    const getMetadataController = new GetMetadataController();
    const fileHandler = new FileHandler(errorMessage);

    // Handles file selection and validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                fileHandler.validateFile(file);
                setError(null);
                setSelectedFile(file);
            } catch (error) {
                setError((error as Error).message);
                setSelectedFile(null);
            }
        }
    }

    // Fetches metadata for the selected file
    const handleGetMetadata = async () => {
        if (selectedFile) {
            try {
                const metadata = await fileHandler.fetchMetadata(selectedFile, getMetadataController);
                setMetadata(metadata);
            } catch (error) {
                console.error('Error fetching metadata:', error);
                setError('Error fetching metadata. Please try again.');
            }
        } else {
            console.error('Please select a file to get metadata');
            setError('Please select a file to get metadata');
        }
    }

    // Toggles the display of full metadata
    const toggleFullMetadata = () => {
        setShowFullMetadata(!showFullMetadata);
    }

    // Renders useful information extracted from the metadata
    const renderUsefulInformation = () => {
        if (!metadata) return null;

        const { format, streams } = metadata;
        const { duration, size, bit_rate: bitRate } = format;
        const { codec_name: codecName, sample_rate: sampleRate, channels } = streams[0];

        return (
            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold">Useful Information:</h2>
                <ul>
                    {duration && <li><strong>Duration:</strong> {duration} seconds</li>}
                    {size && <li><strong>Size:</strong> {size} bytes</li>}
                    {bitRate && <li><strong>Bit Rate:</strong> {bitRate} bps</li>}
                    {codecName && <li><strong>Codec:</strong> {codecName}</li>}
                    {sampleRate && <li><strong>Sample Rate:</strong> {sampleRate} Hz</li>}
                    {channels && <li><strong>Channels:</strong> {channels}</li>}
                </ul>
            </div>
        );
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Read Metadata</h1>
            <div className="flex justify-center items-center pt-4">
                <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs m-2"
                    onChange={handleFileChange}
                />
                <button className="btn btn-primary" onClick={handleGetMetadata}>Get Metadata</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
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