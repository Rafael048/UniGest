import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../css/Units.css'
import { IconContext } from "react-icons/lib";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";


export function Units(props) {
  const dataTotal = props.Data;

  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextButton, setNextButton] = useState(false)
  function addOffset() {
    setOffset(offset + 1);
  }
  function restOffset() {
    setOffset(offset - 1);
  }

  useEffect(() => {
    let temp = [];
    dataTotal.forEach((element) => {
      if (element.unidad === `Unidad ${offset}`) {
        temp.push(element);
      }else if(element.unidad=== `Unidad ${offset+1}`){
        setNextButton(true)
      }else{
        setNextButton(false)
      }
    });
    setData(temp);
    setLoading(false);
  }, [offset]);
  return (
    <>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <div>
            <motion.button
              onClick={props.onChange}
              className="addButton"
              whileHover={{ scale: 1.2, backgroundColor: "#008000" }}
            >
              Planificacion por Semanas
            </motion.button>
          </div>
          <div className="tableViewUnit">
            <div>
              <div>
                {
                  data.length > 0 ?
                    <div>
                      <p className="textSemanas">
                        {"Inicio de Semanas " +
                          data[0].date +
                          " - " +
                          data.toReversed()[0].date}
                      </p>
                    </div>
                    :
                    <p>No hay datos</p>
                }

              </div>
              <table className="tableUnit">
                <thead className="theadUnit">
                  <tr className="trUnit">
                    <th className="titleTeacherUnit" colSpan={"6"}>Profesor <span style={{ textTransform: "capitalize" }}>{data[0].profesor}</span> </th>
                  </tr>
                  <tr className="trUnit">
                    <th className="dataPlanith" colSpan={"1"}>Materia / Curso</th>
                    <th className="dataPlanith" colSpan={"2"}>Seccion</th>
                    <th className="dataPlanith" colSpan={"2"}>Dia de clases</th>
                  </tr>
                  <tr className="trUnit">
                    <td data-label={"Materia / curso"} className="dataPlani" colSpan={"1"} > {data[0].materia}</td>
                    <td data-label={"Seccion"} className="dataPlani" colSpan={"2"} > {data[0].seccion}</td>
                    <td data-label={"Dia de clases"} className="dataPlani" colSpan={"2"}>  {data[0].diaClase} </td>
                  </tr>
                  <tr className="trUnit">
                    <th className="indicadores">Contenido <br /> Temas/Subtemas</th>
                    <th className="indicadores">Socialización en Línea/Construcción de conocimientos/Desarrollo <br /> e-actividades</th>
                    <th className="indicadores">Semana</th>
                    <th className="indicadores">Fecha-Hora de entrega-medios</th>
                    <th className="indicadores">% Eval.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return (
                      <tr className="trUnit" key={item.id}>
                        <td className="td-plani one" data-label={"Contenido / tema"} >{item.unidad}<br /> {item.tema}</td>
                        <td className="td-plani" data-label={"e-actividades"}>{item.descripcion}<br /> e-Actividad {item.title} </td>
                        <td className="td-plani" data-label={"Semana"}>{item.semana} </td>
                        <td className="td-plani" data-label={"Hora"}>{item.Hora}<br />{item.date}</td>
                        <td className="td-plani" data-label={"Porcentaje"}>{item.porcentaje}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="buttonPanel">
                {offset <= 1 ? null : (
                  <button className="buttonUnit" onClick={() => restOffset()}>
                    <IconContext.Provider value={{ className: "svgButton" }}>
                      <FaArrowAltCircleLeft />
                    </IconContext.Provider>
                  </button>
                )}
                {!nextButton ? null : (
                  <button className="buttonUnit" onClick={() => addOffset()}>
                    <IconContext.Provider value={{ className: "svgButton" }}>
                      <FaArrowAltCircleRight />
                    </IconContext.Provider>
                  </button>
                )}
              </div>
            </div>


          </div>
        </>
      )}
    </>
  );
}


