import React, { useState } from 'react'
import '../css/Menu.css'
import Exit from './Exit'
import { motion } from 'framer-motion'

export default function Menu({ btIni, btPlani, btMateria, btSeccion, btActividades, btProfesores }) {

    const [open, setOpen] = useState(null)
    const [classLinks, setClassLinks] = useState('')
    const [displayMenu, setDisplayMenu] = useState('')
    const [exitEmer, setExitEmer] = useState(null)
    const ini = btIni
    const plani = btPlani
    const materia = btMateria
    const seccion = btSeccion
    const actividades = btActividades
    const profesores = btProfesores

    async function openMenu() {
        if (open === null) {
            setOpen(true)
            setDisplayMenu('openMenu')
            setClassLinks('closeLinks')
            console.log('open')
        } else {
            if (open === true) {
                setOpen(null)
                setDisplayMenu('')
                setClassLinks('')
                console.log('close')
            }
        }



    }

    function handleShowExit() {
        setExitEmer(true)
    }

    function handleCancel() {
        setExitEmer(false)
        console.log('hola')
    }

    return (
        <>
            <div className={`menu ${displayMenu}`}
                initial={{ width: "5%" }}
                animate={{ width: "30%" }}
                transition={{ duration: .6 }}>
                <div className='btOpen'>
                    <motion.button className='btMenu' onClick={() => openMenu()} whileHover={{ scale: 1.2 }}>
                        <motion.svg whileHover={{ color: "green" }} xmlns="http://www.w3.org/2000/svg" width="2.5vw" height="2.5vw" fillRule="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </motion.svg>
                    </motion.button>
                </div>
                <div className='linksOrder'>

                    <div className='linksDirector'>
                        <div className='buttons'>
                            <a href="/" className={`linksMenu ${ini}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                    <p className={classLinks}>
                                        Inicio
                                    </p>
                                </motion.div>
                            </a>
                        </div>
                        <div className='buttons'>
                            <a href="/calendario" className={`linksMenu ${plani}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                    </svg>
                                    <p className={classLinks}>
                                        Planificación
                                    </p>
                                </motion.div>
                            </a>
                        </div>
                        <div className='buttons'>
                            <a href="/profesores" className={`linksMenu ${profesores}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                    </svg>
                                    <p className={classLinks}>Profesores</p>
                                </motion.div>
                            </a>

                        </div>
                        <div className='buttons'>
                            <a href="/materias" className={`linksMenu ${materia}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-list-check" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                                    </svg>
                                    <p className={classLinks}>
                                        Materias
                                    </p>
                                </motion.div>
                            </a>
                        </div>
                        <div className='buttons'>
                            <a href="/secciones" className={`linksMenu ${seccion}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-columns-gap" viewBox="0 0 16 16">
                                        <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
                                    </svg>
                                    <p className={classLinks}>
                                        Secciones
                                    </p>
                                </motion.div>
                            </a>

                        </div>
                        <div className='buttons'>
                            <a href="/actividades" className={`linksMenu ${actividades}`}>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                    </svg>
                                    <p className={classLinks}>
                                        Actividades
                                    </p>
                                </motion.div>
                            </a>
                        </div>
                    </div>
                    <div onClick={() => handleShowExit()} className='buttons'>
                        <motion.div className='linksMenu' whileHover={{ scale: 1.1 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fillRule="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                            <p className={classLinks}>Cerrar Sesión</p>
                        </motion.div>
                    </div>
                </div>
                <Exit exitEmer={exitEmer} onCancel={handleCancel} />

            </div>
        </>
    )
}
