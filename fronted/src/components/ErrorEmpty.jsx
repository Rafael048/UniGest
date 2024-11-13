import React, { useState } from 'react'
import '../css/ErrorEmpty.css'
import '../css/DescriptionTableSubject.css'
import { motion } from 'framer-motion'

export default function ErrorEmpty({ active, onCancel }) {
  const [close, setClose]= useState('')

  function handleAcept() {
      setClose('exitDescription')
      setTimeout(() => {
          onCancel()
      }, 400);
  }
  return (
    <div className={`errorView ${active ? 'none' : '' }`}>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className={`errorEmpty ${close} `}>
        <p className='textError'>
          Debes llenar los campos
        </p>
        <motion.button whileHover={{backgroundColor: "#0947a5", scale: .9 }} onClick={handleAcept} className='errorButton'>Aceptar</motion.button>
      </motion.div>
    </div>
  )
}
