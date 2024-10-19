'use client'
import React from 'react'
import FileDownloadController from '../../Controller/FileDownloaderController' // Import the FileDownloadController

// Define the DownloadFile component
const DownloadFile = () => {

    // Method to handle the download
    const handleDownload = () => {
        const fileContent = new Blob(["This is a mock file content"], { type: "text/plain;charset=utf-8" })
        const fileDownloadController = new FileDownloadController("mockFile.txt", fileContent)
        fileDownloadController.initiateDownload()
    }

    return (
        <div className="p-4">
            <h1 className="text-center text-4xl font-bold underline">Download File</h1>
            <div className="flex justify-center items-center pt-4">
                <button className="btn btn-primary" onClick={handleDownload}>Download Mock File</button>
            </div>
        </div>
    )
}

export default DownloadFile