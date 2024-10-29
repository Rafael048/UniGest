import Calendar from "../components/Calendar";
import React, { useState, useEffect } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu';
import '../css/TablesActivities.css'
import '../css/TableViewDirector.css'
import axios from "axios";
import Cookies from 'js-cookie'
import logo from '../assets/logo.png'

export default function CalendarPage() {
  const plani = true
  const btIni = 'activeMenu'
  const color = 'blue'
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
    <div className='activitiesView'>
      {
        active === 'Director' ?
          <>
            <section className='mainTable'>
              <div className='logoDirector'>
                <img src={logo} alt="" width={"80%"} />
              </div>
              <Menu btIni={btIni} />
              <article className='tableGeneral'>
                <Calendar />

              </article>
            </section>
            <Footer />
          </>
          : <>
            <Header active={active} color={color} plani={plani} />
            <section className='calendarProfesor '>
              <article className='calendarProfesor'>
                <Calendar />
              </article>

            </section>
            <Footer />
          </>
      }
    </div>
  )
}