// App.js
import Modal from 'react-modal';

import React, { useEffect, useMemo, useRef, useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult,signInWithPopup } from 'firebase/auth';
import { getFirestore,query,where, doc,addDoc,orderBy,onSnapshot, setDoc, getDoc, collection, getDocs, updateDoc, arrayUnion,arrayRemove} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import CalendarComp from './CalendarComp.js'; // Ensure proper import for the calendar component
import firebaseConfig from './firebaseConfig';
import Login from './Login.js';
import HomeScreen from './HomeScreen.js';
import './Login.css'; // Import CSS file for styling
import AboutUS from './AboutUs.js';

import { useSpring, animated } from 'react-spring';
import CalendarCompPatient from './CalendarCompPatient.js'; 
import ChatBox from './ChatBox';
import displayNurseAptsCard from './App.js'
import { Button } from "@material-tailwind/react";
import menuIcon from './images/logo.png';
import Contact from './Contact.js';

import {Cell, Column, Row, TableView, TableBody, TableHeader,ActionButton,Flex} from '@adobe/react-spectrum'

// Modal.setAppElement('#root'); 

// Ensure proper import for the calendar component


import { createRoom } from './videoSDK.js'; // Import the createRoom function from videoSDK.js

import {getMeetingId, getToken} from "./api"
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./api";
import ReactPlayer from "react-player";
import OurServices from './OurServices.js';
// import AboutUS from './AboutUs.js';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
let meetingID;
let confirmedPatient = false;
let confirmedNurse = false;
let nurseChosen = false;
let patientChosen = false;

let patMt = null;

  // Function to check the value of the variable
  const patientsCollection = collection(firestore, 'patients');

const checkMeetingIDs = async () => {
  const snapshot = await getDocs(patientsCollection);
  snapshot.forEach((doc) => {
    const patientData = doc.data();
    const { meetingIDs } = patientData;

    // Check if meetingIDs array has 2 or more items
    if (meetingIDs && meetingIDs.length >= 2) {
      const lastMeeting = meetingIDs[meetingIDs.length - 1];
      // Set patient meeting variable to the last element in the array
      // You may need to define the patient meeting variable outside of this function depending on your application logic
patMt = lastMeeting;      // If you want to set the patient meeting variable for a specific patient, you can check some condition here
      // For example:
      // if (doc.id === 'specific_patient_id') {
      //   patientMeeting = lastMeeting;
      // }
    }
  });
  return patMt;
};



// function TablesInfo(){

//   const users = [
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//     { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
//   ];
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Email</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <tr key={item.id}>
//             <td>{item.id}</td>
//             <td>{item.name}</td>
//             <td>{item.email}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }




const App = () => {

  const checkMeetingIDs = async () => {
    const patientsCollection = collection(firestore, 'patients');
    const snapshot = await getDocs(patientsCollection);
    snapshot.forEach((doc) => {
      const patientData = doc.data();
      const { meetingIDs } = patientData;
  
      if (meetingIDs && meetingIDs.length >= 2) {
        const lastMeeting = meetingIDs[meetingIDs.length - 1];
        patMt = lastMeeting;
      }
    });
    return patMt;
  };
  
  

// useEffect(() => {
//   if (id !== '' && id !== null) {
//     console.log("r=has RRRRRRRRRRRAN")
//     sendMessage("the meeting id is:" + id);
//   }
// }, []); 

  function AptDetails() {
    console.log("in det");
    console.log("is nurse" + nurseChosen);
    console.log("is pat" + patientChosen);
  
    return (
      <div>
      <p>Please fill out the fields below</p>
        {/* {!nurseChosen && !patientChosen && (
          <div>
          <p>Please fill out the fields below</p>
          </div>
        )} */}
      </div>
    );
  }
  
  useEffect(() => {
    async function fetchMeetingID() {
      const id = await checkMeetingIDs();
      setMeetingId(id);
    }
    fetchMeetingID();
  }, []);
  
  function JoinScreen({ getMeetingAndToken,status,idPar }) {
    const [meetingId, setMeetingId] = useState(""); // Set initial value of meetingId to idPar
    console.log("GGGGGGGGGGGGGGGGet "+idPar)
    console.log("LLLLLLLLLLLL "+tempID)

  useEffect(() => {
    async function fetchMeetingID() {
      const id = await checkMeetingIDs();
      console.log("GGGGGGGDDDDDDDDDDDDDDDGGGGGGGGGet "+id)

      setMeetingId(id);
    }
    fetchMeetingID();
  }, []);

    async function checkMeetingIDs() {
      if (!user.uid) {
        console.error("Patient ID is empty or undefined.");
        return;
      }
    
      // Ensure patientsCollection is correctly initialized
      if (!patientsCollection) {
        console.error("patientsCollection is not initialized.");
        return;
      }
    
      try {
        const patientDocRef = doc(patientsCollection, user.uid);
        const patientDocSnap = await getDoc(patientDocRef);
    
        if (patientDocSnap.exists()) {
          const patientData = patientDocSnap.data();
          if (patientData.meetingIDs && patientData.meetingIDs.length >= 2) {
            console.log("Worked");
            const lastMeeting = patientData.meetingIDs[patientData.meetingIDs.length - 1];
            setMeetingId(lastMeeting)
            patMt = lastMeeting; // Set the patient meeting variable
          } else {
            console.log("MeetingIDs array length is less than 2");
          }
        } else {
          console.log("Patient document not found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("MMMMMMMMMM"+patMt)
     
      return patMt;
  }

    // const isNurse = user.displayName=="Kalpana Mutyal"
    const onClick = async () => {
      console.log("running hereeedneswjlfcn")
      confirmedPatient = true;
      confirmedNurse = true;
      await getMeetingAndToken("jgvj-zsq9-9rp4");
    };

    return (
      <div>
        {!confirmedPatient && !status&& (
          <input
          type="text"
          placeholder= "Enter a code" // Use idPar as placeholder
          value={meetingId !== null ? meetingId : ''}
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
      )}
  
         {status && !confirmedNurse ? (
          <button style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={onClick}>Create Meeting</button>
        ) : (
          !confirmedPatient && (
          <button onClick={onClick}>Confirm</button>
          )
        )}
        {/* {" or "} */}
        {/* <button onClick={onClick}>Create Meeting</button> */}
      </div>
    );
  }
  
  

  function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);
  
    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);
  
    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
  
          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);
  
    return (
      <div key={props.participantId}>
        <p>
          Participant: Srikriti | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
          {micOn ? "ON" : "OFF"}
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn && (
          <div>
          <ReactPlayer
            //
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"200px"}
            width={"300px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
          <ReactPlayer
            //
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={"200px"}
            width={"300px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
          </div>
        )}
      </div>
    );
  }
  
  let id;


  function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div>
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
    );
  }
  
  function Controls1() {
    const [webcamOn, setWebcamOn] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const { leave, toggleMic, toggleWebcam } = useMeeting();
  
    const handleToggleWebcam = () => {
      toggleWebcam();
      setWebcamOn(prevWebcamOn => !prevWebcamOn);
    };

    const handleToggleMic = () => {
      toggleMic();
      setMicOn(prevMicOn => !prevMicOn);
    };
  
    return (
      <div>
        <button 
          style={{ 
            marginTop: '10px', 
            padding: '10px 20px', 
            borderRadius: '20px', 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '14px', 
            background:"#bbdefb", 
            fontFamily: 'Urbanist, sans-serif'
          }} 
          onClick={() => leave()}
        >
          Leave Meeting
        </button>
        
        <button 
          style={{ 
            marginTop: '10px', 
            padding: '10px 20px', 
            borderRadius: '30px', 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '20px', 
            background:"#fff",
            marginLeft:"10px",
            fontFamily: 'Urbanist, sans-serif'
          }} 
          onClick={handleToggleMic}
        >
          {micOn ? '🔇' : '🔊'}
        </button>
  
        <button 
          style={{ 
            marginTop: '10px', 
            padding: '10px 20px', 
            borderRadius: '30px', 
            fontFamily: 'Arial, sans-serif', 
            fontSize: '20px', 
            background:"#fff", 
            marginLeft:"10px",
            fontFamily: 'Urbanist, sans-serif'
          }} 
          onClick={handleToggleWebcam}
        >
          {webcamOn ? '📷' : '📸'}
        </button>
      </div>
    );
  }
  
  let patientName = "";
  let sendId = true;
  let tempID;
  let run = false;

  function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const [meetingId, setMeetingId] = useState(null);
    // if(!run){
    const { participants } = useMeeting({
      onMeetingJoined: () => {
          setJoined("JOINED");
      },
      onMeetingLeft: () => {
          props.onMeetingLeave();
       },
    });
    console.log(participants+"PAAAAAAAAAAAAAAA")
    const { join } = useMeeting();
    

    if(!isPatient){
      id = props.meetingID
    }
      
      
      console.log(tbPat+" THIS IS PATTTTTTTTT")
      patMsg();
      tempID = props.meetingID;
      run = true;

    // }
    console.log("ISSSSSDDDDDDDDDDDDDDD"+props.meetingId)
    
  
    
  
    //Get the method which will be used to join the meeting.
    //We will also get the participants list to display all participants
    // const { join, participants } = useMeeting({
  
      
      
    //   //callback for when meeting is joined successfully
    //   onMeetingJoined: () => {
    //     setJoined("JOINED");
    //   console.log("hiii")
  
  
    //   },
    //   //callback for when meeting is left
    //   onMeetingLeft: () => {
    //     props.onMeetingLeave();
    //   },
    // });
  
  
  
    const onClick = async () => {
      console.log("running hereeedneswjlfcn")
      await getMeetingAndToken("jgvj-zsq9-9rp4");
    };
   
    const getMeetingAndToken = async (id) => {

      console.log("going into the fet meetingg g g ")
      console.log("IDDDDDDDDDDD HELLO"+meetingID)

      const meetingId =
        id == null ? await createMeeting({ token: authToken }) : id;
      setMeetingId(meetingId);
      console.log("IDDDDDDDDDDD"+meetingID)
    };
  
    const joinMeeting = async () => {
      console.log(meetingID +" jrieofrwofhnj")
      await getMeetingAndToken(meetingId);
      console.log(meetingID +" wsjtedrytfyguhkli jrieofrwofhnj")
      console.log(props.meetingID+" el meeting iddddd")
      console.log("JJJJJJJJJJJJJJJJJJJJJJJ "+id)
      setJoined("JOINING");
      join();
  
    };
  
    // if(!run){
      console.log("ISSSSSDDDDDDDDDDDDDDD"+props.meetingId)
      id = props.meetingId
      sendId = true;
  
      run = true;
    // }
  
  
  
  
  
    return (
      
      <div className="container">
        <h3 style={{ fontFamily: 'Urbanist, sans-serif' }}>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "JOINED" ? (
          <div>
            <Controls1 />
            
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined == "JOINING" ? (
          <div>
          <p style={{fontFamily: 'Urbanist, sans-serif',color:"#003566"}}>Joining the meeting...</p>

            <Controls />
            
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : (
          confirmedPatient && (
          <div>
            <input
            style={{ fontFamily: 'Urbanist, sans-serif' }}


              type="text"
              width={"50px"}
              
              placeholder="Enter your name"
              onChange={(e) => {
                patientName = e.target.value; // Update the global variable
  
                // Handle name change here if needed
              }}

            />
            <div>
            <Controls />
            
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
            <button style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif',color:"#003566",marginLeft:"10px" }}onClick={joinMeeting}>Join</button>
          </div>
        )
      )}
      </div>
    );
  }
  
  
  
  
  
  
  
  
  // const fadeInProps = useSpring({
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  //   config: { duration: 1000 }
  // });
  
  const [user] = useAuthState(auth);
  const [meetingId, setMeetingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userDataStored, setUserDataStored] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNurse, setIsNurse] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  
  const [selectedOption, setSelectedOption] = useState('');
  const [nursesOptions, setNursesOptions] = useState([]);
  const [selectedOptionPat, setSelectedOptionPat] = useState('');
  const [patientOptions, setPatientOptions] = useState([]);
  const [nurseUpcomingPat, setNurseUpcomingPat] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientUID,setPatientUID] = useState('');
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);


  const [showAptDetails, setShowAptDetails] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentListNurse, setAppointmentListNurse] = useState([]);

  const [appointments, setAppointments] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [destName,setDestName] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [tableClicked, setTableClicked] = useState(null);    
    const [showMsgs, setShowMsgs] = useState(true);


    // Function to handle sending messages
    const [messages, setMessages] = useState([]);
    const [patientsList, setPatientsList] = useState([]);
    const [patientsRegList, setPatientsRegList] = useState([]);

    const [nursesList, setNursesList] = useState([]);
    const [assignedLabelVisible, setAssignedLabelVisible] = useState(false);
    const [errLabelVisible, setErrLabelVisible] = useState(false);
    const [prsnClicked, setPrsnClicked] = useState('');







    let tblPat;
    let tbPat = "O7mIU39quZaqeczO9rzFNkQtiSx1";
    let tbPatName;
  
    const scrollRef = useRef(null);


    const [nurseAptsData, setNurseAptsData] = useState([]);
    const [isOpenFirstModal, setIsOpenFirstModal] = useState(true); // State for the first modal

  // Function to toggle the second modal
  const toggleSecondModal = () => {
    setShowSecondModal(!showSecondModal);
  };

  

  const patMsg = async () => {
    const patientCollection = collection(firestore, 'patients');
    console.log(tbPat + " TABBBBcjewfnoewfnhuebouew");
    
    // Create a query to find the specific patient document with the UID 'tbPat'
    const q = query(patientCollection, where("uid", "==", tbPat));
    
    // Get the snapshot of patient documents that match the query
    const patientSnap = await getDocs(q);
    
    if (!patientSnap.empty&& id!=null) {
        const patientDocRef = patientSnap.docs[0].ref;
        try {
            // Update the 'meetingIDs' field of the patient document with the new ID
            if (!isPatient) {
              await updateDoc(patientDocRef, {
                  meetingIDs: arrayUnion(id)
              });
          }
            console.log(`Meeting ID '${id}' added to meetingIDs successfully for patient with UID '${tbPat}'.`);
        } catch (error) {
            console.error("Error adding meeting ID to meetingIDs:", error);
        }
    } else {
        console.error(`Patient document with UID '${tbPat}' not found.`);
    }

  }
  

  // Function to handle the click event of the "Call" button in the first modal
  const handleCallButtonClick = () => {
    toggleSecondModal(); // Toggle the second modal
  };

    useEffect(() => {
      // Simulate fetching data when component mounts
      // Replace this with your actual data fetching logic
      const fetchData = async () => {
        if(isNurse){
          const data = await fetchDataForNurseScreen(); // Example function to fetch data
          setNurseAptsData(data);
        }
          fetchDataForNurseScreen();
      fetchDataForNurseScreen();

      fetchDataForNurseScreen();

        // Fetch data from API or perform any initialization here
        
      };
    

  
      fetchData(); // Call the fetchData function when component mounts
    }, []); 

  useEffect(() => {
    // Scroll to the bottom when messages change or component mounts
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

    useEffect(() => {



      // Fetch patient data from Firebase Firestore
      const fetchPatients = async () => {
        console.log("f p")

        try {
         
          const patientCollection = collection(firestore, 'patients');
          const patientSnap = await getDocs(patientCollection);
          const patientsT = patientSnap.docs.map((doc) => doc.data());
          setPatientsList(patientsT); 
          console.log(patientsT,"dewficbeihu")
          console.log(patientsList,"f p")
          setPatientsRegList(patientsT.filter(patient => patient.email))


          const nurseCollection = collection(firestore, 'nurses');
          const nurseSnap = await getDocs(nurseCollection);
          const nursesT = nurseSnap.docs.map((doc) => doc.data());
          setNursesList(nursesT); 
          console.log(patientsT,"dewficbeihu")
          console.log(patientsList,"f p")
          

          
          fetchDataForNurseScreen();

          // Update state with fetched data
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
        getNurseAppointments();
        getPatientAppointments();
  
      };
  
      fetchPatients();
    }, []); // Run only once when component mounts

    useEffect(() => {
      getNurseAppointments();
      getPatientAppointments();

      
  console.log("Patients list updated:", patientsList);
    }, [patientsList]);
    
    useEffect(() => {
      getNurseAppointments();
      getPatientAppointments();

      console.log("Patients lishku.igbu/;i/t updated:", appointmentList);
      console.log("Patients lishku.igbu/;i/t updated NNN:", appointmentListNurse);

    }, []);
    

  // Function to handle sending messages
  const sendMessage = async (newMessage) => {
    try {
        console.log(prsnClicked+"KKKKKKKKKKKKKKKKKKKKKKK");
        const destName =prsnClicked;
        const messageData = {
            text: newMessage.trim(),
            sender: user.displayName,
            destination: destName,
            timestamp: new Date().getTime(),
        };
        id = null;
        console.log("DDDDDDDDDDDDDDDDDDDDDDD 1")

        // Update messages state with the new message
        setMessages(prevMessages => [...prevMessages, messageData]);
        console.log("DDDDDDDDDDDDDDDDDDDDDDD 2")

        // Add message to Firestore
        await addMessageToFirestore(messageData);
        console.log("DDDDDDDDDDDDDDDDDDDDDDD 3")

    } catch (error) {
        console.error('Error sending message:', error);
    }
};


  


  const fetchPatients = async () => {
    

    try {
      const patientCollection = collection(firestore, 'patients');
      const patientSnap = await getDocs(patientCollection);
      const patientsT = patientSnap.docs.map((doc) => doc.data());
      setPatientsList(patientsT); 
      console.log(patientsList,"f p")
      
      // Update state with fetched data
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const openModal = () => {
    fetchPatients();
    setIsOpen(true);
  };

  const closeModal = () => {
    setTableClicked(false);
    setShowMsgs(true);
    setIsOpen(false);
  };
  const addMessageToFirestore = async (messageData) => {
    try {
      const messagesCollection = collection(firestore, 'messages');
      await addDoc(messagesCollection, messageData);
      
      console.log('Message added to Firestore collection');
    } catch (error) {
      console.error('Error adding message to Firestore:', error);
    }
    
  };

  
// const createMeeting2 = async ({ token }) => {
//   console.log("helllllllllllllllllllllllllllllllllllllllllllo")

//   const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
//     method: "POST",
//     headers: {
//       authorization: `${authToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   });
//   //Destructuring the roomId from the response
//   const { roomId } = await res.json();
//   console.log("EEEEEEEEEEEEEL id here "+roomId)


//   return roomId;
// };

//Getting the meeting id by calling the api we just wrote
const getMeetingAndToken = async (id) => {
  id = null;
  console.log("going inside the tokkkkkkkkkkkkkkkkk")
  const meetingId =
    id == null ? await createMeeting({ token: authToken }) : id;
  console.log("geeting id in funcccccc"+meetingId)
  setMeetingId(meetingId);
};




const TableView = ({ data, nurseChosen, patientChosen }) => {
  const [aptsPatTemp, setAptsPatTemp] = useState([]);
  const [aptsNurTemp, setAptsNurTemp] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        await getApts();
        console.log("pattttfsvtx")
        console.log(aptsPat);
        setAptsPatTemp(aptsPat);
        setAptsNurTemp(aptsNur);
        console.log("aptss: ",aptsPat) // Ensure aptsPat is populated after fetching
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchData();
  }, []); //
   
  console.log("xnsjalconeo"+aptsPat)

  return (
    <div>
      {!nurseChosen && !patientChosen && (
        <div>
          <p style={{ fontFamily: 'Urbanist, sans-serif' }}>Please fill out the fields below</p>
        </div>
      )}
      {nurseChosen && !patientChosen && (
        <div>
          <caption style={{ fontFamily: 'Urbanist, sans-serif' }}>Nurse's Appointments</caption>
          <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #fff' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Date</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Title</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>Patient assigned</th>
                </tr>
              </thead>
              <tbody>
                {aptsNurTemp.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #fff' }}>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.date}</td>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.name}</td>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>{item.patient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!nurseChosen && patientChosen && (
        <div>
          <caption style={{ fontFamily: 'Urbanist, sans-serif' }}>Patient's Appointments</caption>
          <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #fff' }}>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Date</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Title</th>
                  <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>Nurse assigned</th>
                </tr>
              </thead>
              <tbody>
                {aptsPatTemp.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #fff' }}>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.date}</td>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.name}</td>
                    <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>{item.nurse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {nurseChosen && patientChosen && (
        <div>
          <div>
            <caption style={{ fontFamily: 'Urbanist, sans-serif' }}>Nurse Table</caption>
            <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #fff' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #fff' }}>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Date</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Title</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>Patient assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {aptsNurTemp.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #fff' }}>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.name}</td>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>{item.patient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <caption style={{ fontFamily: 'Urbanist, sans-serif' }}>Patient Table</caption>
            <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #fff' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #fff' }}>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Date</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>Title</th>
                    <th style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>Nurse assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {aptsPatTemp.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #fff' }}>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.date}</td>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif', borderRight: '1px solid #fff' }}>{item.name}</td>
                      <td style={{ padding: '8px', textAlign: 'left', fontFamily: 'Urbanist, sans-serif' }}>{item.nurse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  

};




// Function to update message display
const listenToMessages = () => {
  const messagesCollection = collection(firestore, 'messages');
  const messagesQuery = query(
    messagesCollection,
    orderBy('timestamp', 'asc') // Sort messages by timestamp in ascending order
  );

  // Subscribe to real-time updates from Firestore
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      const message = doc.data();
      // Add a flag to indicate if the message is from the current user
      message.isCurrentUser = message.destination === user.displayName;
      messages.push(message);
    });
    // Update the state with the sorted and formatted messages
    setMessages(messages);
  });
  run = true;
  id = null

  // Return the unsubscribe function to clean up the listener when the component unmounts
  return unsubscribe;
};



//This will set Meeting Id to null when meeting is left or ended
const onMeetingLeave = () => {
  setMeetingId(null);
};


  useEffect(() => {
    const storeUserToDatabase = async () => {
      
      if (user && !userDataStored) {
        const isAdminUser = user.email === 'mutyalasrikriti2006@gmail.com';
        setIsAdmin(isAdminUser);
        const isNurseUser = user.email === 'kmutyala5@gmail.com';

        setIsNurse(isNurseUser);
        if (isAdminUser) {
          const usersCollection = doc(firestore, 'users', user.uid);
          const userSnapshot = await getDoc(usersCollection);

          if (!userSnapshot.exists()) {
            await setDoc(usersCollection, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          }
        } else if(isNurse) {
          const isNurseUser = user.email === 'kmutyala5@gmail.com';
          setIsNurse(isNurseUser);

          const usersCollection = isNurseUser ? doc(firestore, 'nurses', user.uid) : doc(firestore, 'patients', user.uid);
          const userSnapshot = await getDoc(usersCollection);

          if (!userSnapshot.exists()) {
            await setDoc(usersCollection, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          }
        }
        else{
          console.log("runnnung hereeee")
          const isPatientUser = user.email === 'kyrasrikriti@gmail.com';
          console.log(isPatientUser)
          setIsPatient(isPatientUser);

          const usersCollection = isPatientUser ? doc(firestore, 'nurses', user.uid) : doc(firestore, 'patients', user.uid);
          const userSnapshot = await getDoc(usersCollection);

          if (!userSnapshot.exists()) {
            await setDoc(usersCollection, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          }
        }

        setUserDataStored(true);
      }
    };

    const fetchNursesOptions = async () => {
      try {
        const nursesCollection = collection(firestore, 'nurses');
        const nursesSnapshot = await getDocs(nursesCollection);
        const options = nursesSnapshot.docs.map((doc) => doc.data().displayName);
        setNursesOptions(options);

      } catch (error) {
        console.error('Error fetching nurses options:', error);
      }
    };

    const fetchPatientOptions = async () => {
      try {
        const patientCollection = collection(firestore, 'patients');
        const patientSnapshot = await getDocs(patientCollection);
        const options = patientSnapshot.docs.map((doc) => doc.data().displayName);
        setPatientOptions(options);
      } catch (error) {
        console.error('Error fetching patient options:', error);
      }
    };

    storeUserToDatabase();
    fetchNursesOptions();
    fetchPatientOptions();
  }, [user, userDataStored]);

  // Define patientUID as a global variable
let patientUID1= '';

const declinePat = async (patientName) => {
  const nurseID = user.uid;
  
  
  try {
    setShowDatePicker(false);
    console.log("WORKKKK" + patientName);

    // Create a query to filter patients by display name
    const patientsCollection = collection(firestore, 'patients');
    const q = query(patientsCollection, where('displayName', '==', patientName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming there is only one patient with the given name
      const selectedPatient = querySnapshot.docs[0].data();
      const selectedPatientName = selectedPatient.displayName;

      // Now you can use selectedPatientName as needed
      console.log('Selected Patient Name:', patientName);

      const nurseDocRef = doc(firestore, 'nurses', nurseID);
      const nurseSnapshot = await getDoc(nurseDocRef);
  
      if (nurseSnapshot.exists()) {
        const nurseData = nurseSnapshot.data();

        // Construct the updated array by removing the selected patient name
        const updatedPatients = nurseData.upcominPatients.filter(name => name !== selectedPatientName);

        // Update the nurse document with the updated array
        await updateDoc(nurseDocRef, {
          upcominPatients: updatedPatients
        });
        setShowDatePicker(false);
       

        console.log("Patient removed successfully from the nurse's upcoming patients list.");
      } else {
        console.log("Nurse document does not exist.");
      }
    } else {
      console.log("No patient found with the given name.");
    }
  } catch (error) {
    console.error("Error declining patient:", error);
  }
  setShowDatePicker(false);
  
  fetchDataForNurseScreen();
  fetchDataForNurseScreen();

  fetchDataForNurseScreen();

  fetchDataForNurseScreen();

  fetchDataForNurseScreen();
  setIsAdmin(false)
  setIsPatient(false)
  setIsNurse(false)

  window.location.reload();
  setIsAdmin(false)
  setIsPatient(false)
  setIsNurse(false)


};




const addPatientAppointment = async ({ date, startTime, endTime, title }) => {
  setShowDatePicker(false)
 
  // Nurse id
  const nurseID = user.uid;


  
  
  try {
      // Create a query to filter patients by display name
      const patientsCollection = collection(firestore, 'patients');
      const q = query(patientsCollection, where('displayName', '==', selectedPatient));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
          // Assuming there is only one patient with the given name
          const selectedPatient = querySnapshot.docs[0].data();
          const selectedPatientUID = selectedPatient.uid;
          const selectedPatientName = selectedPatient.displayName;

          // Now you can use selectedPatientUID as needed
          console.log('Patient UUID:', selectedPatientUID);
          patientUID1 = selectedPatientUID;
          const nurseDocRef = doc(firestore, 'nurses', nurseID);
          await updateDoc(nurseDocRef, {
              upcominPatients: arrayRemove(selectedPatientName)
          });
          fetchDataForNurseScreen();
          // Add any logic you want to execute when the "Create Event" button is clicked
          console.log('Create Event button clicked!');
          console.log('Event Date:', date);
          console.log('Event Start Time:', startTime);
          console.log('Event End Time:', endTime);
          console.log('Event Title:', title);

          // Create a new document in the 'appointments' collection
          const appointmentsCollection = collection(firestore, 'appointments');
          await setDoc(doc(appointmentsCollection), {
              nurseID: nurseID,
              nurseName: user.displayName,
              patientUID: selectedPatientUID,
              patientName: selectedPatientName,
              date: date,
              startTime: startTime,
              endTime: endTime,
              title: title
          });

          console.log('Appointment added to the database.');
      } else {
          console.error('No patient found with the selected name.');
          // Handle the case where no patient is found with the selected name
      }
  } catch (error) {
      console.error('Error fetching patient UID:', error);
      // Handle the error
  }
  window.location.reload(); 
};

const handleCreateRoom = async () => {
  try {
    // Call the createRoom function imported from videoSDK.js
    await createRoom();
  } catch (error) {
    console.error('Error creating room:', error);
  }
};
// Log patientUID wherever needed

  

  const fetchDataForNurseScreen = async () => {
    try {
      console.log("workcndjkvbkeekfdibvsduv")
      const nurseCol = collection(firestore, 'nurses');
      const nurseSS = await getDocs(nurseCol);
      const patientUIDs = nurseSS.docs.flatMap(doc => doc.data().upcominPatients);
      console.log("workcndjkvbkeekfdibvsduvm     2222")
      console.log(patientUIDs)
      setNurseUpcomingPat(patientUIDs);

      patientUIDs.shift();
      console.log(patientUIDs+"lol")

      // Fetch patients' names based on their UIDs
      const patientsPromises = patientUIDs.map(async (patientUID) => {
        const patientDocRef = doc(firestore, 'patients', patientUID);
        const patientDocSnapshot = await getDoc(patientDocRef);
        console.log("workcndjkvbkeekfdibvsduv    333333")

        if (patientDocSnapshot.exists()) {
          return patientDocSnapshot.data().displayName;
        } else {
          console.error(`Patient with UID ${patientUID} not found.`);
          return null;
        }
        console.log("workcndjkvbkeekfdibvsduv    4")
        

      });
  
      const patientsNames = await Promise.all(patientsPromises);
      console.log(nurseUpcomingPat," tid one")
    } catch (error) {
      console.error('Error fetching nurses options:', error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.reload();  // Reloads the page after sign-in
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  




  const assign = async () => {
    setShowDatePicker(false)

    try {
      if (selectedOption && selectedOptionPat) {
        const nurseDocRef = doc(firestore, 'nurses', "fQp5CUfbGsdjuDLOEBWdb4Kumon1");
        const nurseDocSnapshot = await getDoc(nurseDocRef);

        await updateDoc(nurseDocRef, {
          upcominPatients: arrayUnion(selectedOptionPat),
        });
        fetchDataForNurseScreen();
    fetchDataForNurseScreen();
    setAssignedLabelVisible(true);
    setErrLabelVisible(false);

    fetchDataForNurseScreen();
    fetchDataForNurseScreen();
    fetchDataForNurseScreen();
    fetchDataForNurseScreen();
    fetchDataForNurseScreen();


        console.log(`Assigned patient ${selectedOptionPat} to nurse ${selectedOption}`);
      } else {
        setAssignedLabelVisible(false);
    setErrLabelVisible(true);
        console.error('Please select both nurse and patient before assigning.');
      }
    } catch (error) {
      console.error('Error assigning patient:', error);
    }
    
    
  };

  const signOut = () => {
    if (isPatient){
    setUserDataStored(false);

    }
    setIsAdmin(false);
    setIsNurse(false);
    setIsPatient(false);
    auth.signOut();
    
  };

  const handleDropdownChange = (event) => {
    nurseChosen = true
    console.log("hse3xnhicb")
    setSelectedOption(event.target.value);
  };

  const getSchedule = async () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(today.getDate()).padStart(2, '0');
    
      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`;
  
      // Query appointments collection to get documents where nurseID is user.uid and date is formattedDate
      const appointmentsCollection = collection(firestore, 'appointments');
      const q = query(appointmentsCollection, where('nurseID', '==', user.uid), where('date', '==', formattedDate));
      const querySnapshot = await getDocs(q);
      
      // Initialize an array to store documents
      const appointmentsArray = [];
  
      // Loop through query snapshot and push documents to the array
      querySnapshot.forEach((doc) => {
        appointmentsArray.push(doc.data());
      });
      appointmentsArray.sort((a, b) => {
        const startTimeA = new Date(`${formattedDate} ${a.startTime}`);
        const startTimeB = new Date(`${formattedDate} ${b.startTime}`);
        return startTimeA - startTimeB;
      });
      let formattedList = [];

      // Loop through appointmentsArray and format each appointment
      appointmentsArray.forEach(appointment => {
        const formattedAppointment = `${appointment.title} - ${appointment.startTime} to ${appointment.endTime}`;
        formattedList.push(formattedAppointment);
      });
  
      // Update the state variable with the formatted list
      setAppointmentList(formattedList);
  
      console.log('Appointments for today:', appointmentsArray);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
    
  };

  
  

  const handleDropdownChangePat = async (event) => {
    setSelectedOptionPat(event.target.value);
    patientChosen = true
    const selectedPatientName = event.target.value;

    try {
      const patientsCollection = collection(firestore, 'patients');
      const q = query(patientsCollection, where('displayName', '==', selectedPatientName));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Assuming there is only one patient with the given name
        const selectedPatient = querySnapshot.docs[0].data();
        const selectedPatientUID = selectedPatient.uid;
  
        // Now you can use selectedPatientUID as needed
        // setSelectedOptionPat(selectedPatientUID);
      } else {
        console.error('No patient found with the selected name.');
        // Handle the case where no patient is found with the selected name
      }
    } catch (error) {
      console.error('Error fetching patient UID:', error);
      // Handle the error
    }
  };

  const getPatientAppointments = async () => {
    try {
      // Initialize an empty array to store appointment objects
      const appointments = [];
  
      // Query the appointments collection where patientUID is equal to the current user's UID
      const appointmentsCollection = collection(firestore, 'appointments');
      const q = query(appointmentsCollection, where('patientUID', '==', user.uid));
      const querySnapshot = await getDocs(q);

  
      // Iterate over the query snapshot to extract appointment data
      querySnapshot.forEach((doc) => {
        const appointmentData = doc.data();
  
        // Format the appointment object
        const appointment = {
          date: appointmentData.date,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          title: appointmentData.title +" with nurse "+appointmentData.nurseName
        };
  
        // Add the appointment object to the appointments array
        appointments.push(appointment);
      });
  
      // Update the state variable with the formatted list of appointments
      setAppointmentList(appointments);
  
      console.log('Appointments for the current user:', appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };


  const getNurseAppointments = async () => {
    try {
      console.log("newifcbewi")
      // Initialize an empty array to store appointment objects
      const appointments = [];
  
      // Query the appointments collection where patientUID is equal to the current user's UID
      const appointmentsCollection = collection(firestore, 'appointments');
      const q = query(appointmentsCollection, where('nurseID', '==', user.uid));
      const querySnapshot = await getDocs(q);
  
      // Iterate over the query snapshot to extract appointment data
      querySnapshot.forEach((doc) => {
        const appointmentData = doc.data();
  
        // Format the appointment object
        const appointment = {
          date: appointmentData.date,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          title: appointmentData.title +" with patient "+appointmentData.patientName
        };
  
        // Add the appointment object to the appointments array
        appointments.push(appointment);
      });
  
      // Update the state variable with the formatted list of appointments
      setAppointmentListNurse(appointments);
  
      console.log('Appointments for the current user:', appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  let aptsPat = [
    
  ];
  
  let aptsNur = [
    
  ];

  const getApts = async () => {
    // let aptsPat = []; // Declare aptsPat as an array using let
    
    try {
      // Check if a patient name is selected
      if (!patientChosen) {
        console.error('Please select a patient name.');
        return; // Exit the function if no patient name is selected
      }
      console.log("hekknrejvnrelo");
  
      const appointmentsCollection = collection(firestore, 'appointments');
      const appointmentsSnapshot = await getDocs(appointmentsCollection);
      console.log("hekknrejvnrelo    2222");
      console.log("appt col " + appointmentsCollection);
  
      console.log("appt snapshot " + selectedOptionPat);
  
      // Iterate over each appointment document
      appointmentsSnapshot.forEach((doc) => {
        const appointmentData = doc.data();
        console.log(appointmentData + " datatatta");
        console.log(selectedOptionPat + " pat");
  
        // Check if the appointment is for the selected patient
        if (appointmentData.patientName === selectedOptionPat) {
          console.log("insidee");
          // Format the appointment object
          const formattedAppointment = {
            // Use the document ID as the appointment ID
            name: appointmentData.title, // Use the appointment title as the name
            date: appointmentData.date, // Use the appointment date
            nurse: appointmentData.nurseName // Use the nurse name from the appointment data
          };
          
  
          // Push the formatted appointment to the array
          aptsPat.push(formattedAppointment);
          console.log(aptsPat);
        }
        if (appointmentData.nurseName === selectedOption) {
          console.log("insidee");
          // Format the appointment object
          const formattedAppointment = {
            // Use the document ID as the appointment ID
            name: appointmentData.title, // Use the appointment title as the name
            date: appointmentData.date, // Use the appointment date
            patient: appointmentData.patientName // Use the nurse name from the appointment data
          };
          
  
          // Push the formatted appointment to the array
          aptsNur.push(formattedAppointment);
          console.log(aptsPat);
        }
        
        console.log(aptsPat);
  
      });
      console.log(aptsPat);

      // // Set the formatted appointment data to the state
      // setAppointments(appointmentsArray);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const loadMessages = ()=> {

  }

  const Login = () => {
    return (
      <div className="login-container">
        <div className="login-form">
        <img src="/images/logo.png" alt="Login Image" style={{width: "200px", height: "auto",marginTop:"-90px"}} />
  
          {/* Add your login form content here */}
         
          <div className="login-button">
            <button onClick={signIn} style={{marginTop:"30px",fontFamily: 'Lilita One, sans-serif', color:"#003566"}}>Continue with Google</button>
          </div>
  
          {/* Add your login form inputs, buttons, etc. */}
        </div>
        <div className="login-image">
          {/* Add your image here */}
          <img src="/images/loginImg.jpg" alt="Login Image" style={{width: "450px", height: "auto"}} />
  
        </div>
      </div>
    );
  };
  
  
  const handleTableClick = (patient) => {
    console.log("clicYYYYYYYYkeddd"+patient)
    // tbPat = patient.uid;
    console.log("clicYYYYYYYYkeddd "+tbPat)
    tbPatName = patient.displayName
    setPrsnClicked(patient.displayName)
    const isPatientInArray = patientsRegList.some(pat => pat.uid === patient.uid);
    setShowMsgs(isPatientInArray);
    
    setTableClicked(patient);
    const unsubscribe = listenToMessages();
    tbPat = patient.uid;
   
  return () => {
    unsubscribe(); // Clean up the listener when the component unmounts
  };
    // Handle any action you want to perform when a patient row is clicked
  };

  const handleBackClick = () => {
    setTableClicked(null);
  };


const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
   
      <div>
      <img 
        src="./images/home.png" 
        alt="Open Menu" 
        onClick={toggleMenu} 
        className="open-menu-btn" 
        
      />
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>

      <nav>
          <ul>
            <li style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }} onClick={toggleMenu}><a href="#home">Home</a></li>
           
            <li style={{ fontFamily: 'Lilita One, sans-serif', color:"#fff",fontSize: '30px' }} onClick={toggleMenu}><a href="#about-us">About Us</a></li>
            <li style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }} onClick={toggleMenu}><a href="#services">Services</a></li>
            <li style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }} onClick={toggleMenu}><a href="#contact">Contact</a></li>
            <li style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }} onClick={toggleMenu}><a href="#login">Login</a></li>
          </ul>
          </nav>
        {/* <button onClick={toggleMenu} className="close-menu-btn">Close</button> */}
        
      </div>
      
      <div id="home" className="section">
        <HomeScreen />
      </div>
    
      <div id="about-us" className="section">
        <AboutUS />
      </div>
      <div id="services" className="section">
        <OurServices />
      </div>
      <div id="contact" className="section">
      <Contact/>
        {/* Contact component or content goes here */}
      </div>
      <div id="login" className="section">
        <Login />
      </div>
    </div>
  );
};





  const DisplayNurseAptsCard = ({ data }) => {
    return (
      <div className="flex overflow-x-auto">
        {data.map((item, index) => (
          <div key={index} className="w-64 bg-white rounded-lg shadow-md mr-4">
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item}</h2>
              {/* Additional content for your card */}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const screenStyle = {
    backgroundColor: '#cfe3ff', // Light blue background color
    minHeight: '100vh', // Ensure the container covers the entire viewport height
    padding: '20px', // Add padding as needed
    // Add more styles as needed
  };


  
  const handlePatientClick = (patient) => {
    setShowDatePicker(true);

    setSelectedPatient(patient);
  };

  const handleViewMoreClick = () => {
    setShowAptDetails(true);
  };

  const callerBtn = () => {
    console.log("TBB CALLLLLER"+tbPat)
    setShowSecondModal(true);
  };
  

  

  // return authToken && meetingId ? (
  //   <MeetingProvider
  //     config={{
  //       meetingId,
  //       micEnabled: true,
  //       webcamEnabled: true,
  //       name: "Srikriti",
  //     }}
  //     token={authToken}
  //   >
  //     <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
  //   </MeetingProvider>
  // ) : (er
  //   <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  // );
  
  return (
    <div>

      {!user && !isAdmin && !isNurse && (
        <div>
        
          <SideMenu/>
          {/* <Button onClick={signIn}>Sign In erefefewith Google</Button> */}
        </div>
      )}
   
    {/* <animated.div style={fadeInProps}>
      <div>
        <h1>Welcome to My Scheduling App</h1>
        <p>This is some description text that will fade in</p>
      </div>
    </animated.div> */}
    {/* <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Srikriti",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>

    <JoinScreen getMeetingAndToken={getMeetingAndToken} /> */}
  
      {/* <button onClick={handleCreateRoom}>Create Room</button> */}
      
  
      {/* Add your image with appropriate src and alt attributes */}
      {/* <img src="/images/backdrop3.jpg" alt="Title Image" />
      <img src="/images/backdrop3.jpg" alt="Title Image" />
   <HomeScreen/>
      <h1>My Scheduling App</h1>
      <Login /> */}
      {user ? (
        
        

        <div>
      
          {isAdmin ? (
            
            <div style={screenStyle}>
  <h1 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '40px' }}>Welcome, Admin {user.displayName || user.email}!</h1>
  <div>
    {/* {getApts()} */}
    {/* Render the AptDetails component only if showAptDetails is true */}
    {showAptDetails && <TableView data={aptsPat} nurseChosen={nurseChosen} patientChosen={patientChosen}/>} 
  </div>
  <div style={{ display: 'flex' }}>
    <select style={{ borderRadius: '0.375rem', border: '1px solid #d2d6dc', padding: '0.5rem', marginRight: '10px' }} value={selectedOption} onChange={handleDropdownChange}>
      <option style={{ fontFamily: 'Urbanist, sans-serif' }} value="" >Select a nurse</option>
      {nursesOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    <select style={{ borderRadius: '0.375rem', border: '1px solid #d2d6dc', padding: '0.5rem', marginRight: '10px' }} value={selectedOptionPat} onChange={handleDropdownChangePat}>
      <option value="">Select a patient</option>
      {patientOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  <div style={{ display: 'flex', marginTop: '10px' }}>
  <button onClick={handleViewMoreClick} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif',color:"#003566" }}>View more</button>
  <Button variant="gradient" onClick={assign} style={{ padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif',color:"#003566"  }}>Assign</Button>
</div>
{assignedLabelVisible && !errLabelVisible && (
  <p style={{fontFamily: 'Urbanist, sans-serif',color:"#003566"}} >✔️Patient {selectedOptionPat} was successfully assigned to Nurse {selectedOption}</p>
)}
{!assignedLabelVisible && errLabelVisible && (
  <p style={{fontFamily: 'Urbanist, sans-serif',color:"#003566"}} >❌Please complete all fields before assigning. Thank you!</p>
)}

<div>
  <button onClick={signOut} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}}>Sign Out</button>
</div>
</div>



          ) : (
            <div>
           
            
              {isNurse && (
                <div style={screenStyle}>
                <div className="flex">
                
                  <h1 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '40px' }}>Welcome back {user.displayName}!</h1>
                  {/* <button onClick={fetchDataForNurseScreen}>Fetch Data</button> */}
                  <div>
                  {/* <button onClick={getNurseAppointments}>Fetch Appointments</button> */}
                  <div>
                  <div >
      
                  <div className="overflow-x-auto border rounded-md p-4 flex">

      </div>
    </div>
                  </div>
                  </div>
                  
                  
                  
    
      <button onClick={openModal} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}}>Communicate</button>
      <div style={{ display: 'flex', position: 'relative', zIndex: 1100 }}>
      {/* First Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false} 
        contentLabel="Patient Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '30%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '200px', // Add margin between the two modals
            transform: 'translate(-50%, -50%)',
            borderRadius: '5px',
            padding: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: '30%', // Adjust width as needed
            maxHeight: '80vh',
            zIndex: 1050, // Ensure a higher z-index than the second modal
          },
        }}
      >

{showMsgs ? (
  <>
        {/* Modal Content */}
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={closeModal}>❌</button>
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif', marginLeft:"10px"}} onClick={callerBtn}>📞</button>
        {tableClicked ? (
          <div>
            <div style={{ height: '200px', overflowY: 'scroll', marginBottom: '20px' }} ref={scrollRef}>
              <div style={{ flex: 3 }}></div>
              {showMsgs&&messages.map((message, index) => (
                <div key={index} style={{ color: message.isCurrentUser ? 'red' : 'black' }}>
                  {message.text}
                </div>
              ))}
              <ChatBox messages={messages} onSendMessage={sendMessage} />

              {/* ChatBox component */}
            </div>
            <button onClick={handleBackClick}>Back</button>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }}>Patients</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
               
              </thead>
              <tbody>
                {patientsList.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => handleTableClick(patient)}
                    style={{ cursor: 'pointer', borderBottom: '1px solid #ddd' }}
                  >
                    <td style={{ fontFamily: 'Urbanist, sans-serif' }}>{patient.displayName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </>
      ) : (
        <div>
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={closeModal}>❌</button>

        <p  style={{ fontFamily: 'Urbanist, sans-serif' }}>Email isn't registered.</p>
        </div>
        
  )}
      </Modal>

      {/* Second Modal */}
      {showSecondModal && (
        
        <Modal
        
          isOpen={showSecondModal}
          shouldCloseOnOverlayClick={true} 
          onRequestClose={() => setShowSecondModal(false)}
          contentLabel=""
          style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // semi-transparent overlay
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: 'auto',
      right: '5%',
      bottom: 'auto',
      marginRight: '0',
      transform: 'translate(0, -50%)',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
      width: '30%', // Adjust width as needed
      maxHeight: '80vh',
    },
  }}
        >
          <h2 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }}></h2>

          <MeetingProvider
  config={{
    meetingId,
    micEnabled: true,
    webcamEnabled: true,
    name: "Srikriti",
  }}
  token={authToken}

>
  <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />



</MeetingProvider>





<JoinScreen getMeetingAndToken={getMeetingAndToken} status={true} />



{/* Check if 'id' is not an empty string, then call sendMessage */}

{/* Add content for the second modal */}
</Modal>
      )}
    </div>
    



       





    
    </div>
    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
  {nurseUpcomingPat.map((item, index) => (
    <li
      key={index}
      onClick={() => handlePatientClick(item)}
      style={{
        width: 'calc(50% - 10px)', // Set width to half of the container width minus margin
        maxWidth: '200px', // Limit maximum width of each box
        marginRight: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        border: '2px solid #003566',
        fontFamily: 'Urbanist, sans-serif',
        borderRadius: '8px',
        padding: '10px',
        boxSizing: 'border-box', // Include padding and border in the width calculation
      }}
    >
      <div>{item}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }} >
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={() => handlePatientClick(item)}>✔️</button>
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={() =>declinePat(item)}>❌</button>
      </div>
      
    </li>
    
  ))}
  
</ul>
<div>
{showDatePicker && <label style={{ fontFamily: 'Urbanist, sans-serif' }}>Choose a date on the calendar</label>}
</div>







                  
                  <CalendarComp
                    nurseUpcomingPat={nurseUpcomingPat}
                    selectedPatient={selectedPatient}
                    appointments={appointmentListNurse}

                    onCreateE={ showDatePicker? (eventDetails) => addPatientAppointment(eventDetails) : undefined}
                  />
                   <div>
                       <button onClick={signOut} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}}>Sign Out</button>

   <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      {/* Pass the sendMessage function as the onSendshowMessage prop */}
      {/* <ChatBox messages={messages} onSendMessage={sendMessage} /> */}
      {/* {messages.map((message, index) => (
      <div key={index} style={{ color: message.isCurrentUser ? 'red' : 'black' }}>
        {message.text}
      </div>
    ))} */}
    </div>

    <div style={{ flex: 1 }}>
    {/* <button onClick={startMeeting}>Start a meeting</button> */}
    {/* <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Srikriti",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>

    <JoinScreen getMeetingAndToken={getMeetingAndToken} status={true} /> */}
    </div>
    </div>
    
  
      {/* <button onClick={handleCreateRoom}>Create Room</button> */}
  </div>
                  {/* <button onClick={getSchedule}>Schedule</button> */}
                  <ul>
                  {appointmentList.map((appointment, index) => (
                  <li key={index}>{appointment}</li>
                  ))}
                </ul>
                <div style={{ flex: 1 }}>
          {/* Render the chatbox component */}
          </div>
                </div>
              )}
            {/* </div> */}
            </div>
          )}
          
         
          {isPatient && (
            
  <div style={screenStyle}>
  <h1 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '40px' }}>Welcome back {user.displayName}!</h1>
  <button  style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif',color:"#003566" }} onClick={openModal}>Communicate</button>

          {/* <button onClick={callerBtn}>Call</button>

    <button onClick={getPatientAppointments}>Fetch Appointments</button> */}
    <CalendarCompPatient appointments={appointmentList} />

    <div style={{ flex: 1 }}>
      {/* Pass the sendMessage function as the onSendMessage prop */}
      
        {/* {messages.map((message, index) => (
      <div key={index} style={{ color: message.isCurrentUser ? 'red' : 'black' }}>
        {message.text}
      </div>
    ))} */}
    <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
    {/* <ChatBox messages={messages} onSendMessage={sendMessage} /> */}
    </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Patient Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginLeft: '-20%',
            
            transform: 'translate(-50%, -50%)',
            borderRadius: '5px',
            padding: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            width: '30%', // Adjust width as needed
  maxHeight: '80vh',
          },
        }}
      >
          <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}} onClick={closeModal}>❌</button>
        <button style={{ marginTop: '10px', padding: '10px 10px', borderRadius: '30px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif', marginLeft:"10px"}} onClick={callerBtn}>📞</button>
        {tableClicked ? (
          <div>
            {/* <h2>Chat with {selectedPatient}</h2> */}
            <div style={{ height: '200px', overflowY: 'scroll', marginBottom: '50px' }} ref={scrollRef}>
            <div style={{ flex: 3 }}></div>
            
            {messages.map((message, index) => (
            <div key={index} style={{ color: message.isCurrentUser ? 'blue' : 'black' }}>
              {message.text}
              </div>
            ))}
            <ChatBox messages={messages} onSendMessage={sendMessage} />

            {/* <input type="text" placeholder="Type your message..." />
            <button>Send</button> */}
            {/* <button onClick={handleBackClick}>Back</button> */}
            
   

            
              {/* Placeholder for chat messages */}
              {/* You would render chat messages here */}
            </div>
           
          </div>
        ) : (
          <div>
          <h2 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '30px' }}>Nurses</h2>

            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                 
                </tr>
              </thead>
              <tbody>
                {nursesList.map((nurse) => (
                  <tr
                    key={nurse.id}
                    onClick={() => handleTableClick(nurse)}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <td>{nurse.displayName}</td>
                    <td>{/* Add age here */}</td>
                    <td>{/* Add gender here */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        )}
        {showSecondModal && (
        
        <Modal
        
          isOpen={showSecondModal}
          shouldCloseOnOverlayClick={true} 
          onRequestClose={() => setShowSecondModal(false)}
          contentLabel=""
          style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // semi-transparent overlay
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: 'auto',
      right: '5%',
      bottom: 'auto',
      marginRight: '0',
      transform: 'translate(0, -50%)',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
      width: '30%', // Adjust width as needed
      maxHeight: '80vh',
    },
  }}
        >
          <h2 style={{ fontFamily: 'Lilita One, sans-serif', color:"#003566",fontSize: '40px' }}>Calling</h2>

        





          <div style={{ flex: 1 }}>
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: patientName,
      }}
      token={authToken}
    >
      <MeetingView meetingId={patMt} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>

    <JoinScreen getMeetingAndToken={getMeetingAndToken} status={false} idPar={id} />
    </div>



{/* Check if 'id' is not an empty string, then call sendMessage */}

{/* Add content for the second modal */}
</Modal>
      )}
      </Modal>

      
    
    <div style={{ flex: 1 }}>
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: patientName,
      }}
      token={authToken}
    >
      {/* <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} /> */}
    </MeetingProvider>

    {/* <JoinScreen getMeetingAndToken={getMeetingAndToken} status={false} idPar={id} /> */}
    </div>
    </div>
    <button onClick={signOut} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '20px', fontFamily: 'Arial, sans-serif', fontSize: '14px', background:"#bbdefb",fontFamily: 'Urbanist, sans-serif'}}>Sign Out</button>

    </div>
  
      {/* <button onClick={handleCreateRoom}>Create Room</button> */}
  </div>
)}

          
          
         

          
          
          </div>
      ) : (
        <div>
            
              
            </div>
        
      )}
      
      {/* <button onClick={signIn}>Sign In erefefewith Google</button> */}

      
    </div>
    
  );
}
  
export default App;