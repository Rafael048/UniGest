const e = require("cors");
const connection = require("../connection");

class PMSModels {
  All(cedula) {
    return new Promise((resolve, reject) => {
      let consulta = null
      if(cedula===undefined){
        consulta =
          `SELECT profesores.nombre AS Nombre,profesores.apellido AS Apellido, materias.nombre AS Materias, secciones.nombre AS Secciones, p_m_s.id AS id, profesores.id AS idProf
          FROM profesores
          JOIN p_m_s ON profesores.id = p_m_s.idProfesor 
          JOIN materias ON p_m_s.idMaterias = materias.id 
          JOIN secciones ON p_m_s.idSecciones = secciones.id`;
      }else{
        consulta = `SELECT profesores.nombre AS Nombre,profesores.apellido AS Apellido, materias.nombre AS Materias, secciones.nombre AS Secciones, p_m_s.id AS id
          FROM profesores
          JOIN p_m_s ON profesores.id = p_m_s.idProfesor 
          JOIN materias ON p_m_s.idMaterias = materias.id 
          JOIN secciones ON p_m_s.idSecciones = secciones.id
          WHERE profesores.cedula = ${cedula}`;
      }
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if(cedula!=null){
            results.forEach(element => {
              element.Materias_Secciones  = element.Materias + " - " + element.Secciones;
            });
          }
          resolve(results);
        }
      });
    });
  }
  Create(data) {
    return new Promise((resolve, reject) => {
      let idProfesor = data.idProfesor;
      let idMaterias = data.idMaterias;
      let idSecciones = data.idSecciones;
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
      let consulta = `UPDATE p_m_s SET idProfesor = ${idProfesorVar}, idMaterias = ${idMateriasVar}, idSecciones = ${idSeccionesVar} WHERE id = ${id} `;
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
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
