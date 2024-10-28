import { React, useEffect } from 'react'
import FormModify from '../components/Formmodify'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import '../css/FormActivitiesAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../assets/logo.png'


export default function FormActivitiesAdd() {
  const btActive = 'activeMenu'
  const token = Cookies.get('jwt')
  useEffect(() => {
    async function getData(token) {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
            console.log("Todo Piola")
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getData(token)
  }, [token])



  return (
    <div>
      
          <>
            <div className='directorView'>
              <div className='logoDirectorSolo'>
                <img src={logo} alt="" width={"80%"} />
              </div>
              <Menu btProfesores={btActive} />

              <div className='formGeneral'>
              <FormModify
                uri="usuario"
                propiedades={["el nombre", "el apellido","el usuario nuevo","la contraseña antigua","la nueva contraseña"]}
              />
              </div>
            </div>
            <Footer />
          </>
          
      
    </div>
  )
}
