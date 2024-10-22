'use client'
import React, { useState } from 'react';
import ResizeVideoController from '../../Controller/ResizeVideoController';

const ResizeVideo = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resizeVideoController = new ResizeVideoController();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.type !== 'video/mp4') {
                setError('Please select an MP4 file.');
                setSelectedFile(null);
            } else {
                setError(null);
                setSelectedFile(file);
            }
        }
    }

    const handleResizeVideo = async () => {
        if (selectedFile && width && height) {
            try {
                console.log('Resizing video:', selectedFile);
                await resizeVideoController.resizeVideo(selectedFile, width, height);
                console.log('Video resized successfully');
            } catch (error) {
                console.error('Error resizing video:', error);
            }
        } else {
            console.error('Please select a file and enter width and height');
        }
    }

    return (
        <div className="p-4 w-screen h-screen">
            <h1 className="text-center text-4xl font-bold underline">Resize Video</h1>
            <div className="flex justify-center items-center pt-4">
                <div className="tooltip tooltip-bottom" data-tip="It's often best to divide the current width and height sizes by 1,5 or 2. If your video is 1920x1080 its best to do 1280x720(1,5) or 960x540(2). You can always do custom resolutions but results may vary.">
                    <button className="btn">Recomended Sizes</button>
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs m-2" onChange={handleFileChange} />
                <input
                    type="number"
                    placeholder="Type Width Here"
                    value={width ?? ''}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="input input-bordered w-full max-w-xs ml-2"
                />
                <input
                    type="number"
                    placeholder="Type Height Here"
                    value={height ?? ''}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="input input-bordered w-full max-w-xs ml-2"
                />
                <button className="btn btn-primary ml-2" onClick={handleResizeVideo}>Resize Video</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default ResizeVideo;