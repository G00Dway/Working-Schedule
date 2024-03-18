import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import EmployeeSignup from './Components/EmployeeSignup';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';
import MessageAdmins from './Components/MessagePage';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Start />}></Route>
          <Route path='/adminlogin' element={<Login />}></Route>
          <Route path='/employee_login' element={<EmployeeLogin />}></Route>
          <Route path='/employee_signup' element={<EmployeeSignup />}></Route>
          <Route path='/report_problem' element={<MessageAdmins />}></Route>
          <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
          <Route path='/dashboard' element={
            <PrivateRoute >
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/employee' element={<Employee />}></Route>
            <Route path='/dashboard/category' element={<Category />}></Route>
            <Route path='/dashboard/profile' element={<Profile />}></Route>
            <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
            <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
