import React, { useEffect, useState } from 'react';
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
  CardHeader,
  CardFooter,
  CardBody,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";

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

const AboutUS = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fadeInAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });




  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    color: "#003566",
    backgroundColor: "#f0f1f2",
  };

  const titleStyle = {
    fontSize: '2em',
    fontFamily: 'Lilita One, sans-serif',
    marginTop: '50px',
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Arrange cards evenly along the main axis
    width: '100%',
    maxWidth: '900px',
    height:'75%',
    // Occupy full width of the container
    marginTop: '20px', // Add space above the card row
  };

  const cardStyle = {
    position: 'relative',
    width: '30%',
    minWidth: '300px',
    marginBottom: '20px',
    marginRight: '20px',
    border: '2px solid #003566',
    borderRadius: '30px',
    padding: '20px',
    boxSizing: 'border-box',
  };
  
  const paragraphStyle = {
    fontFamily: 'Urbanist, sans-serif',
    color: "#7e8f96",
    fontSize: '15.8px',
    marginTop: '10px',
    marginLeft: '-90px',
    textAlign: 'center', // Align text to the center


    width: '400%', // Adjust the width as needed
  };
  

  const buttonContainerStyle = {
    position: 'absolute',
    top: '20%', // Center vertically
    left: '50%',
    width:'70px',
    height:'70px',
    // Center horizontally
    transform: 'translate(-50%, -50%)', // Center the container itself
    backgroundColor: '#f0f1f2', // Same as background color
    padding: '10px', // Adjust padding as needed
    borderRadius: '30%', // Circular shape
    border: '2px solid #8ecae6', // Blue border
  };

  const innerButtonStyle = {
    backgroundColor: '#8ecae6', // Blue color
    width: '70px', // Adjust width as needed
    height: '70px', // Adjust height as needed
    borderRadius: '30%', // Circular shape
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
    </div>
  );
};

export default AboutUS;
