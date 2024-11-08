import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../css/SearchNull.css'

export default function SearchNull({ searchNull, onCancel, animateAviso }) {
    const open = { scale: 1, rotate: 0 }
    const close = { scale: 0 }
    
    return (
        <div className={searchNull ? 'containSearchNull' : 'none'}>
            <AnimatePresence>
                <motion.div animate={animateAviso ? open : close} className='avId'>
                    <div>
                        <DotLottieReact
                            src={'https://lottie.host/53130742-d78f-4a4f-b394-13eb51e7ac36/7Htm8nUYkx.json'}
                            loop={true}
                            autoplay={true}
                        />
                    </div>
                    <p>Elemento no encontrado</p>
                    <motion.button whileHover={{ color: "red", scale:.9, backgroundColor:"white", border:"1px solid red" }} onClick={onCancel} className='buttonAcept'>
                        Aceptar
                    </motion.button>

                </motion.div>
            </AnimatePresence>
        </div>
    )
}
