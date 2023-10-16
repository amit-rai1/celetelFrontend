import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './features/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomeDashboard from './features/Dashboard/HomeDashboard';
import Sidebar from './features/Common/Sidebar';
import { OperatorDetail } from './features/SimDataList';
import SimDataForm from './features/SimData';
import SenderIDComponent from './features/SenderIDComponent';



function App() {
  return (
      <div>
              <ToastContainer />

        <Routes>
        

        <Route path="/login" element={ <Login/> } />

                     <Route path="/" element={ <HomeDashboard/> } /> 
                     <Route path="/details" element={ <OperatorDetail/> } />
                     <Route path="/addForm" element={ <SimDataForm/> } />


                    <Route path="/Sidebar" element={ <Sidebar/> } /> 
                    <Route path="/senderid" element={ <SenderIDComponent/> } />  





        </Routes>
      </div>
  );
}

export default App;
