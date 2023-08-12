import React, { useState, useEffect } from "react";
import "./WidgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { Box } from "@mui/system";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import userImage from "../../../assets/userImage.jpg"

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageSize, setPageSize] = useState(4); // Number of users to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const usersList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUsers(usersList);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching firestore data", error);
      }
    };

    fetchData();
  }, []);

  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;


  const usersToDisplay = users.slice(startIndex, endIndex);

  const handleDisplayUser = (user) => {
    setSelectedUser(selectedUser === user ? null : user);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < users.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="widgetSm">
      <Box component="span" className="widgetBox">
        <span className="widgetSmTitle">New join Members</span>
      </Box>

      {selectedUser && (
  <div className="widgetSmUserDetails">
    <div className="widgetSmUserDetailsLeft">
      <img src={selectedUser.imageUrl} alt="" className="widgetSmImg" />
    </div>
    <div className="widgetSmUserDetailsRight">
      <p>ID: {selectedUser.userId}</p>
      <p>Name: {selectedUser.name}</p>
      <p>Email: {selectedUser.email}</p>
      <p>AccountType:{selectedUser.accountType}</p>
    </div>
  </div>
)}

      <ul className="widgetSmList">
        {/* User list items */}
        {usersToDisplay.map((user) => (
          <li key={user.id} className="widgetSmListItem">
            {/* User details */}
            <div className="userDetails">
              <img src={user.imageUrl} alt="" className="widgetSmImg" />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.name}</span>
                <span className="widgetSmUserEmail">{user.accountType}</span>
              </div>
            </div>
            <button
              className="widgetSmButton"
              onClick={() => handleDisplayUser(user)}
            >
              <VisibilityIcon className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>

      <div className="topleft">
        <span onClick={handlePrevPage}>
          <ArrowCircleLeftOutlinedIcon style={{ color: "red" }} />
        </span>
      </div>
      <div className="topright">
        <span onClick={handleNextPage}>
          <ArrowCircleRightOutlinedIcon style={{ color: "green" }} />
        </span>
      </div>
    </div>
  );
}
