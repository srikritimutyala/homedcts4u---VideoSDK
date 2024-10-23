import React from 'react';



const SquareWithIcon = ({ iconSrc, text, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyle = {
    position: 'relative',
    width: '250px',
    height: '350px', // Adjust height to accommodate the image and text
    overflow: 'hidden',
  };

  const squareStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: '#8ecae6',
    borderRadius: '30px',
    display: 'flex',
    flexDirection: 'column', // Align items vertically
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  };

  const iconStyle = {
    width: '60%',
    height: 'auto',
    transition: 'opacity 0.3s ease',
    opacity: isHovered ? '0' : '1',
  };

  const textStyle = {
    position: 'absolute',
    textAlign: 'center',
    fontFamily: 'Urbanist, sans-serif',

    marginTop: '10px', // Adjust spacing between image and text
    opacity: isHovered ? '1' : '0',
    visibility: isHovered ? 'visible' : 'hidden',
    color: '#fff',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    animation: isHovered ? 'scrollText 5s linear infinite' : 'none',
  };
  const descStyle = {
    color:"#003566",
    fontFamily: 'Lilita One, sans-serif',
    fontSize:"20px",
    
    // position: 'absolute',
    textAlign: 'center',
    marginTop: '-150px', // Adjust spacing between image and text
    // opacity: isHovered ? '1' : '0',
    visibility: isHovered ? 'hidden' : 'visible',
    color: '#fff',
    // transition: 'opacity 0.3s ease, visibility 0.3s ease',
    // animation: isHovered ? 'scrollText 5s linear infinite' : 'none',
  };

  const hoverStyles = {
    opacity: '60',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ ...squareStyle, ...(isHovered && hoverStyles) }}>
        <img src={iconSrc} alt="Icon" style={iconStyle} />
        <p style={textStyle}>{text}</p>
        <p style={{ ...descStyle, marginTop: '5px' }}>{description}</p> {/* Added description */}
      </div>
    </div>
  );
};





const OurServices = () => {
    const servicesContainerStyle = {
      display: 'flex',
      flexDirection: 'row', // Change to 'row' to align items horizontally
      justifyContent: 'center', // Align items horizontally in the center
      alignItems: 'center', // Align items vertically in the center
      height: '100vh',
    };
  
    const rowStyle = {
      display: 'flex',
      justifyContent: 'center', // Center the row horizontally
      marginBottom: '20px', // Add space between rows
    };
  
    const squareStyle = {
      marginRight: '20px', // Add space between squares
    };
  
    const headerStyle = {
      textAlign: 'center',
      fontSize: '2em',
      marginTop: '50px',
      color:"#003566",
      fontFamily: 'Lilita One, sans-serif',
    };
  
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={headerStyle}>Our Services</h1>
        <p style={{ fontFamily: 'Urbanist, sans-serif', color: "#7e8f96", fontSize: '20px', marginTop: '-10px' }}>Professionals you can rely on</p>

        <div style={servicesContainerStyle}>
          <div style={rowStyle}>
            <div style={squareStyle}>
              <SquareWithIcon iconSrc="/images/wheelchair2.png" text="Physicians or nurse practitioner in-home or telehealth visits to provide acute symptoms management, short term care due to recent surgery or changes on medical condition, follow up post hospital discharge, primary Care." description="What We Do" />
            </div>
            <div style={squareStyle}>
              <SquareWithIcon iconSrc="/images/clipboard3.png" text="Referrals for other health services as required (home health nurse, home health aide, physical,occupational, speech therapy, hospice/palliative care, podiatrist, Laboratory test, Diagnostic/x-ray services, specialist, community services, social workers, homemaker, caregiver, medical supplies/equipments, home delivery pharmacy.  " description="Referrals" />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={squareStyle}>
              <SquareWithIcon iconSrc="/images/bandage3.png" text="Patients that meet the requirements for homebound status, who has difficulty leaving home due to mobility, cognitive limitations, who is in need of help of another person or medical equipment or special transportation and requires taxing effort to leave home or doctor believes that leaving home will worsen health or illness." description="Do You Qualify?" />
            </div>
            <div style={squareStyle}>
              <SquareWithIcon iconSrc="/images/insurance.png" text="Most insurance plans cover home physician visits for eligible patients. We will work with your carrier to determine eligibility, We also accept patients without medical insurance.  Contact us to find discounted rates for physician home visits and services. We accept: Medicare, Aetna, BlueCross Blue Shield, Cigna, Humana plans, Preferred Medical Plans, Tricare, Wellcare and United Health Care" description="Insurance"/>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

export default OurServices;
