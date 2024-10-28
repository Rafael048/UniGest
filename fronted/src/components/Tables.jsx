import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../css/Tables.css'
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
import SearchNull from "./SearchNull";

export default function Tables(props) {
  const [data, setData] = useState([])
  const [propertyName, setPropertyName] = useState([])
  const [nextData, setNextData] = useState([])
  const [previusData, setPreviusData] = useState([])
  const [allData, setAllData] = useState([])
  const [clicked, setClicked] = useState(false)
  const [role, setRole] = useState(null)
  const [showSearch, setShowSearch] = useState('showButton')
  const [showX, setShowX] = useState('notShowButton')
  const [warning, setWarning] = useState(null)
  const [idDelete, setIdDelete] = useState(null)
  const token = Cookies.get('jwt')
  const [searchNull, setSearchNull] = useState(false)
  const [animateAviso, setAnimateAviso] = useState(false)
  const [user, setUser]= useState(null)
  function handleShowWarning(item) {
    setIdDelete(item)
    setWarning(true)
  }

  function handleCancel() {
    setWarning(false)
  }



  function getNextData() {
    if (nextData.length > 0) {
      setPreviusData([...previusData, ...data]);
      setData(nextData.slice(0, 5));
      setNextData(nextData.slice(5));
    }

  }
  function getPreviusData() {
    if (previusData.length > 0) {
      setNextData([...data, ...nextData])
      const previousSlice = previusData.slice(-5)
      setData(previousSlice)
      setPreviusData(previusData.slice(0, -5))
    }
  }

  function getOneElement(e) {
    e.preventDefault()
    setClicked(true)
    let element = e.target.element.value
    let arrTemp = []
    arrTemp.push(allData.find((elements) => {
      return Number(elements.id) === Number(element)
    }))
    if (arrTemp[0] === undefined) {
      setSearchNull(true)
      setAnimateAviso(true)
    } else {
      setShowSearch('notShowButton')
      setData(arrTemp)
      setShowX('showButton')
    }
  }

  function handleCancelError() {
    setAnimateAviso(false)
    setTimeout(() => {
      setSearchNull(false)
    }, 400);
  }

  function getClicked() {
    if (clicked) {
      setData(allData.slice(0, 5))
      setClicked(false)
    } else {
      setClicked(true)
    }
    setShowSearch('showButton')
    setShowX('notShowButton')
  }
  async function deleteElement(item) {
    console.log(item.id)
    let id = item.id
    await axios.delete(`http://localhost:3000/${props.uri}/eliminar/${id}`)
      .then(() => {
        window.location.reload()
      }).catch((err) => {
        console.log(err)
      });
  }
  async function handleAsing(name) {
    Cookies.set('name', name[0])
    Cookies.set('id', name[1])
    Cookies.set('uri', props.uri)
    if (role === "Profesor") {
      window.location.href = `/AsignarActividad`
    } else if (role === "Director") {
      window.location.replace('/AsignarProfesor')
    }
  }
  function handleModify(item) {
    if (props.uri === "profesores") {
      Cookies.set('cedula', item.cedula)
    }
    console.log(item)
    Cookies.set('id', item.id)
    Cookies.set('name', item.nombre)

    window.location.replace(`/Modificar${props.uri}`)

  }
  useEffect(()=>{
    async function verify() {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setRole(result.data.user.rol)
          setUser(result.data.user)
        }).catch((err) => {
          console.log(err)
        });
    }
    verify()
  },[token])
  useEffect(() => {
    async function getData() {
        
        await axios.get(`http://localhost:3000/${props.uri}`)
          .then((result) => {
  
              if(props.uri==="actividades"&&role==="Profesor"){
                let filter = result.data.body.filter((creador)=>{
                 return creador.creador===user.userName
                })
                  setData(filter.slice(0, 5))
                   setAllData(filter)
                 setPropertyName(Object.getOwnPropertyNames(filter[0]))
                  if (filter.length > 5) {
                  setNextData(filter.slice(5))
                  }
                }else{
                setData(result.data.body.slice(0, 5))
                setAllData(result.data.body)
                setPropertyName(Object.getOwnPropertyNames(result.data.body[0]))
                if (result.data.body.length > 5) {
                  setNextData(result.data.body.slice(5))
                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
    }
   
    getData()
  }, [props.uri,role,user ])
  return (
    <>
      <div className="center">
        <div className="headTable">
          <h1 className="titleTable">
            {props.uri}
          </h1>
          <div className="addSearch">
            <form onSubmit={(e) => getOneElement(e)} className="formtable">
              <label className="searchButton">Buscar</label>
              <div className="search">
                <input type="number" name="element" placeholder="ID" className="inputSearch" />
                <button type="submit" className={`tableButton ${showSearch}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.752 10.355a6.5 6.5 0 1 0-1.397 1.398h-.001q.055.06.098.115l3.85 3.85a1 1 0 0 0 1.515-1.515l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
                <div className={`tablebutton ${showX}`}>
                  <svg onClick={() => getClicked()} xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
              </div>
            </form>
            {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ? <motion.button onClick={() => window.location.replace(`/Agregar${props.uri}`)} className="addButton" whileHover={{ scale: 1.2, backgroundColor: "green" }}>
              Agregar
            </motion.button> : null}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {propertyName.length<1?<th>No se han ingresado elementos</th>:
              <>
              {propertyName.map((property, index) => (
                <th key={index}>
                  {property}
                </th>

              ))}
              {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ? <th>Accion</th> : null}
              </> }
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              
              <tr key={rowIndex} id="prueba">
              {propertyName.map((property, colIndex) => (
                  <td key={colIndex}>
                  {   Array.isArray(item[property])
                      ? (
                        item[property].length > 0 || (props.uri === "actividades" && role === "Profesor") || (role === "Director" && props.uri === "profesores")
                          ?
                          <>
                            {item[property].map((subItem, subIndex) => (
                              <div key={subIndex} className="subItem">{subItem} </div>
                            ))}
                            {(role === "Director" && props.uri === "profesores") || (role === "Profesor" && props.uri === "actividades") ?
                              <motion.button className="assignButton" onClick={() => handleAsing([item.nombre, item.id])} whileHover={{ scale: 1.2, backgroundColor: "white", color: "#00255c", border: "1px solid #00255c" }}>
                                Asignar
                              </motion.button>
                              :
                              null
                            }
                          </>
                          :
                          <p>Sin Asignar</p>

                      )
                      : item[property]
                      
                    }
                  </td>
                ))}
                {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ?
                  <td>
                    <div className="buttonsTable">
                      <motion.button className="tableButton" onClick={() => handleModify(item)} whileHover={{ scale: 1.2, color: "#00255c" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.95a.5.5 0 0 1 0 .706L15.559 3.69l-2-2L13.502.656a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.556-2-2L5.939 9.21a.5.5 0 0 0-.121.196l-.805 2.515a.25.25 0 0 0 .316.316l2.515-.805a.5.5 0 0 0 .196-.12l6.813-6.815z" />
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                      </motion.button>
                      <div className={`warning ${warning ? '' : 'cancel'}`}>
                        <div className='windonws'>
                          <div className='textExit'>
                            <p>¿Seguro que deseas eliminar?</p>
                          </div>
                          <div className='buttonsExitWindows'>
                            <button className='buttonsExit cancelButton' onClick={handleCancel}>
                              Cancelar
                            </button>
                            <button className='buttonsExit aceptButton' onClick={() => deleteElement(idDelete)}>
                              Aceptar
                            </button>
                          </div>
                        </div>
                      </div>
                      <motion.button onClick={() => handleShowWarning(item)} className="tableButton"
                        whileHover={{ rotate: 20 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2vw" height="2vw" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                      </motion.button>
                    </div>
                  </td>
                  : undefined
                }
              </tr>
            ))}
            <tr>
              <td className="nextPrev">
                {previusData.length > 0 ? <motion.button onClick={() => getPreviusData()} className="nextPrevButton" whileHover={{ scale: 1.1, color: "#00255c" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="3vw" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                  </svg>
                </motion.button> : null}
                {nextData.length > 0 ? <motion.button onClick={() => getNextData()} className="nextPrevButton" whileHover={{ scale: 1.1, color: "#00255c" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="3vw" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg></motion.button> : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SearchNull searchNull={searchNull} animateAviso={animateAviso} onCancel={handleCancelError} />
    </>
  )
}