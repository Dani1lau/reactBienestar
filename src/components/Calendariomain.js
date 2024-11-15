import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getProgramacionesPorFicha, getFichas } from "../api/api";

function Calendariomain() {
  const [fichas, setFichas] = useState([]); // Guardará las fichas obtenidas de la API
  const [filteredFichas, setFilteredFichas] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState(""); // Almacena la ficha seleccionada
  const [coordinacion, setCoordinacion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://serverbienestar-production.up.railway.app/api";
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Array de nombres de los meses
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const generateDaysArray = (year, month, events) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const event = events.find(e => e.fecha === dateStr);
      daysArray.push({
        day: i,
        dateStr: dateStr,
        hasEvent: !!event,
      });
    }

    return daysArray;
  };

  const handleDayClick = (dateStr) => {
    const dailyEvents = events.filter(e => e.fecha === dateStr);
  
    if (dailyEvents.length > 0) {
      const eventDetails = dailyEvents.map(e => 
        `<div style="
          background-color: #f2f2f2;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 0px;
          text-align: left;
          font-family: Arial, sans-serif;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        ">
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Taller:</strong> <span>${e.nombre_Taller}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Capacitador:</strong> <span>${e.nombre_Capacitador}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Instructor:</strong> <span>${e.nombre_Instructor}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Detalles:</strong> <span>${e.descripcion_procaptall}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Ubicación:</strong> <span>${e.sede_procaptall}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Ambiente:</strong> <span>${e.ambiente_procaptall}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Fecha:</strong> <span>${e.fecha}</span>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #333;">Horario:</strong> <span>${e.horaInicio_procaptall} - ${e.horaFin_procaptall}</span>
          </div>
        </div>`).join('<hr style="border: 1px solid #ccc; margin: 8px 0;" />');
  
      Swal.fire({
        title: `<h3 style="color: #5cb85c; margin: 0; font-weight: bold;">Detalles del Taller</h3>`,
        html: eventDetails,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#5cb85c', // Verde más suave para confirmar
        width: 450, // Un poco más ancho para que no se vea tan estrecho
        background: '#fff',
        customClass: {
          popup: 'swal2-custom-popup'
        }
      });
    } else {
      Swal.fire({
        title: 'Sin Programación',
        text: 'No hay eventos programados para este día.',
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#5cb85c',
      });
    }
  };

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ficha`); // Cambia esto por la URL de tu API
        const data = await response.json();
        setFichas(data);
        setFilteredFichas(data); // Inicializa el estado con todas las fichas
      } catch (error) {
        console.error("Error al obtener fichas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, []);

  const handleFichaChange = (event) => {
    const searchText = event.target.value;
    setSelectedFicha(searchText); // Permite escribir el texto libre
    const filteredFichas = fichas.filter((ficha) =>
      ficha.numero_Ficha.toString().includes(searchText) // Filtrar por numero_Ficha
    );
    setFilteredFichas(filteredFichas); // Actualiza las fichas filtradas
  };

  const handleFichaSelect = (ficha) => {
    setSelectedFicha(ficha.numero_Ficha); // Establece el valor de la ficha seleccionada
    setCoordinacion(ficha.cordinacion_Ficha);
    setEspecialidad(ficha.especialidad_Ficha);
    setFilteredFichas([]); // Oculta las opciones una vez seleccionada
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ficha = selectedFicha; // La ficha seleccionada

    try {
        const response = await getProgramacionesPorFicha(ficha); // Obtener las programaciones
        console.log("datos de la API:", response);

        // Usar un Set para eliminar duplicados basados en la fecha y el nombre del taller
        const uniqueEvents = [];
        const seen = new Set();

        response.forEach(item => {
            // Verificar si cada item tiene las propiedades necesarias antes de usar
            if (item.fecha_procaptall && item.nombre_Taller) {
                const formattedDate = new Date(item.fecha_procaptall).toISOString().split('T')[0];
                const key = `${formattedDate}-${item.nombre_Taller}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueEvents.push({
                        sede_procaptall: item.sede_procaptall,
                        descripcion_procaptall: item.descripcion_procaptall,
                        ambiente_procaptall: item.ambiente_procaptall,
                        fecha: formattedDate,
                        horaInicio_procaptall: item.horaInicio_procaptall,
                        horaFin_procaptall: item.horaFin_procaptall,
                        numero_FichaFK: item.numero_FichaFK,
                        nombre_Taller: item.nombre_Taller,
                        nombre_Capacitador: item.nombre_Capacitador,
                        nombre_Instructor: item.nombre_Instructor,
                    });
                }
            }
        });

        console.log("Eventos únicos mapeados:", uniqueEvents);
        setEvents(uniqueEvents);

        const daysArray = generateDaysArray(currentYear, currentMonth, uniqueEvents);
        setDaysInMonth(daysArray);
        setCalendarVisible(true); // Mostrar el calendario

    } catch (error) {
        console.error("Error al obtener programaciones:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo obtener la programación.",
            icon: "error",
            confirmButtonText: "Cerrar",
        });
    }
};

  return (
    <main>
      <div className="form-container-calendariousua">
        <h2 className="Titulo-calendariousua">
          Seleccione Ficha y Coordinación
        </h2>
        <form id="selection-form" onSubmit={handleSubmit}>
          <label className="label-ficha-calendariousua" htmlFor="ficha">
            Ficha:
          </label>
          <input
            className="input-calendariousua"
            type="text"
            id="ficha"
            name="ficha"
            value={selectedFicha} // Vincula el valor con selectedFicha
            onChange={handleFichaChange} // Permite editar el valor
            autoComplete="off"
            placeholder="Escriba para buscar ficha..."
            required
          />
          <ul className="ficha-dropdown">
            {filteredFichas.length > 0 &&
              filteredFichas.map((ficha) => (
                <li key={ficha.numero_Ficha} onClick={() => handleFichaSelect(ficha)}>
                  {ficha.numero_Ficha}
                </li>
              ))}
          </ul>

          <label className="label-ficha-calendariousua" htmlFor="coordinacion">
            Coordinación:
          </label>
          <input
            className="input-calendariousua"
            type="text"
            id="coordinacion"
            name="coordinacion"
            value={coordinacion}
            readOnly
          />

          <label className="label-ficha-calendariousua" htmlFor="especialidad">
            Especialidad:
          </label>
          <input
            className="input-calendariousua"
            type="text"
            id="especialidad"
            name="especialidad"
            value={especialidad}
            readOnly
          />

          <button className="boton-calendarioUsuario" type="submit">
            Mostrar Calendario
          </button>
        </form>
      </div>
      {calendarVisible && (
        <div className="calendar-container">
          <h3>{monthNames[currentMonth]} {currentYear}</h3> {/* Nombre del mes */}
          <div className="calendar-grid">
            {daysInMonth.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day.hasEvent ? "event" : ""}`}
                onClick={() => handleDayClick(day.dateStr)}
              >
                <span>{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Calendariomain;
