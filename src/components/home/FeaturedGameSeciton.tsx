import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"; // Ensure this is properly imported
import Wrapper from "../common/Wrapper";
import img1 from "@/assets/portfolio-01-840x540.jpg";
import img2 from "@/assets/portfolio-02-840x540.jpg";
import img3 from "@/assets/portfolio-03-840x540.jpg";
import img4 from "@/assets/portfolio-04-840x540.jpg";
import Autoplay from "embla-carousel-autoplay";

const FeaturedGameSection = () => {
  return (
    <Wrapper>
      <h2 className='text-4xl font-bold text-center  mb-8'>Featured Games</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <Card className='bg-primary text-white'>
              <img
                src={img1}
                alt='image'
                className='w-full h-48 object-cover rounded-t-md'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold'>CREATIVE LAND</h3>
                <p className='text-sm mt-2'>Rating: 8.6</p>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <Card className='bg-primary text-white'>
              <img
                src={img2}
                alt='image'
                className='w-full h-48 object-cover rounded-t-md'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold'>ADVENTURE</h3>
                <p className='text-sm mt-2'>Rating: 8</p>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <Card className='bg-primary text-white'>
              <img
                src={img3}
                alt='image'
                className='w-full h-48 object-cover rounded-t-md'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold'>ENTERTAINING</h3>
                <p className='text-sm mt-2'>Rating: 7.6</p>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
            <Card className='bg-primary text-white'>
              <img
                src={img4}
                alt='image'
                className='w-full h-48 object-cover rounded-t-md'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold'>ROLE PLAYING</h3>
                <p className='text-sm mt-2'>Rating: 9</p>
              </div>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </Wrapper>
  );
};

export default FeaturedGameSection;
