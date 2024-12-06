
import Wrapper from './Wrapper';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Spinner = () => {
    return (
      <Wrapper className='flex justify-center'>
        <DotLottieReact
          src='https://lottie.host/9f9444ce-1187-4951-b002-887aa783ee36/LKpMA79FXs.lottie'
          loop
          autoplay
          style={{
            filter: "hue-rotate(-240deg)",
          }}
        />
      </Wrapper>
    );
};

export default Spinner;