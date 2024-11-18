import React, { useState } from 'react'
import '../css/FormLogin.css'
import logoSolo from '../assets/logoSolo.png'
import axios from 'axios'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'

export default function FormLogin() {
  const [error, setError] = useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      user: e.target.user.value,
      password: e.target.pass.value
    }
    axios.post('http://localhost:3000/login', data)
      .then((result) => {
        const token = result.data
        Cookies.set('jwt', token, { expires: 1 })
        window.location.href = '/'
      }).catch((err) => {
        if (err.response) {
          console.log(err.response.data.error)
          setError(err.response.data.message)
        }
      });
  }
  return (
    <div className='buildLogin'>
      <div className='imageLogin'>
        <img src={logoSolo} alt="logoSolo" width='40%' />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className='loginForm'>
        <div className='logosIn'>
          <input className='inputLogin' type="text" placeholder='Usuario' name='user' autoComplete='off' required />
          <div className='svg'>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>
          </div>
        </div>
        <div className='logosIn'>
          <input className='inputLogin' type="password" placeholder='Contraseña' name="pass" autoComplete='off' required />
          <div className='svg'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
          </svg>

          </div>
        </div>


        {
          error ? <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: 10, opacity: 1 }} className='errorRegister'> {error} </motion.div> : null
        }
        <motion.input whileHover={{ scale: .9, backgroundColor: "#000000e7", border: "2px solid black" }} transition={{ ease: "linear" }} className='submitLogin' type="submit"
        name="loginButton"
        value='Iniciar Sesión' />
      </form>
      <div className='nameLogin'>
        <a href="/"> Unigest</a>
      </div>
    </div>
  )
}
