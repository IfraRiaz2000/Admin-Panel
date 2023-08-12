import React, { useState, useEffect } from 'react'
import "./WidgetLg.css"
import { Box } from "@mui/system";
import { app, db } from "../../../firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

export default function WidgetLg() {
  const [services, setServices] = useState([]);
  const [pageSize, setPageSize] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, 'Services'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const servicesList = snapshot.docs.map((doc) => doc.data());
          setServices(servicesList);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching Firestore data', error);
      }
    };

    fetchServices();
  }, []);


  const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
 
   const usersToDisplay = services.slice(startIndex, endIndex);

   const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < services.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <div className='widgetLg'>
      <Box component="span" className="widgetLgBox">
        <span className="widgetLgTitle">Services List</span>
      </Box>
      <table className="widgetLgTable">
      <thead>
          <tr className="widgetLgTr">
          
            <th className="widgetLgTh">Name</th>
            <th className="widgetLgTh">Category</th>
            <th className="widgetLgTh">Price</th>
            <th className="widgetLgTh">Rating</th>
          
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((service) => (
            <tr key={service.id} className="widgetLgTr">
              {/* <td className="widgetLgUser">
               
                <span className="widgetLgName">{service.Name}</span>
              </td> */}
              <td className="widgetLgCategory">{service.Name}</td>
              <td className="widgetLgCategory">{service.Category}</td>
              <td className="widgetLgPrice">{service.Price}</td>
              <td className="widgetLgRating">{service.Rating}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="topleft">
        <span onClick={handlePrevPage}>
          <ArrowCircleLeftOutlinedIcon style={{color: "red"}} />
        </span>
      </div>
      <div className="topright">
        <span onClick={handleNextPage}>
          <ArrowCircleRightOutlinedIcon style={{color: "green"}} />
        </span>
      </div>
    </div>
  )
}
