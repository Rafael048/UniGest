import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import FormModify from '../components/Formmodify'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import '../css/FormActivitiesAdd.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../assets/logo.png'


export default function FormActivitiesAdd() {
  const activities = true
  const btActive = 'activeMenu'
  const token = Cookies.get('jwt')
  const [active, setActive] = useState(null)
  useEffect(() => {
    async function getData(token) {
      await axios.get(`http://localhost:3000/verify/${token}`)
        .then((result) => {
          setActive(result.data.user.rol)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getData(token)
  }, [token])



  return (
    <div>
      {
        active === 'Director' ?
          <>
            <div className='directorView'>
              <div className='logoDirectorSolo'>
                <img src={logo} alt="" width={"80%"} />
              </div>
              <Menu btMateria={btActive} />

              <div className='formGeneral'>
              <FormModify
            uri="materias"
            propiedades={["el nombre", "el dia de clase"]}
          />
              </div>
            </div>
            <Footer />
          </>
          :
          <div className='addActivities'>
            <Header active={active} activities={activities} />
            <div className='addAct'>
            <FormModify
            uri="materias"
            propiedades={["el nombre", "el dia de clase"]}
          />
            </div>
          </div>

      }
    </div>
  )
}
