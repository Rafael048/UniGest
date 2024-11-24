import { React } from 'react'
import FormAdd from '../components/FormAdd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/FormActivitiesAdd.css'
import logo from '../assets/logo.png'


export default function FormActivitiesAdd() {
  const activities = true
  const color = 'blue'

  return (
    <>
     <Header active={"Profesor"} color={color} activities={activities} />
            <section className='tableActivities'>
              <article className='tableShow'>
              <FormAdd
            uri="unidades"
            propiedades={["la unidad", "el tema"]}
          />
              </article>
            </section>
            <Footer />
    </>
  )
}
