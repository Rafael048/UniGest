import React, { useState } from 'react'
import '../css/DescriptionTableSubject.css'
import { motion } from 'framer-motion'

export default function DescriptionPlani({ descriptionData, onCancel }) {
    const [close, setClose]= useState('')

    function handleAcept() {
        setClose('exitDescription')
        setTimeout(() => {
            onCancel()
        }, 400);
    }
    return (
        <div className={`planiConatiner `}>
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className={`descriptionTable ${close}`}>
                <h2 className='titlePlani'>
                    {descriptionData.title}
                </h2>
                <div className='textplani'>
                    <p>
                        Profesor: {
                            descriptionData.profesor
                        }
                    </p>
                    <p>
                        Materia: {
                            descriptionData.materia
                        }
                    </p>
                    <p>
                        Sección: {
                            descriptionData.seccion
                        }
                    </p>
                    <p>
                        Descripción: {
                            descriptionData.descripcion
                        }
                    </p>
                    <p>
                        Fecha: {
                            descriptionData.date
                        }
                    </p>
                </div>
                <motion.button whileHover={{backgroundColor: "#0947a5", scale: .9 }} onClick={handleAcept} className='aceptButtonDescription'>Aceptar</motion.button>
            </motion.div>
        </div>
    )
}
