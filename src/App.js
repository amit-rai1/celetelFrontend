import React from 'react';
import { Routes, Route } from "react-router-dom"
// import AddForm from './features/AddForm';
import Login from './features/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HomeDashboard from './features/Dashboard/HomeDashboard';
import Sidebar from './features/Common/Sidebar';
import EmpList from './features/EmpList/EmployeList';
// import DataList from './features/DataList/DataList';
// import HeaderAdmin from './features/Header/Sidebar';
// import PrivateRoute from './features/authRoute/PrivateRoute';
import DataList from './features/DataList/DataList'
import { OperatorDetail } from './features/SimDataList';
import SimDataForm from './features/SimData';
import SenderIDComponent from './features/SenderIDComponent';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
      <div>
              <ToastContainer />

        <Routes>
        

        <Route path="/login" element={ <Login/> } />

        {/* <Route path="/" element={ <AddForm/> } /> */}
                    {/* <Route path="/AddForm" element={ <AddForm/> } />  */}
                     <Route path="/" element={ <HomeDashboard/> } /> 
                     <Route path="/details" element={ <OperatorDetail/> } />
                     <Route path="/addForm" element={ <SimDataForm/> } />


                    <Route path="/Sidebar" element={ <Sidebar/> } /> 
                    <Route path="/EmpList" element={ <EmpList/> } /> 
                    <Route path="/dataList" element={ <DataList/> } />  
                    <Route path="/senderid" element={ <SenderIDComponent/> } />  



                    {/* <PrivateRoute path="/AddForm" element={<AddForm />} /> */}


        </Routes>
      </div>
  );
}

export default App;
