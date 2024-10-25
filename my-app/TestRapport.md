
# Introduction

This document serves as a comprehensive test report for the project, detailing the various tests conducted to ensure the system's functionality. The primary objective is to provide an overview of the testing process and document the results of individual tests.

The testing process includes manual tests. The tests are designed to verify that the system meets the specified requirements.

The following sections outline the system version, test environment, and detailed test cases, along with their respective statuses and comments. This report aims to provide a clear and concise summary of the testing efforts and their outcomes.


#### **Objective Description**

The goal of this document is to provide an overview of the testing in the 1.0.0 version and document the individual tests.

**Manual Tests**
   * Test cases written to test the system's functionality based on the requirements.
   * Exploratory testing to identify unexpected issues and improvements.

# Test

**System Version**: 1.0.0

**System Test**: Functionality of application

**Description of Test Environment**: Computer Windows 10, Google Chrome, Visual Studio Code.

This test covers the 5 implementations.

| Test | Description | Test method | Comment |
|------|-------------|:------:|:-------:|
| TC1 | Verify that an mp4 file can be converted and downloaded as an mp3 file via the client application. | Manual Test | OK |
| TC2 | Verify that an mp3 file's metadata can be shown via the client application. | Manual Test | OK |
| TC3 | Verify that an mp3 file with stereo sound can be converted and downloaded into an mp3 file with surround sound via the client application. | Manual Test | OK |
| TC4 | Verify that an mp4 video can be downsized by resolution and downloaded via the client application. | Manual Test | OK |
| TC5 | Verify that an mp4 file's audio can be removed and downloaded via the  client application. | Manual Test | OK |
| COVERAGE & SUCCESS |  | 5/5 | OK |

**Improvements**:

* 

**Analysis**:

## TC1 Verify that an mp4 file can be converted and downloaded as an mp3 file via the client application.

> #### Instructions
>
> 1. Go to https://convertol3.netlify.app/convert
> 2. Choose a file to convert.
> 3. Press download file and wait for file to download
> 4. Play the file and veryfy that the file only contains audio.


> #### Expected Outcome
>
> The converted file is a mp3 file with the audio from the specified mp4 file. 

> #### Outcome
>

## TC2 Verify that an mp3 file's metadata can be shown via the client application.

> #### Instructions
>
> 1. Go to https://convertol3.netlify.app/metadata
> 2. Choose a mp3 file to upload.
> 3. Press Get Metadata and wait for Metadata to show on page.
> 4. Verify that the metadata is shown in an easy way and that we are able to see the whole meatadata object.

> #### Expected Outcome
>
> Metadata of mp3 file is logged to the console and codec_name is 'mp3'

> #### Outcome
>

## TC3 Verify that an mp3 file with stereo sound can be converted and downloaded into an mp3 file with surround sound via the client application.

> #### Instructions
>
> 1. Go to https://convertol3.netlify.app/metadata and get the metadata of a mp3 file
> 2. Verify that the mp3 file has channel_layout 'stereo' and Channels '2'
> 3. Go to https://convertol3.netlify.app/stereoToSurround and convert the mp3 file with channel_layout 'stereo' and Channels '2'.
> 4. Wait for conversion and verify that the file is downloaded to the computer.
> 5. Go to https://convertol3.netlify.app/metadata and get the metadata of the converted mp3 file.
> 6. Verify that the converted mp3 has channel_layout '5.1' and Channels '6'.

> #### Expected Outcome
>
> The file converts so that it supports 5.1 surround sound.

> #### Outcome
> 

## TC4 Verify that an mp4 video can be downsized by resolution and downloaded via the client application.

> #### Instructions
>
> 1. Go to https://convertol3.netlify.app/metadata and get the metadata of the mp4 to be converted.
> 2. Verify that the mp4 file is being tested is 1920x1080 by going and reading width and hight keys in metadata object.
> 3. Go to https://convertol3.netlify.app/resizeVideo and convert the choose the 1920x1080 file, Set the width to 960 and the height to 540 by putting the values into their fieilds. 
> 4. Press resize Video and wait for convertion.
> 5. Verify that the file is downloaded to the computer.
> 6. Go to https://convertol3.netlify.app/metadata and get the metadata of the converted mp4 file.
> 7. Verify that the converted mp4 file is 960x540 by reading width and hight keys in metadata object.

> #### Expected Outcome
>
> The file is downsized to 480x320 resolution

> #### Outcome
>

## TC5 Verify that an mp4 file's audio can be removed and downloaded via the  client application.

> #### Instructions
>
> 1. Go to https://convertol3.netlify.app/removeAudio and insert a mp4 to be converted.
> 2. Verify that the file is downloaded to the computer.
> 3. Play the new mp4 file.
> 4. Verify that the new mp4 has no sound.

> #### Expected Outcome
>
> The new mp4 file has no sound when playing.

> #### Outcome
>


# Known Issues



# Conclusion
