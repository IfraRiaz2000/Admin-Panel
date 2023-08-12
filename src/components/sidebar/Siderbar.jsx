import React from "react";
import "./Sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

export default function Siderbar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarLogo">
          <img src={logo} alt="" className="imgLogo" />
          <spn className="homelancerName" style={{ fontSize: 24 }} >Homelance</spn>
        </div>

        <div className="sidebarMenu" style={{ fontSize: 18 }} >
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="siderbarListItem ">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            
            <Link to="/pendingHomelancers" className="link">
              <li className="siderbarListItem">
                <AttachMoneyIcon className="sidebarIcon" />
                Pending Homelancers
              </li>
            </Link>

            <Link to="/users" className="link">
              <li className="siderbarListItem ">
                <PersonOutlineIcon className="sidebarIcon" />
                Users
              </li>
            </Link>

            <Link to="/homelancers" className="link">
              <li className="siderbarListItem">
                <Inventory2Icon className="sidebarIcon" />
                Homelancers
              </li>
            </Link>

            

            <Link to="/complaints" className="link">
              <li className="siderbarListItem">
                <ChatBubbleOutlineIcon className="sidebarIcon" />
                Complaints
              </li>
            </Link>






          </ul>
        </div>

      </div>


      {/* <div className="sidebarWrapper">
      <img src={logo} alt="" className="imgLogo" />

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="siderbarListItem ">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>

            <li className="siderbarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="siderbarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="siderbarListItem ">
                <PersonOutlineIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/homelancers" className="link">
              <li className="siderbarListItem">
                <Inventory2Icon className="sidebarIcon" />
                Homelancers
              </li>
            </Link>

            <Link to="/pendingHomelancers" className="link">
              <li className="siderbarListItem">
                <AttachMoneyIcon className="sidebarIcon" />
                Pending Homelancers
              </li>
            </Link>

            <li className="siderbarListItem">
              <AssessmentIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="siderbarListItem ">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="siderbarListItem">
              <QuestionAnswer className="sidebarIcon" />
              Feedback
            </li>
            <li className="siderbarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="siderbarListItem ">
              <ManageHistoryIcon className="sidebarIcon" />
              Manage
            </li>
            <li className="siderbarListItem">
              <TimelineIcon className="sidebarIcon" />
              Analytics
            </li>
            <li className="siderbarListItem">
              <ReportGmailerrorredIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}
