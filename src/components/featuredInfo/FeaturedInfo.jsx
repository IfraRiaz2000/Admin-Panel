import React, { useEffect, useState } from 'react'
import "./featuredInfo.css"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { app, db } from '../../firebaseConfig';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import ProgressBar from "@ramonak/react-progress-bar";

export default function FeaturedInfo() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHomelancers, setTotalHomelancer] = useState(0)
  const [services, setServices] = useState(0)

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'), where('accountType', '==', 'user'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setTotalUsers(snapshot.size);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching firestore users', error);
      }
    }
    
    fetchUsers();

    const fetchHomelancers = async () => {
      try {
        const q = query(collection(db, 'users'), where('accountType', '==', 'homelancer'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setTotalHomelancer(snapshot.size);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching firestore homelancers', error);
      }
    }
    
    fetchHomelancers();

   

    const fetchPendingHomelancers = async () => {
      try {
        const q = query(collection(db, 'Services'));
        const unsubscribe = onSnapshot(q, (snapshot) => {

          setServices(snapshot.size);
        });

        return () => unsubscribe();


      } catch (error) {
        console.error('Error fetching firestore users', error);
      }
    }

    fetchPendingHomelancers();

  }, [])

  const MAX_USERS_CAPACITY = 100;
  const completionPercentageofUser = (totalUsers / MAX_USERS_CAPACITY) * 100;

  const MAX_HOMELANCERS_CAPACITY = 100;
  const completionPercentageofHomelancer = (totalHomelancers / MAX_HOMELANCERS_CAPACITY) * 100;

  const MAX_SERVICES_CAPACITY = 100;
  const completionPercentageofServices = (services / MAX_SERVICES_CAPACITY) * 100;






  return (
    <div className='featured'>
      <div className="featuredItem">
        <Box component="span" className='userBox' >
          <AlignVerticalBottomIcon sx={{ color: 'whitesmoke' }} />
        </Box>

        <div className="featureContainer">
          <span className="featuredTitle">Total Users</span>
          <span className="featuredMoney">{totalUsers}</span>
        </div>

        <div className='featureContainer2'>
          {/* <span className="featuredMoneyRate">-11.4 <ArrowDownwardIcon className='featuredIcon negative' /> </span> */}
          {/* <span className="featuredSub">Compared to Last Month</span> */}
          <ProgressBar className='userProBar'  completed={completionPercentageofUser} />;
        </div>

      </div>

      <div className="featuredItem">
        <Box component="span" className='homelancerBox' >
          <PeopleAltIcon sx={{ color: 'whitesmoke' }} />
        </Box>

        <div className="featureContainer">
        <span className="featuredTitle">Total Homelancers</span>
        <span className="featuredMoney">{totalHomelancers}</span>
        </div>

        <div className='featureContainer2'>
        {/* <span className="featuredMoneyRate">-10.4 <ArrowDownwardIcon className='featuredIcon negative' /> </span>
        <span className="featuredSub">Compared to Last Month</span> */}
        <ProgressBar className='homelancerProBar' completed={completionPercentageofHomelancer} />;
        </div>

      </div>
      <div className="featuredItem">

      <Box component="span" className='serviceBox' >
          <CleaningServicesIcon sx={{ color: 'whitesmoke' }} />
        </Box>

        <div className="featureContainer">
        <span className="featuredTitle"> Services</span>
          <span className="featuredMoney">{services}</span>
        </div>

        <div className='featureContainer2'>
        {/* <span className="featuredMoneyRate">+2.4 <ArrowUpwardIcon className='featuredIcon' /> </span>
        <span className="featuredSub">Compared to Last Month</span> */}
        <ProgressBar variant="success" completed={completionPercentageofServices} />;
        </div>

      </div>
    </div>
  )
}
