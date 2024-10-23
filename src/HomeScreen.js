import React from 'react';
import { useSpring, animated } from 'react-spring';
import { TypeAnimation } from 'react-type-animation';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
//   CubeTransparentIcon,
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";




const purposeText = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'We produce food for Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};



const TitleScreen = () => {
  const fadeInProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  });

  const slideInProps = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0%)' },
    config: { duration: 1000 }
  });

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left side
    height: '100vh', // Set the height of the container to full viewport height
    paddingLeft: '10%',
    color: "#c1d3fe" // Adjust the left padding as needed
  };

  return (
    <div style={containerStyle}>
      <animated.div style={fadeInProps}>
        <div style={{ fontFamily: 'Lilita One, sans-serif', fontSize: '40px', color: "#03045e", width: '500px' }}>
          {/* Added width to the div to allow text wrapping */}
          <h1>Home Doctors For U</h1>
          
        </div>
      </animated.div>
      <TypeAnimation
            sequence={[
              'We care about you',
              1000,
              'We are professionals you can trust',
              1000,
              'We give you the best treatment possible',
              1000,
              'We are Home Doctors for U',
              10000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1em', display: 'inline-block', fontFamily: 'Urbanist, sans-serif', fontSize: '30px', color: "#03045e" }}
            repeat={Infinity}
          />
      <animated.img
        src="/images/titleImage.jpg"
        alt="Your Image"
        style={{ ...slideInProps, position: 'absolute', right: '5%', maxWidth: '500px', maxHeight: '500px' }}
      />
    </div>
  );
  
};

export default TitleScreen;
