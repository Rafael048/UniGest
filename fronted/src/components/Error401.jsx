import React, { useEffect } from 'react'
import '../css/Error401.css'
import image from '../assets/incorrecto.png'
export default function Error401() {
    useEffect(() => {
        setTimeout(() => {
            window.location.replace('/')
        }, 5000);
    })
    return (
        <div className='section401'>
            <div className='error401'>
                <div className='errorImg'>
                    <img src={image} alt="error" width={"100%"} />
                </div>
                <p className="textError401">
                    <b className="textError401">Error 401</b>: No estas autorizado para ingresar a esta seccion.
                </p>
                <p className="textError401">
                    <b>
                        Reedirigiendo a la pagina principal...
                    </b>
                </p>
            </div>
        </div>
    )
}
