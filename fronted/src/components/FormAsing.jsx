import React, { useEffect, useState } from 'react'
import '../css/FormAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
export default function FormAsing() {
    const [sections, setSections] = useState([])
    const [subjects, setSubjects] = useState([])
    const [user, setUser] = useState({})
    const [PMS, setPMS] = useState([])
    const name = Cookies.get('name')
    const id = Cookies.get('id')
    const token = Cookies.get('jwt')
    async function handleSubmit(e) {
        e.preventDefault()
        if (user.rol === "Profesor") {
            const mat_sec = e.target.materia_seccion
            if (mat_sec === undefined) {
                alert('error')
            } else {
                const data = {
                    idActividades: id,
                    idPMS: mat_sec.value
                }
                await axios.post('http://localhost:3000/apms/agregar', data)
                    .then((result) => {
                        console.log(result)
                        window.location.replace('/actividades')
                    }).catch((err) => {
                        console.log(err)
                    });
            }
        } else {
            const materia = e.target.materia.value
            const seccion = e.target.seccion.value
            const data = {
                idProfesor: id,
                idMaterias: materia,
                idSecciones: seccion
            }
            await axios.post('http://localhost:3000/pms/agregar', data)
                .then((result) => {
                    console.log(result)
                    window.location.replace('/profesores')
                }).catch((err) => {
                    console.log(err)
                });
        }
        Cookies.remove('name')
        Cookies.remove('id')

    }
    useEffect(() => {
        async function getUser(token) {
            await axios.get(`http://localhost:3000/verify/${token}`)
                .then((result) => {
                    setUser(result.data.user)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUser(token)
    }, [token])
    useEffect(() => {
        async function getDataDirector() {
            await axios.get('http://localhost:3000/materias')
                .then((materias) => {
                    console.log(materias.data.body);
                    setSubjects(materias.data.body);
                }).catch((err) => {
                    console.log(err);
                });

            await axios.get('http://localhost:3000/secciones')
                .then((secciones) => {
                    setSections(secciones.data.body);
                }).catch((err) => {
                    console.log(err);
                });
        }

        async function getDataProfessor() {
            await axios.get(`http://localhost:3000/pms?cedula=${user.cedula}`)
                .then((result) => {
                    console.log(result)
                    setPMS(result.data.body);
                }).catch((err) => {
                    console.log(err);
                });
        }



        if (user.rol === "Director") {
            getDataDirector();
        } else if (user.rol === "Profesor") {
            getDataProfessor();
        }


    }, [user]);
    return (
        <div className='allForm'>
            <form onSubmit={(e) => handleSubmit(e)} className='formAsigProfesor'>
                <label className='activities'> Asignar a {name} </label>
                <div className='divAsing'>
                    {user.rol === "Director" ?
                        <>
                            <div className='inputAsig'>
                                <label className='nameAsing'>Materia</label>
                                {subjects.length <= 0 ?
                                    <div>
                                        <p>No hay materias disponibles</p>
                                    </div>
                                    :
                                    <select name="materia" className='materiaAsing'>
                                        {
                                            subjects.map((subject, index) => (
                                                <option key={index} value={subject.id}>{subject.nombre}</option>
                                            ))
                                        }
                                    </select>
                                }
                            </div>
                            <div className='inputAsig'>
                                <label className='nameAsing'>Seccion</label>

                                {sections.length <= 0 ?
                                    <div>
                                        <p className='notClas'>No hay secciones disponibles</p>
                                    </div>
                                    :
                                    <select name="seccion" className='sectionAsing'>
                                        {
                                            sections.map((section, index) => (
                                                <option key={index} value={section.id}>{section.nombre}</option>
                                            ))
                                        }
                                    </select>
                                }
                            </div>
                        </>
                        :

                        <div className='inputAsig'>

                            <label className='nameAsing'>Clase</label>
                            {PMS.length <= 0 ?
                                <div>
                                    <p className='notClas'>No hay clases disponibles</p>
                                </div>
                                :
                                <select name="materia_seccion" className='sectionAsing'>
                                    {
                                        PMS.map((element, index) => (
                                            <option key={index} value={element.id}>{element.Materias_Secciones}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>}
                </div>
                <input type="submit" value={'Agregar'} className="submitAdd" name="" />
            </form>
        </div>
    )
}