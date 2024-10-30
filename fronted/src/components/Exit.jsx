import React from 'react';
import Cookies from 'js-cookie';
import '../css/Exit.css';

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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle-fill svgExit" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>

                        </div>
                    </button>
                    <button className='buttonsExit aceptButton' onClick={logout}>
                        <p className='buttonText'>
                            Aceptar
                        </p>
                        <div className='iconExit'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-right svgExit" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>

                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
