import FAQ from "./FAQ";
import FeaturedGameSeciton from "./FeaturedGameSeciton";
import GameDevSection from "./GameDevSection";
import HighestRateGame from "./HighestRateGame";
import Slider from "./Slider";




const Home = () => {
    
     
  return (
    <div>
      <Slider/>
      <FeaturedGameSeciton/>
      <HighestRateGame/>

      <GameDevSection/>
      <FAQ/>
    </div>
  );
};

export default Home;
