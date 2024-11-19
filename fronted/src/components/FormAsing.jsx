import React, { useEffect, useState } from 'react'
import '../css/FormAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
export default function FormAsing() {
    const [sections, setSections] = useState([])
    const [subjects, setSubjects] = useState([])
    const [user, setUser] = useState({})
    const [PMS, setPMS] = useState([])
    const [units, setUnits] = useState([])
    const [filterUnits, setFilterUnits] = useState([])
    const [loading, setLoading] = useState(true)

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
                    idPMS: mat_sec.value,
                    idUnidad: e.target.unidad.value
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
    function changeUnits(e,firts){
        let idPMS = null
        if(firts){
            console.log(e.id)
            idPMS = e.id 
        }else{
            idPMS = e.target.value
        }
        let filter = []
     units.forEach((element)=>{
            if(Number(element.idClase)===Number(idPMS)){
                filter.push(element)
            }
        })
        setFilterUnits(filter)
        console.log(filterUnits)

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
                setLoading(false)
        }

        async function getDataProfessor() {
            await axios.get(`http://localhost:3000/pms?cedula=${user.cedula}`)
                .then(async(result) => {
                    setPMS(result.data.body);
                    await axios.get(`http://localhost:3000/unidades`)
                    .then((result2) => {
                        setUnits(result2.data.body)
                        let filter = result2.data.body.filter((element)=>(
                            element.idClase===result.data.body[0].id
                        ))
                        setFilterUnits(filter)
                        setLoading(false)

                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)

                    });
                }).catch((err) => {
                    console.log(err);
                    setLoading(false)

                });
        }



        if (user.rol === "Director") {
            getDataDirector();
        } else if (user.rol === "Profesor") {
            getDataProfessor();
        }


    }, [user]);
    return (
        <>
        {loading?
            <div>Cargando...</div>
            :

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
                                <select name="materia_seccion" className='sectionAsing' onChange={(e)=>changeUnits(e)}>
                                    {
                                        PMS.map((element, index) => (
                                            <option key={index} value={element.id}>{element.Materias_Secciones}</option>
                                        ))
                                    }
                                </select>
                            }
                             <label className='nameAsing'>Unidad</label>
                             {
                                filterUnits.length <= 0 ?
                                <div>
                                    <p className='notClas'>No hay clases disponibles</p>
                                </div>
                                :
                                <select name="unidad" className='sectionAsing'>
                                    {
                                        filterUnits.map((element, index) => (
                                            <option key={index} value={element.id}>{element.unidad + " " + element.tematica}</option>
                                        ))
                                    }
                                </select>
                             }
                        </div>}
                </div>
                <input type="submit" value={'Agregar'} className="submitAdd" name="" />
            </form>
        </div>
        }
        
        </>
    )
}