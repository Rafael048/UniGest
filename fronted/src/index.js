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
import AsingProfessor from './pages/AsingProfessor'
import CalendarPage from './pages/CalendarPage';
import AsingActivitie from './pages/AsingActivities';
import Error401 from './components/Error401';
import FormModifyProfessors from './pages/FormModifyProfessors'
import FormModifySubjects from './pages/FormModifySubjects'
import FormModifyUser from './pages/FormModifyUser'
import FormModifySections from './pages/FormModifySections'
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
      <Route path='ModificarActividades' element={<FormModifyActivities/>}/>
      <Route path='Profesores' element={<TableTeachers/>}/>
      <Route path='Actividades' element={<TablesActivities/>}/>
      <Route path='Materias' element={<TablesSubjects/>}/>
      <Route path='Secciones' element={<TablesSections/>}/>
      <Route path='AsignarProfesor' element={<AsingProfessor/>}/>
      <Route path='AsignarActividad' element={<AsingActivitie/>}/>
      <Route path='Error401' element={<Error401/>}/>
      <Route path='ModificarProfesores' element={<FormModifyProfessors/>}/>
      <Route path='ModificarMaterias' element={<FormModifySubjects/>}/>
      <Route path='ModificarSecciones' element={<FormModifySections/>}/>
      <Route path='Calendario' element={<CalendarPage/>}/>
      <Route path='ModificarUsuario' element={<FormModifyUser/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
