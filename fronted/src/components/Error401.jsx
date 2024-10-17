import React from 'react'
import '../css/Error401.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Error401() {
    return (
        <div className='section401'>
            <div className='error401'>
                <div className='animation'>
                    <DotLottieReact
                        src='https://lottie.host/172a79a7-36a7-49d5-a5c0-c87e3397464e/Txgq06nLQR.json'
                        loop
                        autoplay
                    />
                </div>
                <p className="textError">
                    <b className="textError">Error 401</b>: No estas autorizado para ingresar a esta seccion, por favor inicia sesion para continuar.
                </p>
                <p className="textError">
                    Reedirigiendo al inicio de sesion...
                </p>
            </div>
        </div>
    )
}
