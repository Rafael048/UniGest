import { React, useState } from 'react'
import img from '../assets/logo.png'
import '../css/Header.css'
import Exit from './Exit'
import { motion } from 'framer-motion'

export default function Header({ landing, active, activities, color, plani }) {
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
        <button className='buttonHeaderOpen' onClick={openMenuHeader}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </button>
        <div className={openHeader ? 'backHeader viewHeader' : 'backHeader'}>
          hola
        </div>
        {
          <ul className={openHeader ? 'links' : 'links closeHeader'}>
            {
              active ? <>
                <li><a href="/" className={landing ? 'link active' : 'link'}>Inicio</a></li>
                <li><a href="Actividades" className={activities ? 'link active' : 'link'}>Actividades</a></li>
                <li><a href="/calendario" className={plani ? 'link active' : 'link'}>Planificación</a></li>
                <li onClick={() => handleShowExit()}><p className='link'>Cerrar Sesión</p></li>
              </> :
                <>
                  <li className='buttonHeaderClose'>
                    <button onClick={openMenuHeader} className='buttonHeaderClose'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </button>
                  </li>
                  {
                    plani ? <li className='linksHeaderli'><a href="/" className={landing ? 'link active' : 'link'}>Inicio</a></li> : null
                  }
                  <li className='linksHeaderli'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fillRule="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                      <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                    </svg>
                    <a href="/calendario" className={plani ? 'link active' : 'link'}>Planificación</a>
                  </li>
                  <li className='linksHeaderli'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <a href="Login" className='link'>Iniciar Sesión</a>
                  </li>
                  <li className='linksHeaderli'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                    <a href="RegisterUser" className='link'>Registrarse</a>
                  </li>
                </>
            }


          </ul>
        }
      </header>
    </div>
  )
}
