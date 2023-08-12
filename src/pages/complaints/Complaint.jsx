import React, { useEffect, useState } from "react";
import "./complaint.css";
import { DataGrid } from "@material-ui/data-grid";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import { app, db } from "../../firebaseConfig";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import axios from 'axios';

const Complaint = () => {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [messagee, setMessagee] = useState("");
    const [selectedUserEmail, setSelectedUserEmail] = useState(""); // Add selectedUserEmail state


    useEffect(() => {
        const fetchData = async () => {
          try {
            const q = query(collection(db, "support"));
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

      const handleViewResolve = async (email) =>{
        setSelectedUserEmail(email)
        setShowPopup(true);
      }

      const handleClosePopup = () => {
        setShowPopup(false);
      };

      
      const handleSendEmail = async () => {
        try {
          // Make a POST request to the server
          const response = await axios.post("http://localhost:5000/send-emails", {
            recipients: [selectedUserEmail], // Assuming selectedUserEmail holds the email address of the selected user
            message: messagee,
            resolve: false,
          });
      
          console.log("Email sent successfully");
          console.log(messagee);
          // Handle success, show a success message, etc.
      
          // Reset the form or show a success message
          setMessagee("");
          setShowPopup(false);
        } catch (error) {
          console.error("Error sending email", error);
          // Handle error, show an error message, etc.
        }
      };


    

    const columns = [
        { field: "userUid", headerName: "User ID", width: 150 },
        { field: "supportId", headerName: "Support ID", width: 150 },
        {
          field: "name",
          headerName: "Name",
          width: 150,
          
        },
        {
          field: "email",
          headerName: "Email",
          width: 150,
        },
        {
            field: "message",
            headerName: "Message",
            width: 150,
          },
        {
            field: "profileImage",
            headerName: "Compliants",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <button className="resolveButton" onClick={() => handleViewResolve(params.row.email)} >
                    Resolve
                  </button>
                </>
              );
            },
          },
    
      ];
  return (
    <div className="complaintsList">
    <div style={{ height: 500, width: "100%" }}>
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
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Enter your message"
            value={messagee}
            onChange={(event) => setMessagee(event.target.value)}
          />
          <button  type="button" onClick={handleSendEmail} >
            Submit
          </button>
          </div>
        </div>
      )}
  </div>
  )
}

export default Complaint
