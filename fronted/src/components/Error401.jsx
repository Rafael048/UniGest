import React, { useEffect } from 'react'
import '../css/Error401.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Error401() {
    useEffect(()=>{
        setTimeout(() => {
            window.location.replace('/')
        }, 5000);
    })
    return (
        <div className='section401'>
            <div className='error401'>
                <div className='animation'>
                </div>
                    <DotLottieReact
                        src='https://lottie.host/172a79a7-36a7-49d5-a5c0-c87e3397464e/Txgq06nLQR.json'
                        loop
                        autoplay
                    />
                <p className="textError">
                    <b className="textError">Error 401</b>: No estas autorizado para ingresar a esta seccion.
                </p>
                <p className="textError">
                    Reedirigiendo a la pagina principal...
                </p>
            </div>
        </div>
    )
}
