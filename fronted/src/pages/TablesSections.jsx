import React, { useEffect, useState } from 'react'
import Tables from "../components/Tables";
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../css/TableViewDirector.css'
import logo from '../assets/logo.png'
import Cookies from 'js-cookie'
import axios from 'axios';
import Error401 from '../components/Error401'

export default function TablesSections() {
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
          window.location.replace('/Error401')
        })
    }
    getData(token)
  }, [token])

  const btActive = 'activeMenu'
  return (

    <div>
      {
        active === 'Director' ?
          <>
            <section className='mainTable'>
              <div className='logoDirector'>
                <img src={logo} alt="" width={"80%"} />
              </div>
              <Menu btSeccion={btActive} />
              <article className='tableGeneral'>
                <Tables uri="secciones" />

              </article>
            </section>
            <Footer />
          </>
      : <Error401/>
    }
    </div >
  )
}
