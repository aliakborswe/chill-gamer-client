import { Info, Phone, User } from "lucide-react";
import { Card } from "../ui/card";


const About = () => {
    return (
      <div className='min-h-screen py-12 px-6 sm:px-10 lg:px-16'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl sm:text-5xl font-bold  mb-8'>
            About Chill Gamer
          </h1>
          <p className='text-lg sm:text-xl text-gray-400 mb-12'>
            Chill Gamer is a user-friendly game review application designed to
            help gamers explore and share their thoughts on various games.
            Whether you're a casual player or a hardcore gamer, Chill Gamer
            offers a peaceful space to discover new games and share your gaming
            experiences.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
            <Card className='bg-white shadow-md hover:shadow-lg p-6 rounded-lg'>
              <User
                className='text-4xl text-primary mb-4 text-center mx-auto'
                size={50}
              />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                User Reviews
              </h3>
              <p className='text-gray-600'>
                Share your thoughts on your favorite games and read reviews from
                others. Let the community know what you think!
              </p>
            </Card>

            <Card className='bg-white shadow-md hover:shadow-lg p-6 rounded-lg'>
              <Info
                className='text-4xl text-primary mb-4 text-center mx-auto'
                size={50}
              />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                Game Discovery
              </h3>
              <p className='text-gray-600'>
                Discover new games based on ratings and reviews. Chill Gamer
                helps you find the perfect game for your taste.
              </p>
            </Card>

            <Card className='bg-white shadow-md hover:shadow-lg p-6 rounded-lg'>
              <Phone
                className='text-4xl text-primary mb-4 text-center mx-auto'
                size={50}
              />
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                Fully Responsive
              </h3>
              <p className='text-gray-600'>
                Chill Gamer is fully responsive, so you can enjoy a smooth
                gaming review experience on any device, from desktop to mobile.
              </p>
            </Card>
          </div>

          <div className='mt-12 text-center'>
            <p className='text-lg sm:text-xl text-gray-400'>
              Our goal is to provide a platform where users can easily share and
              explore reviews, making it easier to find the games you love. With
              Chill Gamer, you're always in the know!
            </p>
          </div>
        </div>
      </div>
    );
};

export default About;