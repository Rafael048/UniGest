import React,{useState,useEffect} from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Settings(){
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const token = Cookies.get('jwt')
    useEffect(()=>{
       async function getUser(){
        await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
            setUser(result.data.user)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            window.location.replace('/401')
        });
        }
        getUser()
    },[token])
    return(
        <>
        {loading?
        <p>Cargando...</p>
        :
        <div>
            <h1>Configuracion de {user.userName}  </h1>
            <p>Nombre: {user.nombre}</p>
            <p>Apellido: {user.apellido} </p>
            <p>Puesto : {user.rol} </p>
            <div>
                <button onClick={() => window.location.replace('/modificarUsuario')}>Editar</button>
                <button>Borrar Usuario</button>
            </div>
        </div>
    }
        
        </>
    )
}