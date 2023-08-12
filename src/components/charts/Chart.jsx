





// import React from "react";
// import "./Chart.css";
// import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function Chart() {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const data = months.map((month, index) => ({
//     name: month,
//     count: index + 1, // Replace this with your actual data count
//   }));

//   return (
//     <div className="chart">
//       <h3 className="chartTitle">User Analytics</h3>
//       <ResponsiveContainer width="100%" aspect={4 / 1}>
//         <LineChart data={data}>
//           <XAxis dataKey="name" stroke="#ffffff" />
//           <Line type="monotone" dataKey="count" stroke="#2c3c41" />
//           <Tooltip />
//           <CartesianGrid stroke="#ffffff" strokeDasharray="5 5" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import "./Chart.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { app, db } from "../../firebaseConfig";
// import {
//   collection,
//   query,
//   onSnapshot,
//   deleteDoc,
//   doc,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";

// export default function Chart() {

//   const [data, setData] = useState([]);

 


//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dataa = months.map((month, index) => ({
//     name: month,
//     count: index + 1, // Replace this with your actual data count
//   }));

//   return (
//     <div className="chart">
//       <h3 className="chartTitle">User Analytics</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={dataa}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" stroke="#ffffff" />
//           <YAxis stroke="#ffffff" />
//           {/* <Tooltip /> */}
//           <Bar dataKey="count" fill="#FFDB58" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./Chart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const documents = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Document:", data); // Log each document's data
            return {
              id: doc.id,
              ...data,
            };
          });
  
          setData(documents);
        });
  
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching Firestore data", error);
      }
    };
  
    fetchData();
  }, []);

  

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataa = months.map((month, index) => ({
    name: month,
    count: index + 1, // Replace this with your actual data count
  }));

  return (
    <div className="chart">
      <h3 className="chartTitle">User Analytics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={dataa}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          {/* <Tooltip /> */}
          <Bar dataKey="count" fill="#FFDB58" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import "./Chart.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { app, db } from "../../firebaseConfig";
// import { collection, query, onSnapshot } from "firebase/firestore";

// export default function Chart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const q = query(collection(db, "users"));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//           const documents = snapshot.docs.map((doc) => {
//             const data = doc.data();
//             console.log("Document:", data); // Log each document's data

//             const registrationDate = data.date; // Modify 'date' to the actual field name in your Firestore document

//             if (registrationDate) {
//               const registrationMonth = new Date(registrationDate).getMonth();
//               return {
//                 id: doc.id,
//                 ...data,
//                 registrationMonth,
//               };
//             } else {
//               return null; // Ignore documents without a date field
//             }
//           });

//           const monthlyCounts = Array(12).fill(0); // Initialize an array to store the counts for each month

//           documents.forEach((doc) => {
//             if (doc) {
//               monthlyCounts[doc.registrationMonth]++;
//             }
//           });

//           const dataa = months.map((month, index) => ({
//             name: month,
//             count: monthlyCounts[index],
//           }));

//           setData(dataa);
//         });

//         return () => unsubscribe();
//       } catch (error) {
//         console.error("Error fetching Firestore data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   return (
//     <div className="chart">
//       <h3 className="chartTitle">User Analytics</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" stroke="#ffffff" />
//           <YAxis stroke="#ffffff" />
//           <Tooltip />
//           <Bar dataKey="count" fill="#FFDB58" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }