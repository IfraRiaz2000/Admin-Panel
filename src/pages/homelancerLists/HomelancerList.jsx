import React, { useState, useEffect } from "react";

import "./HomelancerList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import { app, db } from "../../firebaseConfig";
import { collection, query, onSnapshot, where } from "firebase/firestore";

export default function HomelancerList() {
  const [data, setData] = useState([]);
  const [cnicImg, setCnicImg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"), where("accountType", "==", "homelancer"));
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

  const handleViewCnic = (cnic) => {
    setCnicImg(cnic);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="homelancerListHomelancer">
            <img className="homelancerListImg" src={params.row.profileImg} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "profileImage",
      headerName: "CNIC",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleViewCnic(params.row.profileImg)} className="viewCnic">
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
      field: "status",
      headerName: "Status",
      width: 200,
      valueGetter: () => "Beginner",
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
          </div>
        </div>
      )}
    </div>
  );
}