import { React, useState } from 'react'
import img from '../assets/logo.png'
import '../css/Header.css'
import Exit from './Exit'

export default function Header({ landing, active, activities, color, plani }) {
  const [exitEmer, setExitEmer] = useState(null)

  function handleShowExit() {
    setExitEmer(true)
  }

  function handleCancel() {
    setExitEmer(false)
  }

  return (
    <div>
      <Exit exitEmer={exitEmer} onCancel={handleCancel} />
      <header className={`header ${color}`}>
        <div className='logo'>
          <img src={img} alt="logoImg" />
        </div>

        {
          <ul className='links'>

            {
              active ? <>
                <li><a href="/" className={landing ? 'link active' : 'link'}>Inicio</a></li>
                <li><a href="Actividades" className={activities ? 'link active' : 'link'}>Actividades</a></li>
                <li><a href="/calendario" className={plani ? 'link active' : 'link'}>Planificación</a></li>
                <li><a href="/ajustes" className={plani ? 'link active' : 'link'}>Ajustes</a></li>
                <li onClick={() => handleShowExit()}><p className='link'>Cerrar Sesión</p></li>
              </> :
              <>
                {
                  plani ? <li><a href="/" className={landing ? 'link active' : 'link'}>Inicio</a></li> : null 
                }
                <li><a href="/calendario" className={plani ? 'link active' : 'link'}>Planificación</a></li>
                <li><a href="Login" className='link'>Iniciar Sesión</a></li>
                <li><a href="RegisterUser" className='link'>Registrarse</a></li>
              </>
            }

           
          </ul>
        }
      </header>
    </div>
  )
}
