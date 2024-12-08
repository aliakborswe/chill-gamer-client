import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"; // Ensure this is properly imported
import Wrapper from "../common/Wrapper";
import img1 from "@/assets/blog-01.jpg";
import img2 from "@/assets/blog-02.jpg";
import img3 from "@/assets/blog-03.jpg";
import Autoplay from "embla-carousel-autoplay";
import { MoveRight } from "lucide-react";

const CheckLatestNews = () => {
  return (
    <Wrapper>
      <h2 className='text-4xl font-bold text-center  mb-8'>
        Check Latest News
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className='lg:basis-1/2'>
            <Card className='bg-primary text-white flex'>
              <img
                src={img1}
                alt='image'
                className='w-5/12 overflow-hidden object-cover rounded-t-md'
              />
              <div className='p-4 w-7/12 space-y-4'>
                <p> JULY 24. 2024</p>
                <h3 className='text-xl font-semibold'>
                  The Epic Store Will Soon Have...
                </h3>
                <p className='text-sm mt-2'>
                  Makes sens: single person or a sizable game development studio
                  can work.....{" "}
                  <span className='font-semibold text-yellow-400 flex cursor-pointer'>
                    Read more <MoveRight />
                  </span>
                </p>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='lg:basis-1/2'>
            <Card className='bg-primary text-white flex'>
              <img
                src={img2}
                alt='image'
                className='w-5/12 overflow-hidden object-cover rounded-t-md'
              />
              <div className='p-4 w-7/12 space-y-4'>
                <p> JULY 26. 2024</p>
                <h3 className='text-xl font-semibold'>
                  Apple Arcade Now Has Junk World.....
                </h3>
                <p className='text-sm mt-2'>
                  Makes sens: single person or a sizable game development studio
                  can work.....{" "}
                  <span className='font-semibold text-yellow-400 flex cursor-pointer'>
                    Read more <MoveRight />
                  </span>
                </p>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='lg:basis-1/2'>
            <Card className='bg-primary text-white flex'>
              <img
                src={img3}
                alt='image'
                className='w-5/12 overflow-hidden object-cover rounded-t-md'
              />
              <div className='p-4 w-7/12 space-y-4'>
                <p> JULY 29. 2024</p>
                <h3 className='text-xl font-semibold'>
                  Warriors of the Twilight Veil
                </h3>
                <p className='text-sm mt-2'>
                  Makes sens: single person or a sizable game development studio
                  can work.....{" "}
                  <span className='font-semibold text-yellow-400 flex cursor-pointer'>
                    Read more <MoveRight />
                  </span>
                </p>
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </Wrapper>
  );
};

export default CheckLatestNews;
