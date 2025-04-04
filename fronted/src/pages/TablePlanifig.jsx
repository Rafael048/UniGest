import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Tables from "../components/Tables";
import Menu from '../components/Menu';
import '../css/TablesActivities.css'
import '../css/TableViewDirector.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import logo from '../assets/logo.png'


export default function TablesActivities() {
  const activities = true
  const btActive = 'activeMenu'
  const color = 'blue'
  const token = Cookies.get('jwt')
  const [active, setActive] = useState(null)
  const[loading, setLoading] = useState(true)
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
    <div className='activitiesView'>

{loading?
      <p>Cargando...</p>  
    :
        active === 'Director' ?
          <>
            <section className='mainTable'>
              <div className='logoDirector'>
                <img src={logo} alt="" width={"80%"} />
              </div>
              <Menu btProfesores={btActive} />
              <article className='tableGeneral'>
                <Tables uri="apms" />

              </article>
            </section>
            <Footer />
          </>
          : <>
            <Header active={active} color={color} planiAll={activities} />
            <section className='tableActivities'>
              <article className='tableShow'>
                <Tables
                  uri="apms"
                />
              </article>
            </section>
            <Footer />
          </>
      }
    </div>
  )
}
