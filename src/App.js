import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BatchList from './component/BatchList';
import DayWisePlan from './component/DayWisePlan';
import AddCourse from './component/AddCourse';
import AddBatch from './component/AddBatch';
import AdminPanel from './component/AdminPanel';
import Faculty from './component/Faculty';
import Admin from './component/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoursePlanList from './component/CoursePlanList';
import Home from './component/Home';
import FacultyPanel from './component/FacultyPanel';
import FacultyList from './component/FacultyList';
import UpdateFaculty from './component/UpdateFaculty';
import ListCourse from './component/ListCourse';






function App() {
 

  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/admin-panel' element={<AdminPanel />} />
          <Route path='/faculty-panel' element={<FacultyPanel />} />
          <Route path='/FacultyList' element={<FacultyList />} />
          <Route path='/UpdateFaculty' element={<UpdateFaculty />} />
          <Route path='/Faculty' element={<Faculty />} />
          <Route path='/BatchList' element={<BatchList />} />
          <Route path='/CoursePlanList' element={<CoursePlanList />} />
          <Route path='/AddBatch' element={<AddBatch/>} />
          <Route path='/DayWisePlan' element={<DayWisePlan />} />
          <Route path='/AddCourse' element={<AddCourse />} />
          <Route path='/ListCourse' element={<ListCourse />} />
        </Routes>
        </BrowserRouter>
      
    
    </>

   
  );
}

export default App;
