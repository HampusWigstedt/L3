'use client'
import React, { useState } from 'react';
import RemoveAudioController from '../../Controller/RemoveAudioController';

const allowedFileType = 'video/mp4';
const errorMessage = 'Please select an MP4 file.';

// Object to handle file validation and audio removal
class FileHandler {
    private allowedFileType: string;
    private errorMessage: string;

    constructor(allowedFileType: string, errorMessage: string) {
        this.allowedFileType = allowedFileType;
        this.errorMessage = errorMessage;
    }

    // Validates the file type
    public validateFileType(file: File): void {
        if (file.type !== this.allowedFileType) {
            throw new Error(this.errorMessage);
        }
    }

    // Removes audio from the video using the provided controller
    public async removeAudio(file: File, controller: RemoveAudioController): Promise<void> {
        console.log('Removing audio from video:', file);
        await controller.removeAudio(file);
        console.log('Audio removed successfully');
    }
}

// Component for removing audio from video files
const RemoveAudio = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const removeAudioController = new RemoveAudioController();
    const fileHandler = new FileHandler(allowedFileType, errorMessage);

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

    // Initiates the audio removal process
    const handleRemoveAudio = async () => {
        if (selectedFile) {
            try {
                await fileHandler.removeAudio(selectedFile, removeAudioController);
            } catch (error) {
                console.error('Error removing audio:', error);
                setError('Error removing audio. Please try again.');
            }
        } else {
            console.error('Please select a file to remove audio');
            setError('Please select a file to remove audio');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Remove Audio from Video</h1>
            <div className="flex justify-center items-center pt-4">
                <input 
                    type="file" 
                    className="file-input file-input-bordered w-full max-w-xs m-2" 
                    onChange={handleFileChange} 
                />
                <button className="btn btn-primary ml-2" onClick={handleRemoveAudio}>Remove Audio</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default RemoveAudio;