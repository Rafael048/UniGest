import React, { useState } from "react";
import '../css/FormRegister.css'
import axios from "axios";
import { motion } from "framer-motion";
import ErrorEmpty from "./ErrorEmpty";


export default function FormRegister(props) {
    const [error, setError] = useState(null)
    const [errorEmpty, setErrorEmpty] = useState(false)

    function handlecancel() {
        if (errorEmpty === false) {
            setErrorEmpty(true)
            console.log(errorEmpty)
        } else {
            setErrorEmpty(false)
            console.log(errorEmpty)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            lastName: e.target.lastName.value,
            user: e.target.user.value,
            password: e.target.password.value,
            rol: e.target.puesto.value,
            cedula: e.target.cedula.value,
            registerpass: e.target.registerpass.value
        }
        console.log(data)
        if (data.cedula.trim() === '' || data.lastName.trim() === '' || data.name.trim() === '' || data.password.trim() === '' || data.registerpass.trim() === '' || data.user.trim() === '') {
            handlecancel()
        } else {
            await axios.post('http://localhost:3000/register', data)
                .then(async () => {
                    if (props.uri === "profesor") {
                        window.location.replace('/profesores')
                    } else {
                        window.location.replace('/profesores')
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.error)
                    setError(err.response.data.error)
                })
        }
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)} className='form'>
            <h1 className='titleForm'>{props.uri ? "Agregar Profesor" : "Bienvenido"}</h1>
            <input type="number" className="inputNumber" placeholder="Cedula" name="cedula" min={'0'} autoComplete="off" required />
            <div className="inputNew">
                <input type="text" className="input" placeholder="Nombre" name="name" autoComplete="off" required />
                <input type="text" className="input" placeholder="Apellido" name="lastName" autoComplete="off" required />
            </div>
            <div className="inputNew">
                <input type="text" className='input' placeholder='Usuario' name="user" autoComplete="off" required />
                <input type="password" className='input' name="password" placeholder='Contraseña' autoComplete="off" required />
            </div>
            <div className="inputNew">

                <select name="puesto" id="" className='list' required>

                    <option className='select' value="Profesor">Profesor</option>
                    <option className='select' value="Director">Director</option>

                </select>

                <input type="password" className='input' placeholder='Clave de registro' name="registerpass" autoComplete="off" required />

            </div>
            {
                error ? <motion.div animate={{ opacity: 1, y: 10 }} className="error">{error}</motion.div>
                    : <></>
            }

            <motion.input whileHover={{ scale: .9, backgroundColor: "#ffffffc7" }} type="submit" className='submit' value={'Registrarse'} />
            {
                errorEmpty ?
                    <ErrorEmpty onCancel={handlecancel} />
                    : null
            }
        </form>
    )
}
