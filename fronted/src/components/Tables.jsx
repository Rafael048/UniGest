import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../css/Tables.css'
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
import SearchNull from "./SearchNull";

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
      setOffset(offset+5)
    

  }
  function getPreviusData() {
      setOffset(offset-5)
    
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
  async function handleDesAsing(index,arr){
    let id = arr[index]
    let direcction = null
    if(props.uri==="profesores"){
      direcction = "pms"
    }else{
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
            let indexID = muestra.findIndex((element=>element==="id"))
            muestra.splice(indexID,1)
            setPropertyName(muestra)
            setNextButton(result.data.body.button)
  
          } else {
            setData(result.data.body)
            let muestra = Object.getOwnPropertyNames(result.data.body[0])
            let indexID = muestra.findIndex((element=>element==="id"))
            muestra.splice(indexID,1)
            setPropertyName(muestra)         
            setNextButton(result.data.button)

          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    getData()
  }, [props.uri, role, user,offset])
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search searchsvg" viewBox="0 0 16 16">
                    <path d="M11.752 10.355a6.5 6.5 0 1 0-1.397 1.398h-.001q.055.06.098.115l3.85 3.85a1 1 0 0 0 1.515-1.515l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
                <div className={`tablebutton ${showX}`}>
                  <svg onClick={() => getClicked()} xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle searchsvg" viewBox="0 0 16 16">
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
              {propertyName.length <= 0 ? <th>No se han ingresado elementos</th> :
                <>
                  {propertyName.map((property, index) => (
                    
                      <th key={index}>
                        {property}
                      </th>
                      
                  ))}
                  {(role === "Director" && props.uri !== "actividades") || (role === "Profesor" && props.uri === "actividades") ? <th>Accion</th> : null}
                </>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (

              <tr key={rowIndex} id="prueba" className="tableResponsive">
                {propertyName.map((property, colIndex) => (
                  <td data-label={property+" "} key={colIndex}>
                    {Array.isArray(item[property])
                      ? (
                        item[property].length > 0 || (props.uri === "actividades" && role === "Profesor") || (role === "Director" && props.uri === "profesores")
                          ?
                          <div className="materiasSeccion">
                          
                            {item[property].map((subItem, subIndex) => (
                              Number.isInteger(subItem)?null:
                              <div key={subIndex} className="subItem">{subItem} 
                              { (role === "Director" && props.uri === "profesores")?
                                  <svg onClick={()=>handleDesAsing(item.Clase.indexOf(subItem)+1,item.Clase)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-minus searchsvg" viewBox="0 0 16 16" >
                                  <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
                                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg> :
                              role === "Profesor" && props.uri==="actividades"?
                              <svg onClick={()=>handleDesAsing(item.Clase.indexOf(subItem)+1,item.Clase)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-minus searchsvg" viewBox="0 0 16 16" >
  <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" className="bi bi-pencil-square svgtables" viewBox="0 0 16 16">
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" className="bi bi-trash3-fill svgtables" viewBox="0 0 16 16">
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
              {offset>0?
                 <motion.button onClick={() => getPreviusData()} className="nextPrevButton" whileHover={{ scale: 1.1, color: "#00255c" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-circle-fill svgNextPrev" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                  </svg>
                </motion.button> 
                 :
                 null
             }
             {nextButton?
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