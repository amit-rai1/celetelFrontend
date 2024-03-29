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
import { AdminDashboard } from './features/Dashboard/adminDashboard';
import { AdminList } from './features/Dashboard/adminSimList';
import AdminSenderID from './features/Common/adminSendrID';
import EditSimDataForm from './features/EditSimDataForm';


function App() {
  return (
      <div>
              <ToastContainer />

        <Routes>
        

        <Route path="/login" element={ <Login/> } />

                     <Route path="/" element={ <HomeDashboard/> } /> 
                     <Route path="/adminDashboard" element={ <AdminDashboard/> } /> 
                     <Route path="/adminSimList" element={ <AdminList/> } /> 


                     <Route path="/userdashboard/details" element={ <OperatorDetail/> } />
                     <Route path="/addForm" element={ <SimDataForm/> } />

                     <Route path="/editForm" element={ <EditSimDataForm/> } />


                    <Route path="/Sidebar" element={ <Sidebar/> } /> 
                    {/* <Route path="/Sidebaradmin" element={ <Sidebaradmin/> } />  */}
                    <Route path="/senderid" element={ <SenderIDComponent/> } />  
                    <Route path="/admin/senderid" element={ <AdminSenderID/> } />  






        </Routes>
      </div>
  );
}

export default App;
