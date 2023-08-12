import React, { useEffect, useState } from "react";
import "./Topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [clickedNotification, setClickedNotification] = useState(null);



  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "pending homelancers")), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const user = change.doc.data();
          setNotifications((prevNotifications) => [...prevNotifications, user.email]);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleLogout = () => {
    console.log("Logging out from the account...");
    navigate("/login");
  };

  const handleNotification = (notification) =>{
    console.log("Notification clicked:", notification);
    navigate(`/pendingHomelancers`);
    setClickedNotification(notification);
  }

  const toggleNotificationPanel = () => {
    setShowNotificationPanel((prevValue) => !prevValue);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topleft">
          {/* <span className="logo">Homelancer</span> */}
        </div>
        <div className="topright">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
            />
            <span className="topIconBadge">{notifications.length}</span>
            {showNotificationPanel && notifications.length > 0 && (
              <div className="notificationPanel">
                {notifications.map((notification, index) => (
                  <div key={index} className="notificationItem" onClick={() => handleNotification(notification)}>
                   <span style={{fontWeight: 200}}>{notification}</span>  has been added.
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            <span onClick={handleLogout}>
              <LockOutlinedIcon />
            </span>
          </div>
          <img
            src="https://picsum.photos/id/237/200/300"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

// import React, { useEffect, useState } from "react";
// import "./Topbar.css";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import { app, db } from "../firebaseConfig";
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { getMessaging, onMessage } from "../../public/firebse-messaging-sw";

// const Topbar = () => {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [showNotificationPanel, setShowNotificationPanel] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(collection(db, "pending homelancers")), (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const user = change.doc.data();
//           setNotifications((prevNotifications) => [...prevNotifications, user.name]);
//         }
//       });
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     const messaging = getMessaging();
//     const unsubscribe = onMessage(messaging, (payload) => {
//       const { title } = payload.notification;
//       setNotifications((prevNotifications) => [...prevNotifications, title]);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const handleLogout = () => {
//     console.log("Logging out from the account...");
//     navigate("/login");
//   };

//   const toggleNotificationPanel = () => {
//     setShowNotificationPanel((prevValue) => !prevValue);
//   };

//   return (
//     <div className="topbar">
//       <div className="topbarWrapper">
//         <div className="topleft">
//           {/* <span className="logo">Homelancer</span> */}
//         </div>
//         <div className="topright">
//           <div className="topbarIconContainer">
//             <NotificationsNoneIcon onClick={toggleNotificationPanel} />
//             <span className="topIconBadge">{notifications.length}</span>
//             {showNotificationPanel && notifications.length > 0 && (
//               <div className="notificationPanel">
//                 {notifications.map((notification, index) => (
//                   <div key={index} className="notificationItem">
//                     {notification}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;