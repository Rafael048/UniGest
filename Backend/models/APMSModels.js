const connection = require("../connection");

class APMSModels {
  All() {
    return new Promise((resolve, reject) => {
      let consult = `
                SELECT actividades.nombre AS title, profesores.nombre AS profesor, materias.nombre AS materia,
                secciones.nombre AS seccion,DATE_ADD(secciones.periodoAcademico, interval actividades.semana week) AS date,
                actividades.descripcion AS descripcion,p_m_s.idProfesor AS idProf, p_m_s.idMaterias AS idMat, p_m_s.idSecciones AS idSec, actividades.id AS idAct, materias.diaClase AS diaClase
                FROM actividades
                JOIN a_p_m_s ON actividades.id = a_p_m_s.idActividades
                JOIN p_m_s ON p_m_s.id = a_p_m_s.idPMS
                JOIN profesores ON p_m_s.idProfesor = profesores.id
                JOIN materias ON p_m_s.idMaterias = materias.id
                JOIN secciones ON p_m_s.idSecciones = secciones.id
            `;
      connection.query(consult, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          results.forEach(Element => {
            Element.date = Element.date.toISOString().slice(0,10).replace('T','')
          });
          resolve(results);
        }
      });
    });
  }
  Create(data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      let idPMS = data.idPMS;
      let idActividades = data.idActividades;
      if(idPMS==undefined||idActividades==undefined||idPMS.trim()==""||idActividades.trim()===""){
        reject(new Error("No se pueden pasar datos vacios"))
      }
      let consulta = `INSERT INTO a_p_m_s (idPMS,idActividades) VALUES (${idPMS},${idActividades})`;
      connection.query(consulta, function (error, results, fields) {
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
      let idPMS = data.idPMS;
      let idActividades = data.idActividades;
      if(idPMS==undefined||idActividades==undefined||idPMS.trim()==""||idActividades.trim()===""){
        reject(new Error("No se pueden pasar datos vacios"))
      }
      console.log(idPMS, idActividades);
      let consulta = `UPDATE a_p_m_s SET idPMS = ${idPMS}, idActividades = ${idActividades} WHERE id = ${id} `;
      connection.query(consulta, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if(results.length===0){
            reject(new Error("No se encontro la clase"))
        }
          resolve(results);
        }
      });
    });
  }

  Delete(idElemento) {
    return new Promise((resolve, reject) => {
      let consulta = `DELETE FROM a_p_m_s WHERE id = ${idElemento}`;
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

module.exports = new APMSModels();
