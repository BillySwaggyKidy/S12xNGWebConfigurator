import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetConfigurationReducer } from '../reducers/configuration.js';
import Userbar from './userbar/Userbar.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

export default function Home() {
  const { online } = useSelector((state) => state.authentification); // we get the online and userInfo var from the authentification reducer
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate is a React Router Hooks to navigate programmatically trougth route
  const dispatch = useDispatch();

  useEffect(() => {
    // redirect user to the main page if is not logged or not an admin
    if (location.pathname == "/") {
      dispatch(resetConfigurationReducer());
    }

  }, [location])

  useEffect(()=>{
    if (!online) {
      navigate("/login");
    }
  },[online])

  return (
    <div className='flex flex-col w-full h-full'>
      <Userbar/>
      <Dashboard/>
    </div>
  );
};