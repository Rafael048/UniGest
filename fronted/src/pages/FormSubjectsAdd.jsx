import { React } from 'react'
import FormAdd from '../components/FormAdd'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import '../css/FormActivitiesAdd.css'
import logo from '../assets/logo.png'


export default function FormActivitiesAdd() {
  const btActive = 'activeMenu'

  return (
    <>
      <div className='directorView'>
        <div className='logoUnigest'>
          <img src={logo} alt="" width={"80%"} />
        </div>
        <Menu btMateria={btActive} />

        <div className='formGeneral'>
          <FormAdd
            uri="materias"
            propiedades={["el nombre", "el dia de clase"]}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
