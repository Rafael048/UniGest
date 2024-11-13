import React from 'react';
import Cookies from 'js-cookie';
import '../css/Exit.css';
import { ImCancelCircle } from "react-icons/im"; //Cancel icon
import { IoIosLogOut } from "react-icons/io"; //cerrar Sesion icon
import { IconContext } from 'react-icons/lib';


export default function Exit({ exitEmer, onCancel }) {
    async function logout() {
        Cookies.remove('jwt');
        window.location.replace('/');
    }

    if (!exitEmer) {
        return null;
    }

    return (
        <div className={`exit ${exitEmer ? '' : 'cancel'}`}>
            <div className='windonws'>
                <div className='textExit'>
                    <p>¿Seguro que deseas cerrar sesión?</p>
                </div>
                <div className='buttonsExitWindows'>
                    <button className='buttonsExit cancelButton' onClick={onCancel}>
                        <p className='buttonText'>
                            Cancelar
                        </p>

                        <div className='iconExit'>
                            <IconContext.Provider value={'svgExit'}>
                                <ImCancelCircle />
                            </IconContext.Provider>
                        </div>
                    </button>
                    <button className='buttonsExit aceptButton' onClick={logout}>
                        <p className='buttonText'>
                            Aceptar
                        </p>
                        <div className='iconExit'>
                            <IconContext.Provider value={'svgExit'}>
                                <IoIosLogOut />
                            </IconContext.Provider>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
