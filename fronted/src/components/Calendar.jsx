import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import esLocale from '@fullcalendar/core/locales/es';
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
    const [filterProfessor, setFilterProfessor] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [openFiltrer, setOpenFiltrer] = useState(false)
    const [animation, setAnimation] = useState('')
    const [animationDescription, setAnimationDescription] = useState('')
    const [openDescription, setOpenDescription] = useState(true)
    const [eventDirector, setEventDirector] = useState([])
    const [fullEvents, setFullEvents] = useState([])


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

                    if (filter.length !== 0 && filterProfessor.length !== 0) {
                        arrSubjectsFilter = result.data.body.filter(evento =>
                            filter.includes(evento.materia) && filterProfessor.includes(evento.profesor)
                        )
                    } else if (filter.length !== 0) {
                        arrSubjectsFilter = result.data.body.filter(evento =>
                            filter.includes(evento.materia)
                        );
                    } else if (filterProfessor.length !== 0) {
                        arrSubjectsFilter = result.data.body.filter(evento =>
                            filterProfessor.includes(evento.profesor)
                        );
                    } else {
                        arrSubjectsFilter = result.data.body;
                    }
                    arrSubjectsFilter.forEach((item) => {
                        const date = new Date(item.date)
                        const dateDay = date.getDay()
                        let dateEvent = undefined
                        let diferencia = item.diaClase - dateDay
                        let ajusted = false
                        if (dateDay === item.diaClase) {
                            const nuevaFecha = new Date(item.date)
                            nuevaFecha.setDate(date.getDate() - 1)
                            const nuevaFechaISO = nuevaFecha.toISOString().slice(0, 10).replace('T', '')
                            dateEvent = nuevaFechaISO;
                        } else {
                            console.log(diferencia)
                            if (diferencia <= 0) {
                                diferencia = diferencia + 7;
                                ajusted = true
                            }

                            const nuevaFecha = new Date(item.date);
                            if (ajusted) {
                                nuevaFecha.setDate(date.getDate() + diferencia - 1);
                            } else {
                                nuevaFecha.setDate(date.getDate() + (diferencia - 1));
                            }
                            const nuevaFechaISO = nuevaFecha.toISOString().slice(0, 10).replace('T', '')
                            dateEvent = nuevaFechaISO
                        }
                        if (dateEvent < item.date) {
                            const nuevaFecha = new Date(item.date);
                            nuevaFecha.setDate(date.getDate() + 6);
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
                                seccion: item.seccion,
                                unidad: item.unidad,
                                tema : item.tema,
                                hora : item.Hora,
                                porcentaje : item.porcentaje
                            }
                        }
                        arrTemp.push(eventTemp)
                    })
                    setEvents(arrTemp)
                }).catch((err) => {
                    console.log(err)
                });
        }
    async function getEventsDirectors() {
        await axios.get('http://localhost:3000/eventos')
        .then((result) => {
            let arrTemp = []
            console.log(result.data.body)
            result.data.body.forEach((result)=>{
                let eventDate = new Date(result.fecha) 
                let eventDirectorFormat = {
                    title: result.nombre,
                    date: eventDate.toISOString().slice(0, 10).replace('T', ''),
                    extendedProps: {
                        lugar : result.lugar,
                        descripcion: result.descripcion,
                        type : "event"
                    }
                }
                arrTemp.push(eventDirectorFormat)
            })
            setEventDirector(arrTemp)
        }).catch((e) => {
            console.log(e)
        });
    }
        getEventsDirectors()
        getEvents()
    }, [filter, filterProfessor])
    useEffect(()=>{
        setFullEvents([...eventDirector,...events])
    },[eventDirector,events])
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
        const { value, checked, name } = e.target
        if (name === "materias") {
            setFilter(prevState => {
                if (checked) {
                    return [...prevState, value]
                } else {
                    return prevState.filter(materia => materia !== value)
                }
            });
        } else {
            setFilterProfessor(prevState => {
                if (checked) {
                    return [...prevState, value]
                } else {
                    return prevState.filter(profesor => profesor !== value)
                }
            })
        }
    }

    return (
        <section className='viewAllCalendar'>

            <section className='calendarSection'>
                <div className={isBlur ? 'Blur calendarView ' : 'calendarView    '}>
                    <div className='divFiltrerButton'>
                        <motion.input type='button' className='buttonFiltrer' onClick={openFiltrerForm} value={'Filtrar'}
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                        />
                    </div>
                    <FullCalendar
                        
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        eventClick={handleEventClick}
                        events={fullEvents}
                        locale={esLocale}
                    />
                </div>

            </section>
            {eventClicked ?
                <div className={noDisplay ? 'hide' : 'show'}>
                    <AnimatePresence>
                        {
                            openDescription && (
                                <motion.div className={`bg-event ${animationDescription}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                    {
                                        eventClicked.extendedProps.type==="event"?
                                        <div className='cardDescription'>
                                        <h2 className='titleDescription'>
                                            {eventClicked.title}
                                        </h2>
                                        <p className='descriptionActivities'>
                                            Lugar: {eventClicked.extendedProps.lugar}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Descripcion: {eventClicked.extendedProps.descripcion}
                                        </p>
                                        </div>
                                        :

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
                                            Descripcion: {eventClicked.extendedProps.descripcion}
                                        </p>
                                        <p className='descriptionActivities'>
                                            {eventClicked.extendedProps.unidad}: {eventClicked.extendedProps.tema}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Hora de Entrega : {eventClicked.extendedProps.hora}
                                        </p>
                                        <p className='descriptionActivities'>
                                            Porcentaje de Evaluacion : {eventClicked.extendedProps.porcentaje}%
                                        </p>
                                    </div>
                                    }
                                    <div className='buttonCancelDescription'>
                                        <motion.button whileHover={{ scale: .9, backgroundColor: "#ffff", border: "2px solid #00255c", color: "#00255c" }} onClick={() => handleDivClick()} className='buttonClose' id="testButtonClose">Cerrar</motion.button>
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
                                        <div className='listAll'>

                                            <h3 className='titleFiltrer'>Filtrar por materias</h3>
                                            {materias.map((materia) => (
                                                <label key={materia.id} className='inputCheckbox'>
                                                    <input
                                                        type="checkbox"
                                                        value={materia.nombre}
                                                        onChange={handleFilterChange}
                                                        checked={filter.includes(materia.nombre)}
                                                        className='inputChecked'
                                                        name='materias'
                                                    />
                                                    {materia.nombre}
                                                </label>
                                            ))}
                                        </div>
                                        <div className='listAll'>
                                            <h3 className='titleFiltrer'>Filtrar por Profesor</h3>
                                            {profesores.map((profesor) => (
                                                <label key={profesor.id} className='inputCheckbox'>
                                                    <input
                                                        type="checkbox"
                                                        value={profesor.nombre}
                                                        onChange={handleFilterChange}
                                                        checked={filterProfessor.includes(profesor.nombre)}
                                                        className='inputChecked'
                                                        name='profesores'
                                                    />
                                                    {profesor.nombre+ " " + profesor.apellido}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <motion.input whileHover={{ scale: .9, backgroundColor: "#ffff", border: "2px solid #00255c", color: "#00255c" }} type='button' className='aceptButtonFiltrer' onClick={openFiltrerForm} value={'Aceptar'} />
                                </form>
                            </motion.div>
                        </div>
                    )}
            </AnimatePresence>
        </section>
    )
}