const connection = require("../connection");
const UnitsControllers = require('../controllers/UnitsControllers')

class PMSModels {
  All(cedula,offset) {
    return new Promise((resolve, reject) => {
      let consulta = null
      console.log(cedula,offset)
      if(offset&&cedula){
        consulta =
       `SELECT profesores.nombre AS Nombre,profesores.apellido AS Apellido, materias.nombre AS Materias, secciones.nombre AS Secciones, p_m_s.id AS id
        FROM profesores
        JOIN p_m_s ON profesores.id = p_m_s.idProfesor 
        JOIN materias ON p_m_s.idMaterias = materias.id 
        JOIN secciones ON p_m_s.idSecciones = secciones.id
        WHERE profesores.cedula = ${cedula}
        LIMIT 6 
        OFFSET ${offset}`;
        }else if(cedula){
          consulta=
          `SELECT profesores.nombre AS Nombre,profesores.apellido AS Apellido, materias.nombre AS Materias, secciones.nombre AS Secciones, p_m_s.id AS id
            FROM profesores
            JOIN p_m_s ON profesores.id = p_m_s.idProfesor 
            JOIN materias ON p_m_s.idMaterias = materias.id 
            JOIN secciones ON p_m_s.idSecciones = secciones.id
            WHERE profesores.cedula = ${cedula}`
      }else{
        consulta =
          `SELECT profesores.nombre AS Nombre,profesores.apellido AS Apellido, materias.nombre AS Materias, secciones.nombre AS Secciones, p_m_s.id AS id, profesores.id AS idProf
          FROM profesores
          JOIN p_m_s ON profesores.id = p_m_s.idProfesor 
          JOIN materias ON p_m_s.idMaterias = materias.id 
          JOIN secciones ON p_m_s.idSecciones = secciones.id`;
      }
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          console.log(results)
          if(cedula!=null){
            results.forEach(element => {
              element.Materias_Secciones  = element.Materias + " - " + element.Secciones;
            });
            UnitsControllers.All(undefined)
            .then((unit) => {
                for (let i = 0; i < results.length; i++) {
                  results[i].unidades = []
                  for (let j = 0; j < unit.length; j++) {
                    if (results[i].id == unit[j].idClase) {
                      results[i].unidades.push(unit[j].unidad + " " + unit[j].tematica)
                    }
                  }
                }
              resolve(results)
            })
            .catch((e) => {
              reject(e)
            });
          }
          else{
            resolve(results)
          }
        }
      });
    });
  }
 
  Create(data) {
    return new Promise((resolve, reject) => {
      let idProfesor = data.idProfesor;
      let idMaterias = data.idMaterias;
      let idSecciones = data.idSecciones;
      if(idProfesor==undefined||idMaterias==undefined||idSecciones==undefined||idProfesor.trim()===" "||idMaterias.trim()===" "||idSecciones.trim()===" "){
        reject(new Error("No se pueden enviar datos vacios"))
      }
      let consult = `INSERT INTO p_m_s (idProfesor,idMaterias,idSecciones) VALUES (${idProfesor},${idMaterias},${idSecciones})`;
      connection.query(consult, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  Modify(id, data) {
    return new Promise((resolve, reject) => {
      let idProfesorVar = data.idProfesor;
      let idMateriasVar = data.idMaterias;
      let idSeccionesVar = data.idSecciones;
      if(idProfesorVar==undefined||idMateriasVar==undefined||idSeccionesVar==undefined||idProfesorVar.trim()===" "||idMateriasVar.trim()===" "||idSeccionesVar.trim()===" "){
        reject(new Error("No se pueden enviar datos vacios"))
      }
      let consulta = `UPDATE p_m_s SET idProfesor = ${idProfesorVar}, idMaterias = ${idMateriasVar}, idSecciones = ${idSeccionesVar} WHERE id = ${id} `;
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if(results.length===0){
            reject(new Error("No se encontro la clase asignada"))
        }
          resolve(results);
        }
      });
    });
  }

  Delete(idElemento) {
    return new Promise((resolve, reject) => {
      let consulta = `DELETE FROM p_m_s WHERE id = ${idElemento}`;
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = new PMSModels();
