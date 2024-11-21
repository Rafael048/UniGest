import { React, useState } from 'react'
import img from '../assets/logo.png'
import '../css/Header.css'
import Exit from './Exit'
import { IoIosLogOut } from "react-icons/io"; //cerrar Sesion icon
import { IconContext } from 'react-icons/lib';
import { HiMenu } from "react-icons/hi"; //Menu icon
import { FaCalendarAlt } from "react-icons/fa"; //Calendario icon
import { MdAssignmentTurnedIn } from "react-icons/md"; //Actividades icon
import { IoListCircleOutline } from "react-icons/io5"; //Materias icon 
import { GrUserSettings } from "react-icons/gr"; //Ajustes icon
import { FaRegUserCircle } from "react-icons/fa"; //Inicar sesion icon
import { IoIosCloseCircleOutline } from "react-icons/io"; //Cerrar icon
import { RiTableView } from "react-icons/ri"; //Planificacion
import Cookies from 'js-cookie'




export default function Header({ asig, active, activities, color, plani, setting, planiAll }) {
  const [exitEmer, setExitEmer] = useState(null)
  const [openHeader, setOpenHeader] = useState(false)

  function handleShowExit() {
    setExitEmer(true)
  }

  function handleCancel() {
    setExitEmer(false)
  }

  function openMenuHeader() {
    if (openHeader === false) {
      setOpenHeader(true)
    } else {
      setOpenHeader(false)
    }
  }
  return (
    <div>
      <Exit exitEmer={exitEmer} onCancel={handleCancel} />
      <header className={`header ${color}`}>
        <div className='logoHeader'>
          <img src={img} alt="logoImg" width={"90%"} />
        </div>
        <button className='buttonHeaderOpen' onClick={openMenuHeader} name='openMenu'>
          <IconContext.Provider value={{ className: "svgHeader" }}>
            <HiMenu />
          </IconContext.Provider>
        </button>
        {
          <ul className={openHeader ? 'links' : 'links closeHeader'}>
            {
              active ? <>
                <li className='buttonHeaderClose'>
                  <button onClick={openMenuHeader} className='buttonHeaderClose'>
                    <IconContext.Provider value={{ className: "svgHeader" }}>
                      <IoIosCloseCircleOutline />
                    </IconContext.Provider>
                  </button>
                </li>
                <li className={plani ? 'linksHeaderli active' : 'linksHeaderli'}>
                  <IconContext.Provider value={{ className: "svgHeader" }}>
                    <FaCalendarAlt />
                  </IconContext.Provider>
                  <a href="/" className={'link'}>
                    Calendario
                  </a>
                </li>
                <li className={asig ? 'linksHeaderli active' : 'linksHeaderli'}>
                  <IconContext.Provider value={{ className: "svgHeader" }}>
                    <IoListCircleOutline />
                  </IconContext.Provider>
                  <a href="/asignaturas" className={asig ? 'link active' : 'link'}>Asignaturas</a>
                </li>
                <li className={planiAll ? 'linksHeaderli active' : 'linksHeaderli'}>
                  <IconContext.Provider value={{ className: "svgHeader" }}>
                    <RiTableView />
                  </IconContext.Provider>
                  <a href="/planificacion" onClick={()=>Cookies.remove('id')} className={planiAll ? 'link active' : 'link'}>Planificación</a>
                </li>
                <li className={activities ? 'linksHeaderli active' : 'linksHeaderli'}>
                  <IconContext.Provider value={{ className: "svgHeader" }}>
                    <MdAssignmentTurnedIn />
                  </IconContext.Provider>
                  <a href="/Actividades" className="link">
                    Actividades
                  </a>
                </li>
                <li className={setting ? 'linksHeaderli active' : 'linksHeaderli'}>
                  <IconContext.Provider value={{ className: "svgHeader" }}>
                    <GrUserSettings />
                  </IconContext.Provider>
                  <a href="/ajustes" className={setting ? 'link active' : 'link'}>Ajustes</a>
                </li>
                <li className='linksHeaderli' onClick={() => handleShowExit()}>
                  <IconContext.Provider value={{ className: "svgLogout" }}>
                    <IoIosLogOut />
                  </IconContext.Provider>
                  <p className='link logoutDesktop'>
                    Cerrar Sesión
                  </p>
                </li>
              </> :
                <>
                  <li className='buttonHeaderClose'>
                    <button onClick={openMenuHeader} className='buttonHeaderClose'>
                      <IconContext.Provider value={{ className: "svgHeader" }}>
                        <IoIosCloseCircleOutline />
                      </IconContext.Provider>
                    </button>
                  </li>
                  <li className={plani ? 'linksHeaderli active' : 'linksHeaderli'}>
                    <IconContext.Provider value={{ className: "svgHeader" }}>
                      <FaCalendarAlt />
                    </IconContext.Provider>
                    <a href="/calendario" className={plani ? 'link active' : 'link'}>Calendario</a>
                  </li>
                  <li className='linksHeaderli'>
                    <IconContext.Provider value={{ className: "svgHeader" }}>
                      <FaRegUserCircle />
                    </IconContext.Provider>
                    <a href="Login" className='link'>Iniciar Sesión</a>
                  </li>
                </>
            }


          </ul>
        }
      </header>
    </div>
  )
}
