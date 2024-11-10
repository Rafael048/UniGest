import { React, useEffect, useState } from 'react'
import FormModify from '../components/Formmodify'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../css/FormActivitiesAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../assets/logo.png'
import '../css/FormModifyUser.css'


export default function FormActivitiesAdd() {
  const btActive = 'activeMenu'
  const token = Cookies.get('jwt')
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)
  const setting = true
  const color = 'blue'

  useEffect(() => {
    async function getData(token) {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setActive(result.data.user.rol)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          window.location.replace('/Error401')
        })
    }
    getData(token)
  }, [token])



  return (
    <div>
      {
        loading ?
          <p>
            Cargando...
          </p> :
          active === 'Director' ?
            <>
              <div className='directorView'>
                <div className='logoDirectorSolo'>
                  <img src={logo} alt="" width={"80%"} />
                </div>
                <Menu btProfesores={btActive} />

                <div className='formGeneral'>
                  <FormModify
                    uri="usuario"
                    propiedades={["el nombre", "el apellido", "el usuario nuevo", "la contraseña antigua", "la nueva contraseña"]}
                  />
                </div>
              </div>
              <Footer />
            </> :
            <>
              <Header active={active} color={color} setting={setting} />
              <div className='modifyUserMain'>
                <div className='formUserModify'>
                  <FormModify
                    uri="usuario"
                    propiedades={["el nombre", "el apellido", "el usuario nuevo", "la contraseña antigua", "la nueva contraseña"]}
                  />
                </div>
              </div>
              <Footer />
            </>
      }


    </div>
  )
}
