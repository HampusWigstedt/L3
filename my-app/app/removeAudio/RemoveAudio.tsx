'use client'
import React, { useState } from 'react';
import RemoveAudioController from '../../Controller/RemoveAudioController';

const RemoveAudio = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const removeAudioController = new RemoveAudioController();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log('Selected file type:', file.type); // Log the detected MIME type
            if (file.type !== 'video/mp4') {
                setError('Please select an MP4 file.');
                setSelectedFile(null);
            } else {
                setError(null);
                setSelectedFile(file);
            }
        }
    }

    const handleRemoveAudio = async () => {
        if (selectedFile) {
            try {
                console.log('Removing audio from video:', selectedFile);
                await removeAudioController.removeAudio(selectedFile);
                console.log('Audio removed successfully');
            } catch (error) {
                console.error('Error removing audio:', error);
            }
        } else {
            console.error('Please select a file to remove audio');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Remove Audio from Video</h1>
            <div className="flex justify-center items-center pt-4">
                <input type="file" className="file-input file-input-bordered w-full max-w-xs m-2" onChange={handleFileChange} />
                <button className="btn btn-primary ml-2" onClick={handleRemoveAudio}>Remove Audio</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default RemoveAudio;