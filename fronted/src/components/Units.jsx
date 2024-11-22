import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";

export function Units(props){
const dataTotal = props.Data
const [offset, setOffset] = useState(0)
const [offsetWeeks, setOffsetWeeks] = useState(0)
const [data, setData] = useState([]) 
const [weeks, setWeeks] = useState([])
const [weeksDate, setWeekDate] = useState([])
function addOffset(){
    setOffset(offset + 1)
    setOffsetWeeks(offsetWeeks + 3)
}
function restOffset(){
    setOffset(offset-1)
    setOffsetWeeks(offsetWeeks-3)
}

useEffect(()=>{
    setData(dataTotal.slice(offset , offset + 1))
    setWeeks(props.weeks.slice(offsetWeeks,offsetWeeks + 3))

    setWeekDate(props.weeksDate.slice(offsetWeeks, offsetWeeks + 3 ))
},[offset])
    return(

        <>
        <div>
             <motion.button
                                   onClick={props.onChange}
                                   className="addButton"
                                   whileHover={{ scale: 1.2, backgroundColor: "#008000" }}
                                 >
                                   Planificacion unidades
                                 </motion.button>
        </div>
        <div>
        <div style={{display:"flex"}}>
        <button onClick={()=>restOffset()}>click</button>
        <p>
            {"Semanas"+ weeks[0] + "-" + weeks.toReversed()[0]}
        </p>
        <p>
            {"Inicio de Semanas"+ weeksDate[1].toLocaleDateString() + "-" + weeksDate.toReversed()[1].toLocaleDateString()}
        </p>
            {data.map((element,index) => (
                < >
                <div key={index}>
              <p>
                {element.unidad + " " + element.tema + " "}
              </p>  
                </div>
                <div>
                <p>
                {element.title}
                </p>
                </div>
                </>
            )
        )}
        <button onClick={()=>addOffset()}>click</button>
        </div>
        </div>
        </>
    )
}