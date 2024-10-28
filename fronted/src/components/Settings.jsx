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
                            <img src={image} alt="" />
                            <h1>Configuracion de <span className="nameSetting">
                                {user.userName}
                            </span>
                            </h1>
                        </div>
                        <div className="settingDescription">
                            <p className="textSetting"> <b>Nombre: </b> {user.nombre}</p>
                            <p className="textSetting"><b>Apellido:</b> {user.apellido} </p>
                            <p className="textSetting"><b>Puesto:</b> {user.rol} </p>
                        </div>
                        <div className="buttonSettingsContainer">
                            <motion.button onClick={() => window.location.replace('/modificarUsuario')} whileHover={{backgroundColor:"#0947a5", scale:.9}} className="buttonSetting">Editar</motion.button>
                            <motion.button whileHover={{backgroundColor:"red", scale:.9}} className="buttonSetting">Eliminar</motion.button>
                        </div>

                    </div>
                </div>
            }

        </>
    )
}