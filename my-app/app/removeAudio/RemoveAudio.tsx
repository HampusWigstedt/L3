'use client'
import React, { useState } from 'react';
import RemoveAudioController from '../../Controller/RemoveAudioController';

const allowedFileTypes = ['video/mp4'];
const errorMessage = 'Please select an MP4 file.';


const RemoveAudio = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const removeAudioController = new RemoveAudioController(allowedFileTypes, errorMessage);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                removeAudioController.validateFile(file);
                setError(null);
                setSelectedFile(file);
            } catch (error) {
                setError((error as Error).message);
                setSelectedFile(null);
            }
        }
    }


    const handleRemoveAudio = async () => {
        if (selectedFile) {
            try {
                await removeAudioController.removeAudio(selectedFile);
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