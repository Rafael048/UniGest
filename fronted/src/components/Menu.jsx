import React, { useState } from 'react'
import '../css/Menu.css'
import Exit from './Exit'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMiniHome } from "react-icons/hi2"; //Inicio icon
import { HiMenu } from "react-icons/hi"; //Menu icon
import { IconContext } from 'react-icons/lib';
import { IoListCircleOutline } from "react-icons/io5"; //Materias icon 
import { FaUsers } from "react-icons/fa"; // Profesores icon
import { CiGrid32 } from "react-icons/ci"; //  seccion icon
import { AiOutlineUserAdd } from "react-icons/ai"; // Agregar usuarios Icon
import { GrUserSettings } from "react-icons/gr"; //Ajustes icon
import { IoLogOutOutline } from "react-icons/io5"; //Cerrar sesion
import { FaUsersBetweenLines } from "react-icons/fa6"; //Planificacion profesores




export default function Menu({ btIni, btMateria, btSeccion, btActividades, btProfesores, btAjustes }) {

    const [open, setOpen] = useState(false)
    const [classLinks, setClassLinks] = useState('closeLinks')
    const [displayMenu, setDisplayMenu] = useState('openMenu')
    const [exitEmer, setExitEmer] = useState(null)
    const [mobile, setMobile] = useState('mobile')
    const ini = btIni
    const materia = btMateria
    const seccion = btSeccion
    const actividades = btActividades
    const profesores = btProfesores
    const ajustes = btAjustes

    async function openMenu() {
        if (open === false) {
            setOpen(true)
            setDisplayMenu('openMenu')
            setClassLinks('closeLinks')
            setMobile('mobile')
        } else {
            if (open === true) {
                setOpen(false)
                setDisplayMenu('')
                setClassLinks('')
                setMobile('')
            }
        }



    }

    function handleShowExit() {
        setExitEmer(true)
    }

    function handleCancel() {
        setExitEmer(false)
    }

    const linkOpen = { opacity: 1, y: 0 }
    const linkClose = { opacity: 0, y: 20 }
    return (
        <>
            <div className={`menu ${displayMenu}`}>
                <div className='btOpen'>
                    <motion.button className='btMenu' onClick={() => openMenu()} whileHover={{ scale: 1.2 }}>
                        <IconContext.Provider value={{ className: "svgMenu" }}>
                            <HiMenu />
                        </IconContext.Provider>
                    </motion.button>
                </div>
                <div className='linksOrder'>
                        <div className={`linksDirector ${mobile}`}>

                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/" className={`linksMenu ${ini}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <HiMiniHome />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Inicio
                                        </motion.p>
                                    </a>
                                </motion.div>
                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/profesores" className={`linksMenu ${profesores}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <FaUsers />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Profesores
                                        </motion.p>
                                    </a>
                                </motion.div>

                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/materias" className={`linksMenu ${materia}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <IoListCircleOutline />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Materias
                                        </motion.p>
                                    </a>
                                </motion.div>
                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/secciones" className={`linksMenu ${seccion}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <CiGrid32 />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Secciones
                                        </motion.p>
                                    </a>
                                </motion.div>

                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/actividades" className={`linksMenu ${actividades}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <FaUsersBetweenLines />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Actividades
                                        </motion.p>
                                    </a>
                                </motion.div>
                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/AgregarUsuario" className={`linksMenu`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <AiOutlineUserAdd />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .8 }} className={classLinks}>
                                            Agregar Usuarios
                                        </motion.p>
                                    </a>
                                </motion.div>
                            </div>
                            <div className='buttons'>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <a href="/ajustes" className={`linksMenu ${ajustes}`}>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <GrUserSettings />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Ajustes
                                        </motion.p>
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                        <div onClick={() => handleShowExit()} className={`logout buttons ${mobile}`}>
                            <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                <div className={`linksMenu closeSesion ${mobile}`}>
                                    <IconContext.Provider value={{ className: "svgMenu" }}>
                                        <IoLogOutOutline />
                                    </IconContext.Provider>
                                    <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                        Cerrar Sesión
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>
                </div>
                <Exit exitEmer={exitEmer} onCancel={handleCancel} />

            </div>
        </>
    )
}
