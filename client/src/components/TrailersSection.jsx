import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import BlurCircle from './BlurCircle';
import  {PlayCircleIcon} from 'lucide-react'
const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  // Convert normal YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden"> 
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">Trailers</p>
      <div className="relative mt-6">
        <BlurCircle top="-100px" right="-100px" />
        <div className="mx-auto" style={{ maxWidth: '960px' }}>
          <iframe
            width="960"
            height="540"
            src={getEmbedUrl(currentTrailer.videoUrl)}
            title="Trailer"
            allowFullScreen
            style={{ display: 'block', margin: '0 auto' }}
          ></iframe>
        </div>
      </div>
      <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailer)=>(
          <div key={trailer.image} className='relative group-hover:not-hover:opacity-50 hoer:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer' onClick={()=>setCurrentTrailer(trailer)}>
            <img src={trailer.image} alt='trailer' className='rounded-lg w-full h-full object-cover brightness-75'/>
            <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'/>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
