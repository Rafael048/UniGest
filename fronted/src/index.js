import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import FormActivitiesAdd from './pages/FormActivitiesAdd';
import FormModifyActivities from './pages/FormModifyActivities';
import TablesActivities from './pages/TablesActivities';
import TableTeachers from './pages/TableTeachers';
import TablesSections from './pages/TablesSections';
import TablesSubjects from './pages/TablesSubjects';
import FormProfessorsAdd from './pages/FromProfessorsAdd'
import FormSectionsAdd from './pages/FormSectionsAdd'
import FormSubjectsAdd from './pages/FormSubjectsAdd'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<App/>} />
      <Route path='RegisterUser' element={<RegisterUser/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='AgregarActividades' element={<FormActivitiesAdd/>}/>
      <Route path='AgregarProfesores' element={<FormProfessorsAdd/>}/>
      <Route path='AgregarMaterias' element={<FormSubjectsAdd/>}/>
      <Route path='AgregarSecciones' element={<FormSectionsAdd/>}/>
      <Route path='FormModifyActivities' element={<FormModifyActivities/>}/>
      <Route path='Profesores' element={<TableTeachers/>}/>
      <Route path='Actividades' element={<TablesActivities/>}/>
      <Route path='Materias' element={<TablesSubjects/>}/>
      <Route path='Secciones' element={<TablesSections/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
