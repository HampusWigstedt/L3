This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Im not able to use fs in next app. 
Fix this



# Converto
Converto is a convertion application that functions with the help of the Easyffmpeg api. Converto helps users convert and manipulate files in defferent ways. 

### Version 1.0.0
Read Metadata - Reads the metadata of a video, image or sound file.

Convert File - Converts a mp4 file into mp3 format. As of now the only accepted file format is mp4 as no tests have been made for other file formats.

Stereo To Surround - Changes a audio files channels to 6 so that surround sound is supported for that file.

Remove Audio - Removes the audio from a mp4 or wav file.

Resize Video - Resizes a video to a specified resolution. Downsizing is the most optimal feature as bigger file-sizes requests may get stopped by the api.

## Usage


## Current Bugs
Files that are too big will not be sent back by the api.

## Language and Dependencies
Converto is a Next.js and React application written in Typescript and TSX with Tailwind CSS for styling.

The code has dependencies towards Axios for api call to Easyffmpeg. File-saver and formdata for file handling. DaisyUi for design components.
