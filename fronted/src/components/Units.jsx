import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Units(props) {
  const dataTotal = props.Data;

  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
          <div >
            <div style={{ display: "flex" }} >
              {offset <= 1 ? null : (
                <button onClick={() => restOffset()}>click</button>
              )}
              <p>
                {"Semanas" + data[0].semana + "-" + data.toReversed()[0].semana}
              </p>
              <p>
                {"Inicio de Semanas" +
                  data[0].date +
                  "-" +
                  data.toReversed()[0].date}
              </p>
              <p>{data[0].unidad + " " + data[0].tema}</p>
              {data.map((element, index) => (
                <>
                  <div key={index}>
                    <p>{element.title}</p>
                  </div>
                </>
              ))}
              {data.length < offset ? null : (
                <button onClick={() => addOffset()}>click</button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
