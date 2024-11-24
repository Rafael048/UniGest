import { React} from 'react'
import '../css/FormActivitiesAdd.css'
import FormAsing from '../components/FormAsing'
import Footer from '../components/Footer'
import Header from '../components/Header'


export default function FormActivitiesAdd() {
  const activities = true
  const color = 'blue'
  return (
    <>
            <Header active={"Profesor"} color={color} activities={activities} />
            <section className='tableActivities'>
              <article className='tableShow'>
                <FormAsing/>
              </article>
            </section>
            <Footer />
    </>
  )
}
