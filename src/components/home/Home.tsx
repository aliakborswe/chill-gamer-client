import CheckLatestNews from "./CheckLatestNews";
import FAQ from "./FAQ";
import FeaturedGameSeciton from "./FeaturedGameSeciton";
import GameDevSection from "./GameDevSection";
import HighestRateGame from "./HighestRateGame";
import Slider from "./Slider";




const Home = () => {
    
     
  return (
    <>
      <Slider/>
      <FeaturedGameSeciton/>
      <HighestRateGame/>
      <CheckLatestNews/>
      <GameDevSection/>
      <FAQ/>
    </>
  );
};

export default Home;
