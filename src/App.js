import React from 'react';
import { Routes, Route } from "react-router-dom"
import AddForm from './features/AddForm';
import Login from './features/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './features/Dashboard/adminDashboard';
// import PrivateRoute from './features/authRoute/PrivateRoute';



function App() {
  return (
      <div>
              <ToastContainer />

        <Routes>
        

        <Route path="/" element={ <Login/> } />

        {/* <Route path="/" element={ <AddForm/> } /> */}
                    <Route path="/AddForm" element={ <AddForm/> } /> 
                    <Route path="/AdminDashboard" element={ <AdminDashboard/> } /> 

                    {/* <PrivateRoute path="/AddForm" element={<AddForm />} /> */}


        </Routes>
      </div>
  );
}

export default App;
