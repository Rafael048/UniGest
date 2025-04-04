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
import SettingsPage from './pages/SettingsPage';
import TestResponsivetemp from './pages/TestResponsivetemp';
import SubjectsProfessors from './pages/SubjectsProfessors'
import TablePlanifig from './pages/TablePlanifig'
import FormUnitsAdd from './pages/FormUnitsAdd'
import FormActivitiesAddA from './pages/FormAddActivitesAndUnits';
import TablesEvents from './pages/TablesEvents';
import FormEventsAdd from './pages/FormAddEvents';
import FormModifyEvents from './pages/FormModifyEvents';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<App/>} />
      <Route path='AgregarUsuario' element={<RegisterUser/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='AgregarActividades' element={<FormActivitiesAdd/>}/>
      <Route path='AgregarProfesores' element={<RegisterUser/>}/>
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
      <Route path='Ajustes' element={<SettingsPage/>}/>
      <Route path='test' element={<TestResponsivetemp/>}/>
      <Route path='Asignaturas' element= {<SubjectsProfessors/>} />
      <Route path='Planificacion' element={<TablePlanifig/>}/>
      <Route path='agregarUnidad' element= {<FormUnitsAdd/>}/>
      <Route path='AgregarActividades&Unidad' element={<FormActivitiesAddA/>}/>
      <Route path='Eventos' element= {<TablesEvents/>}/>
      <Route path='AgregarEventos' element={<FormEventsAdd/>}/>
      <Route path='ModificarEventos' element={<FormModifyEvents/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
