import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Tables from "../components/Tables";
import '../css/TablesActivities.css'
import '../css/TableViewDirector.css'
import axios from 'axios'
import Cookies from 'js-cookie'


export default function TablesActivities() {
  const activities = true
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
        
           <>
            <Header active={active} color={color} asig={activities} />
            <section className='tableActivities'>
              <article className='tableShow'>
                <Tables
                  uri="pms"
                />
              </article>
            </section>
            <Footer />
          </>
      }
    </div>
  )
}
