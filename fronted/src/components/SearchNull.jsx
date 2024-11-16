import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../css/SearchNull.css'
import image from '../assets/incorrecto.png'

export default function SearchNull({ searchNull, onCancel, animateAviso }) {
    const open = { scale: 1, rotate: 0 }
    const close = { scale: 0 }

    return (
        <div className={searchNull ? 'containSearchNull' : 'none'}>
            <AnimatePresence>
                <motion.div animate={animateAviso ? open : close} className='avId'>
                    <div className='errorImg'>
                        <img src={image} alt="error" width={"100%"} />
                    </div>
                    <p>Elemento no encontrado</p>
                    <motion.button whileHover={{ color: "red", scale: .9, backgroundColor: "white", border: "1px solid red" }} onClick={onCancel} className='buttonAcept'>
                        Aceptar
                    </motion.button>

                </motion.div>
            </AnimatePresence>
        </div>
    )
}
