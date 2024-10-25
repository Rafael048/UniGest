import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/Calendar.css'
import { motion, AnimatePresence } from 'framer-motion'


export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [isBlur, SetIsBlur] = useState(false)
    const [noDisplay, setNoDisplay] = useState(false)
    const [eventClicked, setEventClicked] = useState(null)
    const [filter, setFilter] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [openFiltrer, setOpenFiltrer] = useState(false)
    const [animation, setAnimation] = useState('')
    const [animationDescription, setAnimationDescription] = useState('')
    const [openDescription, setOpenDescription] = useState(true)


    useEffect(() => {

        async function getEvents() {
            await axios.get('http://localhost:3000/apms')
                .then(async (result) => {
                    const materiasRes = await axios.get('http://localhost:3000/materias');
                    setMaterias(materiasRes.data.body);
                    const profesoresRes = await axios.get('http://localhost:3000/profesores')
                    setProfesores(profesoresRes.data.body)
                    let arrTemp = []
                    let arrSubjectsFilter = []

                    if (filter.length !== 0) {
                        arrSubjectsFilter = result.data.body.filter(evento =>
                            filter.includes(evento.materia)|| filter.includes(evento.profesor)
                        );
                    } else {
                        arrSubjectsFilter = result.data.body;
                    }
                    arrSubjectsFilter.forEach((item) => {
                        const date = new Date(item.date)
                        const dateDay = date.getDay()
                        let dateEvent = undefined
                        if (dateDay === item.diaClase) {
                            const nuevaFecha = new Date(item.date)
                            nuevaFecha.setDate(date.getDate() - 1)
                            const nuevaFechaISO = nuevaFecha.toISOString().slice(0, 10).replace('T', '')
                            dateEvent = nuevaFechaISO;
                        } else {
                            let diferencia = item.diaClase - dateDay
                            if (diferencia <= 1) {
                                diferencia = diferencia + 6;
                            }

                            const nuevaFecha = new Date(item.date);
                            nuevaFecha.setDate(date.getDate() + diferencia);
                            const nuevaFechaISO = nuevaFecha.toISOString().slice(0, 10).replace('T', '')
                            dateEvent = nuevaFechaISO
                        }

                        let eventTemp = {
                            title: item.title,
                            date: dateEvent,
                            extendedProps: {
                                descripcion: item.descripcion,
                                profesor: item.profesor,
                                materia: item.materia,
                                seccion: item.seccion
                            }
                        }
                        arrTemp.push(eventTemp)
                    })
                    setEvents(arrTemp)
                }).catch((err) => {
                    console.log(err)
                });
        }
        getEvents()
    }, [filter])

    function openFiltrerForm() {
        if (openFiltrer === true) {
            setAnimation('animation')
            setTimeout(() => {
                setOpenFiltrer(false)
            }, 500);
        } else {
            setOpenFiltrer(true)
            setAnimation('')
        }
    }

    const handleEventClick = (arg) => {
        setEventClicked(arg.event)
        SetIsBlur(true)
        setNoDisplay(false)
        setAnimationDescription('')
        setOpenDescription(true)
    }
    const handleDivClick = () => {
        if (animationDescription === '') {
            setAnimationDescription('animation')
            setTimeout(() => {
                SetIsBlur(false)
                setNoDisplay(true)
                setOpenDescription(false)
            }, 350);
        }
    }
    function handleFilterChange(e) {
        const { value, checked } = e.target
        setFilter(prevState => {
            if (checked) {
                return [...prevState, value]
            } else {
                return prevState.filter(materia => materia !== value)
            }
        });
    }

    return (
        <section className='viewAllCalendar'>

            <section className='calendarSection'>
                <div className={isBlur ? 'Blur calendarView ' : 'calendarView    '}>
                    <motion.input type='button' className='buttonFiltrer' onClick={openFiltrerForm} value={'Filtrar'}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                    />
                    <FullCalendar
                        aspectRatio={2.1}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        eventClick={handleEventClick}
                        events={events}
                    />
                </div>

            </section>
            {eventClicked ?
                <div className={noDisplay ? 'hide' : 'show'}>
                    <AnimatePresence>
                        {
                            openDescription && (
                                <motion.div className={`bg-event ${animationDescription}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>

                                    <div className='cardDescription'>
                                        <h2 className='titleDescription'>
                                            {eventClicked.title}
                                        </h2>
                                        <p className='descriptionActivities'>
                                            Profesor: {eventClicked.extendedProps.profesor}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Materia: {eventClicked.extendedProps.materia}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Seccion: {eventClicked.extendedProps.seccion}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Descripcion {eventClicked.extendedProps.descripcion}
                                        </p>
                                    </div>
                                    <div className='buttonCancelDescription'>
                                        <motion.button whileHover={{scale:.9, backgroundColor:"white", border:"2px solid #00255c", color:"#00255c"}} onClick={() => handleDivClick()} className='buttonClose'>Cerrar</motion.button>
                                    </div>
                                </motion.div>
                            )}

                    </AnimatePresence>
                </div>
                :
                null
            }
            <AnimatePresence>
                {
                    openFiltrer && (
                        <div className={`filtrerForm`}>
                            <motion.div className={`containFiltrer ${animation}`}
                                initial={{ x: "-50vw", opacity: 0 }}
                                animate={{ x: "0vw", opacity: 1 }}
                            >
                                <form className='listChecked'>
                                    <div className='listFiltrer'>
                                        <div>

                                        <h3>Filtrar por materias</h3>
                                        {materias.map((materia) => (
                                            <label key={materia.id} className='inputCheckbox'>
                                                <input
                                                    type="checkbox"
                                                    value={materia.nombre}
                                                    onChange={handleFilterChange}
                                                    checked={filter.includes(materia.nombre)}
                                                    className='inputChecked'
                                                />
                                                {materia.nombre}
                                            </label>
                                        ))}
                                        </div>
                                        <div>
                                        <h3>Filtrar por Profesor</h3>
                                         {profesores.map((profesor) => (
                                            <label key={profesor.id} className='inputCheckbox'>
                                                <input
                                                    type="checkbox"
                                                    value={profesor.nombre}
                                                    onChange={handleFilterChange}
                                                    checked={filter.includes(profesor.nombre)}
                                                    className='inputChecked'
                                                />
                                                {profesor.nombre}
                                            </label>
                                        ))}
                                        </div>
                                    </div>
                                    <motion.input whileHover={{scale:.9, backgroundColor:"white", border:"2px solid #00255c", color:"#00255c"}} type='button' className='aceptButtonFiltrer' onClick={openFiltrerForm} value={'Aceptar'} />
                                </form>
                            </motion.div>
                        </div>
                    )}
            </AnimatePresence>

        </section>
    )
}