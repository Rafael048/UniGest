import React, { useState } from 'react'
import '../css/Menu.css'
import Exit from './Exit'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMiniHome } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import { IconContext } from 'react-icons/lib';
import { IoListCircleOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CiGrid32 } from "react-icons/ci";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";




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
            <div className={`menu ${displayMenu}`}
                initial={{ width: "5%" }}
                animate={{ width: "30%" }}
                transition={{ duration: .6 }}>
                <div className='btOpen'>
                    <motion.button className='btMenu' onClick={() => openMenu()} whileHover={{ scale: 1.2 }}>
                        <IconContext.Provider value={{ className: "svgMenu" }}>
                            <HiMenu />
                        </IconContext.Provider>
                    </motion.button>
                </div>
                <div className='linksOrder'>
                    <AnimatePresence>

                        <div className={`linksDirector ${mobile}`}>

                            <div className='buttons'>
                                <a href="/" className={`linksMenu ${ini}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <HiMiniHome />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Inicio
                                        </motion.p>
                                    </motion.div>
                                </a>
                            </div>
                            <div className='buttons'>
                                <a href="/profesores" className={`linksMenu ${profesores}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <FaUsers />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Profesores
                                        </motion.p>
                                    </motion.div>
                                </a>

                            </div>
                            <div className='buttons'>
                                <a href="/materias" className={`linksMenu ${materia}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <IoListCircleOutline />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Materias
                                        </motion.p>
                                    </motion.div>
                                </a>
                            </div>
                            <div className='buttons'>
                                <a href="/secciones" className={`linksMenu ${seccion}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <CiGrid32 />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Secciones
                                        </motion.p>
                                    </motion.div>
                                </a>

                            </div>
                            <div className='buttons'>
                                <a href="/actividades" className={`linksMenu ${actividades}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <MdAssignmentTurnedIn />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Actividades
                                        </motion.p>
                                    </motion.div>
                                </a>
                            </div>
                            <div className='buttons'>
                                <a href="/AgregarUsuario" className={`linksMenu`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <AiOutlineUserAdd />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .8 }} className={classLinks}>
                                            Agregar Usuarios
                                        </motion.p>
                                    </motion.div>
                                </a>
                            </div>
                            <div className='buttons'>
                                <a href="/ajustes" className={`linksMenu ${ajustes}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                        <IconContext.Provider value={{ className: "svgMenu" }}>
                                            <GrUserSettings />
                                        </IconContext.Provider>
                                        <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                            Ajustes
                                        </motion.p>
                                    </motion.div>
                                </a>
                            </div>
                        </div>
                        <div onClick={() => handleShowExit()} className={`logout buttons ${mobile}`}>
                            <p className={`linksMenu closeSesion ${mobile}`}>
                                <motion.div whileHover={{ scale: 1.1 }} className='containerLink'>
                                    <IconContext.Provider value={{ className: "svgMenu" }}>
                                        <IoLogOutOutline />
                                    </IconContext.Provider>
                                    <motion.p animate={open ? linkClose : linkOpen} transition={{ duration: .5 }} className={classLinks}>
                                        Cerrar Sesión
                                    </motion.p>
                                </motion.div>
                            </p>
                        </div>
                    </AnimatePresence>
                </div>
                <Exit exitEmer={exitEmer} onCancel={handleCancel} />

            </div>
        </>
    )
}
