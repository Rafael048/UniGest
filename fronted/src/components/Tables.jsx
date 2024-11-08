import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../css/Tables.css'
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
import SearchNull from "./SearchNull";
import { IconContext } from "react-icons"
import { FcDeleteRow } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdMode } from "react-icons/md";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { LuSearchX } from "react-icons/lu";



export default function Tables(props) {
  const [data, setData] = useState([])
  const [propertyName, setPropertyName] = useState([])
  const [clicked, setClicked] = useState(false)
  const [role, setRole] = useState(null)
  const [showSearch, setShowSearch] = useState('showButton')
  const [showX, setShowX] = useState('notShowButton')
  const [warning, setWarning] = useState(null)
  const [idDelete, setIdDelete] = useState(null)
  const token = Cookies.get('jwt')
  const [searchNull, setSearchNull] = useState(false)
  const [animateAviso, setAnimateAviso] = useState(false)
  const [user, setUser] = useState(null)
  const [offset, setOffset] = useState(0)
  const [nextButton, setNextButton] = useState(false)
  function handleShowWarning(item) {

    setIdDelete(item)
    setWarning(true)
  }

  function handleCancel() {
    setWarning(false)
  }



  function getNextData() {
    setOffset(offset + 5)


  }
  function getPreviusData() {
    setOffset(offset - 5)

  }

  function getOneElement(e) {
    e.preventDefault()
    setClicked(true)
    let element = e.target.element.value
    let arrTemp = []
    arrTemp.push(data.find((elements) => {
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
      setData(data.slice(0, 5))
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
  async function handleDesAsing(index, arr) {
    let id = arr[index]
    let direcction = null
    console.log(id,index,arr)
    if (props.uri === "profesores") {
      direcction = "pms"
    } else {
      direcction = "apms"
    }
    await axios.delete(`http://localhost:3000/${direcction}/eliminar/${id}`)
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

  useEffect(() => {
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
  }, [token])
  useEffect(() => {
    async function getData() {
      if (props.uri === "pms") {
        await axios.get(`http://localhost:3000/${props.uri}?offset=${offset}&table=${true}`)
          .then((result) => {
            let filter = result.data.body.filter((pms) => {
              return pms.user=== user.cedula
            })
            filter.forEach(element => {
              delete element.user
            });
            setData(filter)
            let muestra = Object.getOwnPropertyNames(filter[0])

            setPropertyName(muestra)
            setNextButton(result.data.body.button)

          })
          .catch((err) => {
            console.log(err)
          })

      } else {

        await axios.get(`http://localhost:3000/${props.uri}?offset=${offset}`)
          .then((result) => {

            if (props.uri === "actividades" && role === "Profesor") {
              let filter = result.data.body.filter((creador) => {
                return creador.creador === user.userName
              })
              filter.forEach(element => {
                delete element.creador
              });
              setData(filter)
              let muestra = Object.getOwnPropertyNames(filter[0])
              let indexID = muestra.findIndex((element => element === "id"))
              muestra.splice(indexID, 1)
              setPropertyName(muestra)
              setNextButton(result.data.button)

            } else {
              setData(result.data.body)
              let muestra = Object.getOwnPropertyNames(result.data.body[0])
              let indexID = muestra.findIndex((element => element === "id"))
              muestra.splice(indexID, 1)
              setPropertyName(muestra)
              setNextButton(result.data.button)

            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

    getData()
  }, [props.uri, role, user, offset])
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
                  <IconContext.Provider value={{ className: "searchsvg" }}>
                    <BiSolidSearchAlt2 />
                  </IconContext.Provider>
                </button>
                <div className={`tablebutton ${showX}`}>
                  <IconContext.Provider value={{className:"searchsvg"}}>
                    <LuSearchX onClick={() => getClicked()}/>
                  </IconContext.Provider>
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
              {propertyName.length <= 0 ? <th>No se han ingresado elementos</th> :
                <>
                  {propertyName.map((property, index) => (

                    <th key={index}>
                      {property}
                    </th>

                  ))}
                  {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ? <th>Accion</th> : null}
                  {role === "Profesor" && props.uri === "pms" ? <th>Planificacion</th> : null}
                </>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (

              <tr key={rowIndex} id="prueba" className="tableResponsive">
                {propertyName.map((property, colIndex) => (
                  <td data-label={property + " "} key={colIndex}>
                    {Array.isArray(item[property])
                      ? (
                        item[property].length > 0 || (props.uri === "actividades" && role === "Profesor") || (role === "Director" && props.uri === "profesores")
                          ?
                          <div className="materiasSeccion">

                            {item[property].map((subItem, subIndex) => (
                              Number.isInteger(subItem) ? null :
                                <div key={subIndex} className="subItem">{subItem}
                                  {(role === "Director" && props.uri === "profesores") ?
                                    <motion.div whileHover={{ scale: 1.5 }}>
                                      <IconContext.Provider value={{ className: "searchsvg" }} >
                                        <FcDeleteRow onClick={() => handleDesAsing(item.materias_Secciones.indexOf(subItem) + 1, item.materias_Secciones)} />
                                      </IconContext.Provider>
                                    </motion.div>
                                    :
                                    role === "Profesor" && props.uri === "actividades" ?
                                    <motion.div whileHover={{ scale: 1.5 }}>
                                      <IconContext.Provider value={{ className: "searchsvg" }} >
                                        <FcDeleteRow onClick={() => handleDesAsing(item.Clase.indexOf(subItem) + 1, item.Clase)} />
                                      </IconContext.Provider>
                                    </motion.div>
                                      :
                                      null
                                  }

                                </div>
                            ))}
                            {(role === "Director" && props.uri === "profesores") || (role === "Profesor" && props.uri === "actividades") ?
                              <motion.button className="assignButton" onClick={() => handleAsing([item.nombre, item.id])} whileHover={{ scale: 1.2, backgroundColor: "white", color: "#00255c", border: "1px solid #00255c" }}>
                                Asignar
                              </motion.button>
                              :
                              null
                            }
                          </div>
                          :
                          <p>Sin Asignar</p>

                      )
                      : item[property]

                    }
                  </td>
                ))}
                {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ?
                  <td data-label="Accion">
                    <div className="buttonsTable">
                      <motion.button className="tableButton" onClick={() => handleModify(item)} whileHover={{ scale: 1.2, color: "#00255c" }}>
                        <IconContext.Provider value={{ className: "searchsvg" }}>
                          <MdMode />
                        </IconContext.Provider>
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
                        <IconContext.Provider value={{ color: "red", className: "searchsvg" }}>
                          <MdDeleteForever />
                        </IconContext.Provider>
                      </motion.button>
                    </div>
                  </td>
                  : undefined
                }
                {role === "Profesor" && props.uri === "pms" ? <td><motion.button className="viewPlani" whileHover={{scale:1.2, backgroundColor:"#0947a5"}}> Ver Planificacion</motion.button></td> : null}
              </tr>
            ))}
            <tr>
              <td className="nextPrev">
                {offset > 0 ?
                  <motion.button onClick={() => getPreviusData()} className="nextPrevButton" whileHover={{ scale: 1.1, color: "#00255c" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-circle-fill svgNextPrev" viewBox="0 0 16 16">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                  </motion.button>
                  :
                  null
                }
                {nextButton ?
                  <motion.button onClick={() => getNextData()} className="nextPrevButton" whileHover={{ scale: 1.1, color: "#00255c" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right-circle-fill svgNextPrev" viewBox="0 0 16 16">
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg></motion.button>
                  :
                  null
                }

              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <SearchNull searchNull={searchNull} animateAviso={animateAviso} onCancel={handleCancelError} />
    </>
  )
}