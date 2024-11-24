import React, { useEffect, useState } from "react";
import logoSolo from '../assets/logoSolo.png'
import '../css/FormAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import ErrorEmpty from "./ErrorEmpty";
const idCookie = Cookies.get('id')
export default function FormAdd(props) {
  const [errorEmpty, setErrorEmpty] = useState(false)
  const [units, setUnits] = useState([])
  function handlecancel() {
    if (errorEmpty === false) {
      setErrorEmpty(true)
      console.log(errorEmpty)
    } else {
      setErrorEmpty(false)
      console.log(errorEmpty)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let obj = {}
    props.propiedades.forEach((element) => {
      const key = element.split(" ")[1]
      obj[key] = e.target[key].value
    })
    if(props.uri==="unidades"){
      if(obj.unidad.trim()===" "||obj.tema.trim()===" "){
        handlecancel()
      }else{
        obj.idClase = Cookies.get('id')
        await axios.post(`http://localhost:3000/unidades/agregar`,obj)
        .then(() => {
          Cookies.remove('id')
          window.location.replace(`/asignaturas`)

        }).catch((err) => {
          console.log(err)

        });
      }
    }
    if (props.uri === 'materias') {
      if ((obj.nombre.trim() === '' || obj.dia.trim() === '')) {
        handlecancel()
      } else {
        await axios.post(`http://localhost:3000/${props.uri}/agregar`, obj)
          .then((result) => {
            console.log(result)
            window.location.replace(`/${props.uri}`)
          }).catch((err) => {
            console.log(err)
          });
      }
    }
    if (props.uri === 'secciones') {
      if ((obj.nombre.trim() === '' || obj.periodo.trim() === '')) {
        handlecancel()
      } else {
        await axios.post(`http://localhost:3000/${props.uri}/agregar`, obj)
          .then((result) => {
            console.log(result)
            window.location.replace(`/${props.uri}`)
          }).catch((err) => {
            console.log(err)
          });
      }
    }
    if (props.uri === 'actividades') {
      if ((obj.nombre.trim() === '' || obj.descripcion.trim() === '' || obj.semana.trim() === '')) {
        handlecancel()
      } else {
        if (props.uri === "actividades") {
          obj.creador = user.id
        }
        await axios.post(`http://localhost:3000/${props.uri}/agregar`, obj)
          .then(() => {
              window.location.replace(`/${props.uri}`)
          }).catch((err) => {
            console.log(err)
          });
      }
    }
    if (props.uri === 'actividades&units') {
      if ((obj.nombre.trim() === '' || obj.descripcion.trim() === '' || obj.semana.trim() === '')) {
        handlecancel()
      } else {
        if (props.uri === "actividades&units") {
          obj.creador = user.id
        }
        await axios.post(`http://localhost:3000/actividades/agregar`, obj)
          .then((result) => {
            if(idCookie){
              async function asingActivitie() {
                let objAPMS = {
                  idActividades : result.data.create,
                  idPMS : Number(idCookie),
                  idUnidad : Number(e.target.unidad.value)
                }
                await axios.post(`http://localhost:3000/apms/agregar`,objAPMS)
                .then(() => {
                  window.location.replace(`/planificacion`)

                }).catch((e) => {
                  console.log(e)
                });
              }
              asingActivitie()
            }else{ 
              window.location.replace(`/${props.uri}`)
                }
          }).catch((err) => {
            console.log(err)
          });
      }
    }
    if(props.uri==="eventos"){
      if ((obj.nombre.trim() === '' || obj.lugar.trim() === '' || obj.fecha.trim() == '')){
        handlecancel()
      }else{
        await axios.post(`http://localhost:3000/${props.uri}/agregar`, obj)
        .then(() => {
            window.location.replace(`/${props.uri}`)
        }).catch((err) => {
          console.log(err)
        });
      }
    }

 
  }
  const token = Cookies.get('jwt')
  const [active, setActive] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getData(token) {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setUser(result.data.user)
          setActive(result.data.user.rol)
          if(idCookie){
            async function getUnits() {
              await axios.get(`http://localhost:3000/unidades/Uno/${idCookie}`)
              .then((result) => {
                setUnits(result.data.body)
              }).catch((e) => {
                console.log(e)
              });
            }
            getUnits()
            }
        })
        .catch((err) => {
          console.log(err)
          window.location.replace('/Error401')

        })
    }
    getData(token)
  }, [token])

  return (
    <div className="formMain">
      {
        active === 'Director' ?
          <div className="mainDirector">
            <form onSubmit={(e) => handleSubmit(e)} className='formDirectorAdd'>
              {props.uri==="actividades&units"?
              <label className='activities'> Actividades </label>
                :
              <label className='activities'> {props.uri.charAt(0).toUpperCase() + props.uri.slice(1)} </label>
            }
              {props.propiedades.map((element, index) => (
                <div className='divAdd' key={index}>
                  {
                    element.split(" ")[1] === "periodo" || element.split(" ")[1] === "fecha"  ?
                      <input autoComplete="off" required type="date" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                      :
                    element.split(" ")[1] === "hora" ?
                    <input autoComplete="off" required type="time" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd'/>
                    :
                      <input autoComplete="off" required type="text" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                  }
                </div>
              ))}
              <motion.input whileHover={{ scale: .9, backgroundColor: "#008000" }} required type="submit" value={'Agregar'} className="submitAdd" name="" />
            </form>
            {
              errorEmpty ?
                <ErrorEmpty onCancel={handlecancel} />
                : null
            }
          </div> :
          <div className='formAll'>
            <div className='logoAdd'>
              <img src={logoSolo} alt="" width="100%" />
              <h1>UniGest</h1>
            </div>
            <div className="schemaForm">
              <div className="titleFormAdd">
              {props.uri==="actividades&units"?
              <label className='activities'> Actividades </label>
                :
              <label className='activities'> {props.uri.charAt(0).toUpperCase() + props.uri.slice(1)} </label>
            }
              </div>
              <form onSubmit={(e) => handleSubmit(e)} className='formAdd'>
                {props.propiedades.map((element, index) => (
                  <div className='divAdd' key={index}>
                    {
                    element.split(" ")[1] === "periodo" || element.split(" ")[1] === "fecha"  ?
                    <input autoComplete="off" required type="date" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                        :
                        element.split(" ")[1] === "hora" ?
                    <input autoComplete="off" required type="time" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd'/>
                    :
                    element.split(" ")[1] === "porcentaje" || element.split(" ")[1] === "unidad" ? 
                    <input autoComplete="off" required type="number" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd'/>
                    :
                      <input autoComplete="off" required type="text" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                    }
                  </div>
                ))}
                {idCookie&&props.uri==="actividades&units"?
                <>
                  <label className='nameAsing'>Unidad</label>
                {
                  units.length>0?
                   <select name="unidad" className='sectionAsing'>
                       {
                           units.map((element, index) => (
                               <option key={index} value={element.id}>{element.unidad + " " + element.tema}</option>
                           ))
                       }
                   </select>
                    :
                   <div>
                       <p className='notClas'>No hay unidades para esta clase</p>
                   </div>
                
                }  
                </>
                :
                null
              }
                <motion.input whileHover={{ scale: .9, backgroundColor: "#008000" }} required type="submit" value={'Agregar'} className="submitAdd" name="" />
              </form>
            </div>
            {
              errorEmpty ?
                <ErrorEmpty onCancel={handlecancel} />
                : null
            }

          </div>

      }
    </div>

  )
}
