import React from "react";
import actividades from "../static/img/actividades.png";
import asesoria_psicologica from "../static/img/asesoria_psicologica.png";
import estudio from "../static/img/estudio.png";

function Iniciosection1() {
  return (
    <div>
      <section className="section-inicio1-index">
        <div className="content-uno container-index">
          <h2 className="titulo-tipoh2">Los diferentes servicios</h2>
          <h3 className="titulo-tipoh3">Asesoría Psicológica</h3>
          <div className="item-group" />
          <div className="item-index">
            <img className="imagen-index" src={asesoria_psicologica} alt="asesoria_psicologica" />
            <br/>
            <p className="txt-p">
              HOLA---- El servicio de asesoría psicológica del SENA ofrece apoyo
              emocional y mental a los estudiantes. Proporciona un espacio
              confidencial para tratar problemas como el estrés académico, la
              ansiedad y la depresión. Los estudiantes pueden acceder a sesiones
              individuales con psicólogos, quienes les ayudan a desarrollar
              estrategias para manejar sus dificultades. Además, se organizan
              talleres sobre técnicas de manejo del estrés y habilidades de
              afrontamiento para mejorar el bienestar emocional y el rendimiento
              académico.
            </p>
            <hr className="linea" />
          </div>
          <br />
          <h3 className="titulo-tipoh3">Actividades Recreativas</h3>
          <div className="item-group" />
          <div className="item-index">
          <br/>
            <img className="imagen-index" src={actividades} alt="actividades" />
          <br/>
            <br/>
            <p className="txt-p">
              Las actividades recreativas en el SENA están diseñadas para
              promover el desarrollo integral de los estudiantes fuera del
              ámbito académico. Incluyen eventos deportivos, culturales y
              recreativos que fomentan la participación, el trabajo en equipo y
              el bienestar físico y mental. Estas actividades abarcan desde
              competencias deportivas y talleres artísticos hasta excursiones y
              eventos grupales, ayudando a los estudiantes a integrarse y
              disfrutar de una experiencia educativa más equilibrada.
            </p>
            <hr className="linea" />
            <br />
            <h3 className="titulo-tipoh3">Apoyo Académico</h3>
          </div>
          <div className="item-group" />
          <div className="item-index">
          <br/>
            <img className="imagen-index" src={estudio} alt="estudio" />
          <br/>
            <p className="txt-p">
              El apoyo académico del SENA proporciona asistencia para mejorar el
              rendimiento educativo de los estudiantes. Ofrece tutorías
              personalizadas, talleres de técnicas de estudio y asesoría en la
              planificación del tiempo. Los recursos incluyen materiales
              educativos adicionales y acceso a plataformas de aprendizaje,
              todos diseñados para ayudar a los estudiantes a superar
              dificultades académicas, optimizar sus habilidades de estudio y
              gestionar sus responsabilidades educativas de manera más efectiva.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Iniciosection1;
 