// Import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import slide1 from '@/assets/slider1.jpg'
import slide2 from '@/assets/slider2.jpg'
import slide3 from '@/assets/slider3.jpg'
import slide4 from '@/assets/slider4.jpg'



const Slider = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide1}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='relative text-center flex flex-col items-center justify-center text-white h-full w-full p-4'>
              <h1 className='text-4xl md:text-7xl font-bold mb-4'>
                BRINGING THE GAME!
              </h1>
              <p className="text-xl md:text-2xl font-semibold">Experience intense competitive gameplay.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide2}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='relative text-center flex flex-col items-center justify-center text-white h-full w-full p-4'>
              <h1 className='text-4xl md:text-7xl font-bold mb-4'>
                ATHLETICS THE GAME!
              </h1>
              <p className="text-xl md:text-2xl font-semibold">Master thrilling sports challenges.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide3}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='relative text-center flex flex-col items-center justify-center text-white h-full w-full p-4'>
              <h1 className='text-4xl md:text-7xl font-bold mb-4'>
                CLASSIC THE GAME!
              </h1>
              <p className="text-xl md:text-2xl font-semibold">Relive timeless gaming adventures.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='relative h-[600px] flex items-center justify-center'>
            <img
              src={slide4}
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
            <div className='relative text-center flex flex-col items-center justify-center text-white h-full w-full p-4'>
              <h1 className='text-4xl md:text-7xl font-bold mb-4'>
                RACCOON ROBBERS.
              </h1>
              <p className="text-xl md:text-2xl font-semibold">Steal treasures in mischievous heists!</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
