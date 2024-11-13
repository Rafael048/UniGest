import React, { useState, useEffect } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import '../css/Settings.css'
import image from '../assets/Settings.png'
import { motion } from "framer-motion";

export default function Settings() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const token = Cookies.get('jwt')
  const [warning, setWarning] = useState(null)

  function handleShowWarning() {
    setWarning(true)
  }

  function handleCancel() {
    setWarning(false)
  }
  async function deleteElement(e) {
    e.preventDefault()
    let pass = e.target.pass.value
    await axios.delete(`http://localhost:3000/eliminar?pass=${pass}&user=${user.userName}`)
      .then(() => {
        Cookies.remove('jwt')
        window.location.replace('/')
      }).catch((err) => {
        console.log(err)
      });
  }
  useEffect(() => {
    async function getUser() {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setUser(result.data.user)
          setLoading(false)
        }).catch((err) => {
          console.log(err)
          window.location.replace('/401')
        });
    }
    getUser()
  }, [token])
  return (
    <>
      {loading ?
        <p>Cargando...</p>
        :
        <div className="settingContainer">
          <div className="settingList">
            <div className="titleSetting">
              <div className="imgSetting">
                <img src={image} alt="" width={"100%"} />
              </div>
              <h1>Configuracion de <span className="nameSetting">
                {user.userName}
              </span>
              </h1>
            </div>
            <div className="settingDescription">
              <p className="textSetting"><b>Nombre: </b> <span className="data">{user.nombre}</span></p>
              <p className="textSetting"><b>Apellido:</b> <span className="data">{user.apellido}</span></p>
              <p className="textSetting"><b>Puesto:</b> <span className="data">{user.rol}</span></p>
            </div>
            <div className="buttonSettingsContainer">
              <motion.button onClick={() => window.location.replace('/modificarUsuario')} whileHover={{ backgroundColor: "#0947a5", scale: .9 }} className="buttonSetting">Editar</motion.button>
              <motion.button whileHover={{ backgroundColor: "#ff0000", scale: .9 }} className="buttonSetting" onClick={handleShowWarning}>Eliminar</motion.button>
            </div>

          </div>
        </div>
      }
      <div className={`warning ${warning ? '' : 'cancel'}`}>
        <div className='windonws'>
          <div className='textExit'>
            <p>¿Seguro que deseas eliminar?</p>
          </div>
          <div className='buttonsExitWindows'>
            <form onSubmit={(e) => deleteElement(e)} className="settingForm">
              <div className="passwordSettings">
              <input type="password" placeholder="Ingrese su contraseña" required name="pass" className="passwordInput" />
              </div>
              <button className='buttonsDelete cancelButton' onClick={handleCancel}>
                Cancelar
              </button>
              <button className='buttonsDelete aceptButton' type="submit">Aceptar</button>
            </form>
          </div>
        </div>
      </div >

    </>
  )
}