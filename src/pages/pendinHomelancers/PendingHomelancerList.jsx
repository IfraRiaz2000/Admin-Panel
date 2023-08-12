import React, { useState, useEffect } from "react";
import Tesseract, { createWorker } from 'tesseract.js';
import "./PendingHomelancerList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import IdCard from "../../assets/Idd4.jpg";
import CancelIcon from "@material-ui/icons/Cancel";
import { app, db } from "../../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';


export default function PendingHomelancerList() {
  const [data, setData] = useState([]);
  const [cnicImg, setCnicImg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [extractionStatus, setExtractionStatus] = useState(false);
  const [cnicId, setCnicId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetching data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "pending homelancers"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(documents);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching firestore data", error);
      }
    };

    fetchData();
  }, []);


  const handleApprove = async (id) => {
    try {
      const homelancerDocRef = doc(db, "pending homelancers", id);
      const homelancerDocSnap = await getDoc(homelancerDocRef);

      if (homelancerDocSnap.exists()) {
        const homelancerData = homelancerDocSnap.data();
        const { email } = homelancerData;
        const password = Math.random().toString(36).slice(-8);
        const createdAt = new Date(); // Fetch the current date during user creation

        await axios.post("http://localhost:5000/send-emails", {
          recipients: [email],
          password: password,
          email: email,
        });

        const auth = getAuth();
        console.log(auth);
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          ...homelancerData,
          userId: user.uid,
          password: password,
          createdAt: createdAt, // Include the createdAt field in the document
        });

        await deleteDoc(homelancerDocRef);
        setData((prevData) =>
          prevData.filter((homelancer) => homelancer.id !== id)
        );

        console.log(`User ${user.uid} created with password ${password} and ${createdAt}`);
      } else {
        console.error(`Homelancer ${id} does not exist`);
      }
    } catch (error) {
      console.error("Error approving homelancer", error);
    }
  };

  // Delete Data from firebase
  const handleDelete = async (id, email) => {
    try {
      const homelancerDocRef = doc(db, "pending homelancers", id);
      await deleteDoc(homelancerDocRef);
      setData((prevData) =>
        prevData.filter((homelancer) => homelancer.id !== id)
      );

      await axios.post('http://localhost:5000/send-emails', {
        recipients: [email],
        password: "",
        email: email,
        rejection: true,
      });

      console.log(`Homelancer ${id} deleted and email rejection sent to ${email}`);
    } catch (error) {
      console.error("Error deleting homelancer", error);
    }
  };

  // For viewing, showing popup, enabling extraction status 
  const handleViewCnic = async (cnicUrl, CNICID) => {

    
    setCnicId(CNICID);
    setCnicImg(cnicUrl);
    setShowPopup(true);
    setExtractionStatus(false);
    recognizeText(cnicUrl);
  };

  // Text Recognition for Image
  const recognizeText = async (imagePath) => {
    try {
      setIsLoading(true);
      const worker = createWorker({
        logger: (m) => console.log(m),
      });

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      await worker.setParameters({
        tessedit_char_whitelist:
          "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        tessedit_pageseg_mode: 6, // Assume a single uniform block of text
      });

      const { data: { lines } } = await worker.recognize(imagePath);
      const extractedText = lines.map((line) => line.text.trim()).join(" "); // Join lines of text

      const regex = /(\d{5}-\d{7}-\d{1})/;
      const match = extractedText.match(regex);
      const extractedInfo = match ? match[0] : "";

      console.log(extractedInfo);
      setRecognizedText(extractedInfo);
      setIsLoading(false);
      await worker.terminate();
    } catch (error) {
      console.error("Error recognizing text", error);
    }
  };

  //For closing view cnic pop up
  const handleClosePopup = () => {
    setShowPopup(false);
    setExtractionStatus(false);
    setVerificationStatus(null);
  };

  // For extracting the text from image
  const handleExtraction = async () => {
    setExtractionStatus(true);
    await recognizeText(cnicImg);
  };

  // For verifying the cnicId with extracted Id
  const handleVerification = () => {
    if (cnicId === recognizedText) {
      setVerificationStatus("Verification Successful");
    } else {
      setVerificationStatus("Verification Unsuccessful");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="homelancerListHomelancer">
            <img className="homelancerListImg" src={params.row.imageUrl} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "profileImage",
      headerName: "CNIC",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <span className="idField">{params.row.cnic || 'Loading...'}</span>
            <button
              onClick={() => handleViewCnic(params.row.cnicUrl, params.row.cnic)}
              className="viewCnic"
            >
              View CNIC
            </button>
          </>
        );
      },
    },
    {
      field: "accountType",
      headerName: "Account Type",
      width: 200,
      valueGetter: () => "homelancer",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to="/homelancers">
              <button
                className="homelancerListEdit"
                onClick={() => handleApprove(params.row.id)}
              >
                Approve
              </button>
            </Link>
            <DeleteOutlineIcon
              className="homelancerListDelete"
              onClick={() => handleDelete(params.row.id, params.row.email)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="homelancerList">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={8}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            <CancelIcon className="closButton" onClick={handleClosePopup} />
            <img className="cnicImg" src={cnicImg} alt="CNIC" />
            <div className="verifExtracButton" >
              <button className="verification" onClick={handleVerification}>
                Verification
              </button>
              <button className=" extraction" onClick={handleExtraction}>
                Extraction
              </button>
            </div>

            <div className="message">
            {extractionStatus && isLoading && <div style={{borderRadius: 10, padding:10,color:"green", opacity:0.8}}>Loading...</div>}
              {extractionStatus && !isLoading && <div style={{borderRadius: 10, background:"red", padding:10,color:"white", opacity:0.8}}>{recognizedText}</div>}
              {recognizedText && verificationStatus && <div style={{borderRadius: 10, background:"grey", padding:10, color:"white", opacity:0.8}}>{verificationStatus}</div>}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
