// Home component for the main page
export default function Home() {
  return (
    <main>
      <div className='text-center p-96 w-screen h-screen'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Convert your files with ease using <span className="text-primary">Converto</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Converto is a conversion application for MP4 and MP3 files, offering many different ways to change your files.
        </p>
      </div>
    </main>
  );
}