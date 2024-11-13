import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Tables.css";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import SearchNull from "./SearchNull";
import { IconContext } from "react-icons";
import { FcDeleteRow } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdMode } from "react-icons/md";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { LuSearchX } from "react-icons/lu";
import { useDebounce } from "../hooks/UseDebounce";
import DescriptionPlani from "./DescriptionPlani";

export default function Tables(props) {
  const [data, setData] = useState([]);
  const [propertyName, setPropertyName] = useState([]);
  const [role, setRole] = useState(null);
  const [showSearch, setShowSearch] = useState("showButton");
  const [showX, setShowX] = useState("notShowButton");
  const [warning, setWarning] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const token = Cookies.get("jwt");
  const [searchNull, setSearchNull] = useState(false);
  const [animateAviso, setAnimateAviso] = useState(false);
  const [user, setUser] = useState(null);
  const [offset, setOffset] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [userInput, setUserInput] = useState(""); //es quien toma los datos del input no es Ai mamaguevo
  const [loading, setLoading] = useState(true);
  const [weeks, setWeeks] = useState([]);
  const [weeksDate, setWeekDate] = useState([])
  const [description, setDescription] = useState(false)
  const [descriptionData, setDescriptionData] = useState({})
  const debounceValue = useDebounce(userInput, 800);
  
  async function getData() {
    if (user) {
      if (props.uri === "pms") {
        await axios
          .get(
            `http://localhost:3000/${props.uri}?offset=${offset}&cedula=${user.cedula}`
          )
          .then((result) => {
            if (result.data.body.length === 0) {
              setLoading(false);
            } else {
              result.data.body.forEach((element) => {
                delete element.Nombre;
                delete element.Materias_Secciones;
                delete element.Apellido;
              });
              setData(result.data.body);
              let muestra = Object.getOwnPropertyNames(result.data.body[0]);
              let indexID = muestra.findIndex((element) => element === "id");
              muestra.splice(indexID, 1);
              setPropertyName(muestra);
              setNextButton(result.data.button);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        if (props.uri === "actividades" && role === "Profesor") {
          await axios
            .get(
              `http://localhost:3000/${props.uri}?offset=${offset}&creador=${user.userName}`
            )
            .then((result) => {
              let filter = result.data.body.filter((creador) => {
                return creador.creador === user.userName;
              });
              if (filter.length === 0) {
                setLoading(false);
              } else {
                filter.forEach((element) => {
                  delete element.creador;
                });
                setData(filter);
                let muestra = Object.getOwnPropertyNames(filter[0]);
                let indexID = muestra.findIndex(
                  (element) => element === "id"
                );
                muestra.splice(indexID, 1);
                setPropertyName(muestra);
                setNextButton(result.data.button);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else if (props.uri === "apms") {
          let id = Cookies.get("id");
          let cedulaTest = Cookies.get('cedula')
          let cedulaConsulta = null
          if (cedulaTest) {
            cedulaConsulta = cedulaTest
          } else {
            cedulaConsulta = user.cedula
          }
          await axios
            .get(`http://localhost:3000/${props.uri}?id=${id}&user=${cedulaConsulta}`)
            .then((result) => {
              Cookies.remove('id')
              if (result.data.body.length === 0) {
                setLoading(false);
              } else {
                result.data.body.forEach((item) => {
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
                  item.date = dateEvent

                })
                result.data.body.forEach((element) => {
                  switch (element.diaClase) {
                    case 0:
                      element.diaClase = "Domingo";
                      break;
                    case 1:
                      element.diaClase = "Lunes";
                      break;
                    case 2:
                      element.diaClase = "Martes";
                      break;
                    case 3:
                      element.diaClase = "Miercoles";
                      break;
                    case 4:
                      element.diaClase = "Jueves";
                      break;
                    case 5:
                      element.diaClase = "Viernes";
                      break;
                    case 6:
                      element.diaClase = "Sabado";
                      break;
                  }
                });
                let temp = [];
                for (let i = 0; i <= 14; i++) {
                  temp.push(i);
                }

                setWeeks(temp);
                let fecha = result.data.body[0].trimestre;
                let fechaJS = new Date(fecha);
                let tempFecha = [];
                for (let i = 0; i < 105; i += 7) {
                  let nuevaFecha = new Date(fechaJS);
                  nuevaFecha.setDate(nuevaFecha.getDate() + i);
                  tempFecha.push(nuevaFecha);
                }
                tempFecha.forEach(Element => {
                  Element = Element.toISOString().slice(0, 10).replace('T', '')

                });
                setWeekDate(tempFecha)
                setData(result.data.body);
                setPropertyName([
                  "Lunes",
                  "Martes",
                  "Miercoles",
                  "Jueves",
                  "Viernes",
                  "Sabado",
                  "Domingo",
                ]);
                setNextButton(result.data.button);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          await axios
            .get(`http://localhost:3000/${props.uri}?offset=${offset}`)
            .then((result) => {
              if (result.data.body.length === 0) {
                setLoading(false);
              } else {
                setData(result.data.body);
                let muestra = Object.getOwnPropertyNames(result.data.body[0]);
                let indexID = muestra.findIndex(
                  (element) => element === "id"
                );
                console.log(result.data.body)
                muestra.splice(indexID, 1);
                setPropertyName(muestra);
                setNextButton(result.data.button);
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }
      }
    } else {
      setLoading(true);
    }
  }
  useEffect(() => {
    const getDataInput = async () => {
      await axios
        .get(`http://localhost:3000/${props.uri}/Uno/${debounceValue}`)
        .then((result) => {
          setData(result.data.body);
          setShowSearch("notShowButton");
          setShowX("showButton");
          setNextButton(false);
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setSearchNull(true);
            setAnimateAviso(true);
          }
        });
    };
    userInput ? getDataInput() : resetData();
  }, [debounceValue, props.uri]);

  const handleChange = ({ target }) => {
    setUserInput(target.value);
    if(target.value===""){
      resetData()
    }
  };

  function handleShowWarning(item) {
    setIdDelete(item);
    setWarning(true);
  }

  function handleCancel() {
    setWarning(false);
  }

  function getNextData() {
    setOffset(offset + 5);
  }
  function getPreviusData() {
    setOffset(offset - 5);
  }

  function handleCancelError() {
    setAnimateAviso(false);
    setTimeout(() => {
      setSearchNull(false);
    }, 400);
  }

  function handleDescription(datos) {
    setDescriptionData(datos)
    console.log(descriptionData)
    if (description === false) {
      setDescription(true)
    } else {
      setDescription(false)
    }
  }

  function getClicked() {
    resetData(true)
  }
  async function deleteElement(item) {
    let id = item.id;
    await axios
      .delete(`http://localhost:3000/${props.uri}/eliminar/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleDesAsing(index, arr) {
    let id = arr[index];
    let direcction = null;
    console.log(id, index, arr);
    if (props.uri === "profesores") {
      direcction = "pms";
    } else {
      direcction = "apms";
    }
    await axios
      .delete(`http://localhost:3000/${direcction}/eliminar/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleAsing(name) {
    Cookies.set("name", name[0]);
    Cookies.set("id", name[1]);
    Cookies.set("uri", props.uri);
    if (role === "Profesor") {
      window.location.href = `/AsignarActividad`;
    } else if (role === "Director") {
      window.location.replace("/AsignarProfesor");
    }
  }
  function handleModify(item) {
    if (props.uri === "profesores") {
      Cookies.set("cedula", item.cedula);
    }
    console.log(item);
    Cookies.set("id", item.id);
    Cookies.set("name", item.nombre);

    window.location.replace(`/Modificar${props.uri}`);
  }
  function changeView(item) {

    if (props.uri === "profesores") {
      Cookies.set("cedula", item.cedula);
    } else {
      Cookies.set("id", item.id);
    }
    window.location.replace("/planificacion");
  }
  function resetData(button){
    if(button){
      setUserInput("");        
    }
    getData();                
    setShowSearch("showButton");
    setShowX("notShowButton");
  }
  useEffect(() => {
    async function verify() {
      await axios
        .get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setRole(result.data.user.rol);
          setUser(result.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    verify();
  }, [token]);
  useEffect(() => {

    getData();
  }, [props.uri, role, user, offset]);
  return (
    <>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <div className="center">
            <div className="headTable">
              {console.log(data)}
              {props.uri === "apms" ?
                <h1>Planificacion de {data[0].profesor} </h1>

                : props.uri === "pms" ?
                  <h1>Asignaturas</h1>
                  :
                  <h1 className="titleTable">{props.uri}</h1>
              }
              <div className="addSearch">
                <div className="subject">

                  {props.uri === "pms" ? null : props.uri === "apms" ?
                    data.filter(
                      (item, index, self) =>
                        index ===
                        self.findIndex(
                          (t) =>
                            t.materia === item.materia &&
                            t.seccion === item.seccion &&
                            t.diaClase === item.diaClase
                        )
                    )
                      .map((item, index) => (
                        <div className="itemSubjects" key={index}>
                          <p>
                            {item.materia + " " + item.seccion + " " + item.diaClase}
                          </p>
                        </div>
                      ))
                    : (
                      <>
                        <label className="searchButton">Buscar</label>
                        <div className="search">
                          <input
                            type="text"
                            name="element"
                            placeholder="Nombre"
                            className="inputSearch"
                            onChange={handleChange}
                            value={userInput}
                          />
                          <button
                            type="submit"
                            className={`tableButton ${showSearch}`}
                          >
                            <IconContext.Provider
                              value={{ className: "searchsvg" }}
                            >
                              <BiSolidSearchAlt2 />
                            </IconContext.Provider>
                          </button>
                          <div className={`tablebutton ${showX}`}>
                            <IconContext.Provider
                              value={{ className: "searchsvg" }}
                            >
                              <LuSearchX onClick={() => getClicked()} />
                            </IconContext.Provider>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {(role === "Director" && props.uri !== "actividades" && props.uri !== "apms" && props.uri !== "pms") ||
                    (role === "Profesor" && props.uri === "actividades" && props.uri !== "apms" && props.uri !== "pms") ? (
                    <motion.button
                      onClick={() =>
                        window.location.replace(`/Agregar${props.uri}`)
                      }
                      className="addButton"
                      whileHover={{ scale: 1.2, backgroundColor: "green" }}
                    >
                      Agregar
                    </motion.button>
                  ) : null}
                </div>
              </div>
              {
                description ?
                  <DescriptionPlani descriptionData={descriptionData} onCancel={handleDescription} />
                  : null
              }
              <table>
                {props.uri === "apms" ? (
                  <>
                    <thead>
                      <tr>
                        <th>Semanas</th>
                        {propertyName.length <= 0 ? (
                          <th>No se han ingresado elementos</th>
                        ) : (
                          <>
                            {propertyName.map((property, index) => (
                              <th key={index}>{property}</th>
                            ))}
                            {role === "Profesor" && props.uri === "pms" ? (
                              <th>Planificacion</th>
                            ) : null}
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {weeks.map((week, weekIndex) => {
                        return (
                          <tr key={weekIndex}>
                            <td>
                              <p key={weekIndex}>{`Semana ${week}`}</p>
                              <p key={weekIndex + 1}> {`${weeksDate[weekIndex] instanceof Date ? weeksDate[weekIndex].toLocaleDateString() : weeksDate[weekIndex]}`} </p>

                            </td>

                            {propertyName.map((property, indexProperty) => {
                              const items = data.filter(
                                (item) => item.diaClase === property && item.semana === week
                              );
                              return (
                                <td key={indexProperty}>
                                  {items.length > 0
                                    ? items.map((item, index) => <div onClick={() => handleDescription(item)} key={index} className="act">{item.title}</div>)
                                    : ""}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <>
                    <thead>
                      <tr>
                        {propertyName.length <= 0 ? (
                          <th>No se han ingresado elementos</th>
                        ) : (
                          <>
                            {propertyName.map((property, index) => (
                              <th key={index}>{property}</th>
                            ))}
                            {role === "Director" && props.uri === "profesores" ?
                              <th>Planificacion</th> : null
                            }
                            {(role === "Director" &&
                              props.uri !== "actividades" ) ||
                              (role === "Profesor" &&
                                props.uri === "actividades")   ? (
                                console.log(props.uri),
                              <th>Accion</th>
                            ) : null}
                            {role === "Profesor" && props.uri === "pms" ? (
                              <th>Planificacion</th>
                            ) : null}
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, rowIndex) => (
                        <tr
                          key={rowIndex}
                          id="prueba"
                          className="tableResponsive"
                        >
                          {propertyName.map((property, colIndex) => (
                            <td data-label={property + " "} key={colIndex}>
                              {Array.isArray(item[property]) ? (
                                item[property].length > 0 ||
                                  (props.uri === "actividades" &&
                                    role === "Profesor") ||
                                  (role === "Director" &&
                                    props.uri === "profesores") ? (
                                  <div className="materiasSeccion">
                                    {item[property].map((subItem, subIndex) =>
                                      Number.isInteger(subItem) ? null : (
                                        <div key={subIndex} className="subItem">
                                          {subItem}
                                          {role === "Director" &&
                                            props.uri === "profesores" ? (
                                            <motion.div
                                              whileHover={{ scale: 1.5 }}
                                            >
                                              <IconContext.Provider
                                                value={{ className: "searchsvg" }}
                                              >
                                                <FcDeleteRow
                                                  onClick={() =>
                                                    handleDesAsing(
                                                      item.materias_Secciones.indexOf(
                                                        subItem
                                                      ) + 1,
                                                      item.materias_Secciones
                                                    )
                                                  }
                                                />
                                              </IconContext.Provider>

                                            </motion.div>
                                          ) : role === "Profesor" &&
                                            props.uri === "actividades" ? (
                                            <motion.div
                                              whileHover={{ scale: 1.5 }}
                                            >
                                              <IconContext.Provider
                                                value={{ className: "searchsvg" }}
                                              >
                                                <FcDeleteRow
                                                  onClick={() =>
                                                    handleDesAsing(
                                                      item.Clase.indexOf(
                                                        subItem
                                                      ) + 1,
                                                      item.Clase
                                                    )
                                                  }
                                                />
                                              </IconContext.Provider>

                                            </motion.div>
                                          ) : null}
                                        </div>
                                      )
                                    )}
                                    {(role === "Director" &&
                                      props.uri === "profesores") ||
                                      (role === "Profesor" &&
                                        props.uri === "actividades") ? (
                                      <motion.button
                                        className="assignButton"
                                        onClick={() =>
                                          handleAsing([item.nombre, item.id])
                                        }
                                        whileHover={{
                                          scale: 1.2,
                                          backgroundColor: "white",
                                          color: "#00255c",
                                          border: "1px solid #00255c",
                                        }}
                                      >
                                        Asignar
                                      </motion.button>
                                    ) : null}
                                  </div>
                                ) : (
                                  <p>Sin Asignar</p>
                                )
                              ) : (
                                item[property]
                              )}
                            </td>
                          ))}
                          {role === "Director" && props.uri === "profesores" ?
                            <td>
                              <motion.button
                                className="viewPlani"
                                whileHover={{
                                  scale: 1.2,
                                  backgroundColor: "#0947a5",
                                }}
                                onClick={() => changeView(item)}
                              >
                                {" "}
                                Ver Planificacion
                              </motion.button>
                            </td> : null
                          }
                          {(role === "Director" && props.uri !== "actividades") ||
                            (role === "Profesor" && props.uri === "actividades") ? (
                            <td data-label="Accion">
                              <div className="buttonsTable">
                                <motion.button
                                  className="tableButton"
                                  onClick={() => handleModify(item)}
                                  whileHover={{ scale: 1.2, color: "#00255c" }}
                                >
                                  <IconContext.Provider
                                    value={{ className: "searchsvg" }}
                                  >
                                    <MdMode />
                                  </IconContext.Provider>
                                </motion.button>
                                <div
                                  className={`warning ${warning ? "" : "cancel"}`}
                                >
                                  <div className="windonws">
                                    <div className="textExit">
                                      <p>¿Seguro que deseas eliminar?</p>
                                    </div>
                                    <div className="buttonsExitWindows">
                                      <button
                                        className="buttonsExit cancelButton"
                                        onClick={handleCancel}
                                      >
                                        Cancelar
                                      </button>
                                      <button
                                        className="buttonsExit aceptButton"
                                        onClick={() => deleteElement(idDelete)}
                                      >
                                        Aceptar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <motion.button
                                  onClick={() => handleShowWarning(item)}
                                  className="tableButton"
                                  whileHover={{ rotate: 20 }}
                                >
                                  <IconContext.Provider
                                    value={{
                                      color: "red",
                                      className: "searchsvg",
                                    }}
                                  >
                                    <MdDeleteForever />
                                  </IconContext.Provider>
                                </motion.button>
                              </div>
                            </td>
                          ) : undefined}
                          {role === "Profesor" && props.uri === "pms" ? (
                            <td>
                              <motion.button
                                className="viewPlani"
                                whileHover={{
                                  scale: 1.2,
                                  backgroundColor: "#0947a5",
                                }}
                                onClick={() => changeView(item)}
                              >
                                {" "}
                                Ver Planificacion
                              </motion.button>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                      <tr>
                        <td className="nextPrev">
                          {offset > 0 ? (
                            <motion.button
                              onClick={() => getPreviusData()}
                              className="nextPrevButton"
                              whileHover={{ scale: 1.1, color: "#00255c" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-arrow-left-circle-fill svgNextPrev"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                              </svg>
                            </motion.button>
                          ) : null}
                          {nextButton ? (
                            <motion.button
                              onClick={() => getNextData()}
                              className="nextPrevButton"
                              whileHover={{ scale: 1.1, color: "#00255c" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-arrow-right-circle-fill svgNextPrev"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                              </svg>
                            </motion.button>
                          ) : null}
                        </td>
                      </tr>
                    </tbody>
                  </>
                )}
              </table>
            </div>
            <SearchNull
              searchNull={searchNull}
              animateAviso={animateAviso}
              onCancel={handleCancelError}
            />
          </>
      )}
        </>
      );
}
