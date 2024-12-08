import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import devImg from "@/assets/demo2-about-img.jpg";

const GameDevSection =() =>{
  return (
    <section className=''>
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          {/* Left Column - Image */}
          <div className='relative rounded-lg overflow-hidden'>
            <img
              src={devImg}
              alt='Game developer working at a setup with RGB lighting'
              className='w-full h-auto rounded-lg'
              width={800}
              height={600}
            />
          </div>

          {/* Right Column - Content */}
          <div className='space-y-6 lg:space-y-8'>
            {/* Label */}
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 bg-primary' />
              <span className='text-primary font-medium tracking-wider text-sm'>
                WHO WE ARE
              </span>
            </div>

            {/* Heading */}
            <h2 className='text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight'>
              AN AWARD WINNING
              <br />
              GAME DEVELOPMENT
            </h2>

            {/* Description */}
            <p className='text-gray-400 text-lg leading-relaxed max-w-2xl'>
              Get to know us better and discover what sets us apart. From our
              values to our goals, our background to our team, there's much to
              explore! Feel like you're an excellent fit for our team? Explore
              open game.
            </p>

            {/* Numbered List */}
            <div className='space-y-4 py-4'>
              <div className='flex items-start gap-4'>
                <span className='text-primary text-xl font-bold'>01</span>
                <p className=' text-lg font-medium'>
                  Be Greeted With Cuteness Every Time You Game
                </p>
              </div>
              <div className='flex items-start gap-4'>
                <span className='text-primary text-xl font-bold'>02</span>
                <p className=' text-lg font-medium'>
                  Embark On A Journey Of Cuteness And Games
                </p>
              </div>
            </div>

            {/* Button */}
            <Button className='group bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-none px-8 py-6 text-lg'>
              KNOW MORE
              <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameDevSection;
