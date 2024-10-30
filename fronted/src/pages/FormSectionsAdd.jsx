import { React } from 'react'
import FormAdd from '../components/FormAdd'
import Menu from '../components/Menu'
import '../css/FormActivitiesAdd.css'
import Footer from '../components/Footer'
import logo from '../assets/logo.png'


export default function FormActivitiesAdd() {
  const btActive = 'activeMenu'


  return (
    <>
      <div className='directorView'>
      <div className='logoUnigest'>
          <img src={logo} alt="" width={"80%"} />
        </div>
        <Menu btSeccion={btActive} />
        <div className='formGeneral'>
          <FormAdd
            uri="secciones"
            propiedades={["el nombre", "el periodo academico"]}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
