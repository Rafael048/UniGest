import React, { useEffect, useState } from "react";
import logoSolo from '../assets/logoSolo.png'
import '../css/FormAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import ErrorEmpty from "./ErrorEmpty";
export default function FormAdd(props) {
  const [errorEmpty, setErrorEmpty] = useState(false)

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
    console.log(obj)

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
          .then((result) => {
            console.log(result)
            window.location.replace(`/${props.uri}`)
          }).catch((err) => {
            console.log(err)
          });
      }
    }

    {/**
      if ((obj.nombre.trim() === '' || obj.descripcion.trim() === '' || obj.semana.trim() === '')) {
        handlecancel()
      } else {
        if (props.uri === "actividades") {
        obj.creador = user.id
      }
      await axios.post(`http://localhost:3000/${props.uri}/agregar`, obj)
        .then((result) => {
          console.log(result)
          window.location.replace(`/${props.uri}`)
        }).catch((err) => {
          console.log(err)
        });
        
      }
      */}
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
              <label className='activities'> {props.uri.charAt(0).toUpperCase() + props.uri.slice(1)} </label>
              {props.propiedades.map((element, index) => (
                <div className='divAdd' key={index}>
                  {
                    element.split(" ")[1] === "periodo" ?
                      <input autoComplete="off" required type="date" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
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
                <label className='activities'> {props.uri.charAt(0).toUpperCase() + props.uri.slice(1)} </label>
              </div>
              <form onSubmit={(e) => handleSubmit(e)} className='formAdd'>
                {props.propiedades.map((element, index) => (
                  <div className='divAdd' key={index}>
                    {
                      element.split(" ")[1] === "periodo" ?
                        <input autoComplete="off" required type="date" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                        :
                        <input autoComplete="off" required type="text" placeholder={`Ingresa ${element}`} name={element.split(" ")[1]} className='inputAdd' />
                    }
                  </div>
                ))}
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
