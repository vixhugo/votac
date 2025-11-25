export default function VotoDigital() {
  const secciones = [
    {
      id: "fechas",
      titulo: "Fechas importantes",
      icono: "📅",
      items: [
        { titulo: "Fecha de elecciones", descripcion: "12 de abril de 2026." },
        { titulo: "Inicio de campaña", descripcion: "1 de marzo de 2026." },
        { titulo: "Cierre de campaña", descripcion: "10 de abril de 2026." },
        { titulo: "Publicación de resultados", descripcion: "13 de abril de 2026." },
      ],
    },
    {
      id: "requisitos",
      titulo: "Requisitos para votar",
      icono: "✓",
      items: [
        { titulo: "DNI vigente", descripcion: "Documento Nacional de Identidad actualizado." },
        { titulo: "Estar en el padrón", descripcion: "Verificar tu inscripción en el padrón electoral." },
        { titulo: "Mayoría de edad", descripcion: "Tener 18 años cumplidos al día de las elecciones." },
        { titulo: "Conexión a internet", descripcion: "Contar con una conexión estable para el voto digital." },
      ],
    },
    {
      id: "proceso",
      titulo: "Etapas del proceso",
      icono: "📄",
      items: [
        { titulo: "1. Autenticación", descripcion: "Ingreso al sistema con tu DNI y verificación de identidad." },
        { titulo: "2. Selección", descripcion: "Elección de las cédulas y cargos que te corresponden." },
        { titulo: "3. Emisión del voto", descripcion: "Marcación de tus opciones de forma segura y secreta." },
        { titulo: "4. Confirmación", descripcion: "Revisión del resumen de tu voto antes de enviarlo." },
      ],
    },
    {
      id: "seguridad",
      titulo: "Seguridad del sistema",
      icono: "🔒",
      items: [
        { titulo: "Encriptación", descripcion: "Los votos viajan cifrados de extremo a extremo." },
        { titulo: "Anonimato", descripcion: "Tu identidad se guarda separada de tu elección de voto." },
        { titulo: "Auditoría", descripcion: "El sistema puede ser revisado por organismos independientes." },
        { titulo: "Integridad", descripcion: "Una vez registrado, el voto no puede ser alterado ni eliminado." },
      ],
    },
  ];

  const pasosVotoDigital = [
    {
      paso: 1,
      titulo: "Acceso al sistema",
      descripcion: "Ingresas con tu DNI y los datos que el sistema te solicita para validar tu identidad.",
    },
    {
      paso: 2,
      titulo: "Verificación de datos",
      descripcion: "El sistema verifica que estés en el padrón y que no hayas emitido tu voto previamente.",
    },
    {
      paso: 3,
      titulo: "Selección de opciones",
      descripcion: "Visualizas las cédulas correspondientes y marcas tus preferencias de manera confidencial.",
    },
    {
      paso: 4,
      titulo: "Revisión del voto",
      descripcion: "Se muestra un resumen de tu voto para que confirmes que todo es correcto.",
    },
    {
      paso: 5,
      titulo: "Envío y registro",
      descripcion: "Al confirmar, tu voto se cifra y se registra en los servidores del sistema electoral.",
    },
    {
      paso: 6,
      titulo: "Comprobante digital",
      descripcion: "Recibes un comprobante digital que confirma que tu voto fue recibido por el sistema.",
    },
  ];

  const preguntasFrecuentes = [
    {
      pregunta: "¿El voto digital tiene la misma validez que el voto presencial?",
      respuesta: "Sí. El voto emitido a través del sistema digital tiene plena validez legal y se contabiliza de la misma forma que el voto presencial.",
    },
    {
      pregunta: "¿Qué pasa si se corta mi conexión a internet mientras voto?",
      respuesta: "Si la conexión se interrumpe antes de confirmar, el voto no se registra. Deberás ingresar nuevamente y repetir el proceso.",
    },
    {
      pregunta: "¿Necesito usuario y contraseña?",
      respuesta: "No. El acceso se realiza con tu DNI y los mecanismos de verificación definidos por el sistema electoral, junto con un código de seguridad en pantalla.",
    },
    {
      pregunta: "¿Puedo votar desde mi celular?",
      respuesta: "Sí. Puedes votar desde cualquier computadora, tablet o smartphone con conexión a internet y un navegador actualizado.",
    },
    {
      pregunta: "¿Puedo volver a ingresar después de votar?",
      respuesta: "Puedes ingresar para consultar, pero el sistema no permitirá registrar un segundo voto. Solo se contabiliza un voto por persona.",
    },
    {
      pregunta: "¿Quién tiene acceso a mis datos personales?",
      respuesta: "Tus datos se utilizan únicamente para validar tu identidad y evitar fraudes. Se almacenan bajo estrictas políticas de seguridad y confidencialidad.",
    },
  ];

  return (
    <div style={{ backgroundColor: "white", color: "#1f2937" }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .hero {
          background: linear-gradient(135deg, #8B1F1F 0%, #B82626 50%, #6B1818 100%);
          color: white;
          padding: 7rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(227, 30, 36, 0.1), transparent 50%);
          pointer-events: none;
        }

        .hero-content {
          max-width: 48rem;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: bold;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
        }

        .hero p {
          font-size: 1.125rem;
          color: #d1d5db;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.75rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: #E31E24;
          color: white;
        }

        .btn-primary:hover {
          background: #C41E3A;
          transform: scale(1.05);
        }

        .btn-secondary {
          border: 2px solid #9ca3af;
          color: #d1d5db;
          background: transparent;
        }

        .btn-secondary:hover {
          border-color: #E31E24;
          color: white;
        }

        section {
          padding: 5rem 2rem;
          max-width: 72rem;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: clamp(1.875rem, 4vw, 2.25rem);
          font-weight: bold;
          color: #111827;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 48rem;
          margin: 0 auto;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .card {
          background: white;
          border: 1px solid #e5e7eb;
          border-left: 4px solid #E31E24;
          border-radius: 0.75rem;
          padding: 1.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .card-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(227, 30, 36, 0.1);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E31E24;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .card h3 {
          font-size: 1.125rem;
          font-weight: bold;
          color: #111827;
        }

        .card ul {
          list-style: none;
        }

        .card li {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .card li::before {
          content: '✓';
          color: #E31E24;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .card li strong {
          font-weight: 600;
          color: #111827;
        }

        .card li span {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .step {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .step:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-color: rgba(227, 30, 36, 0.3);
        }

        .step-number {
          width: 2.5rem;
          height: 2.5rem;
          background: #E31E24;
          color: white;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .step h4 {
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .step p {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.5;
        }

        .faq-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-color: rgba(227, 30, 36, 0.3);
        }

        .faq-question {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .faq-answer {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .cta-box {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.75rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          transition: box-shadow 0.3s ease;
        }

        .cta-box:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cta-content {
          flex: 1;
          min-width: 250px;
        }

        .cta-content h3 {
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .cta-content p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .cta-button {
          flex-shrink: 0;
        }

        .bg-light {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .bg-white {
          background: white;
        }

        @media (max-width: 768px) {
          .button-group {
            flex-direction: column;
          }

          .button-group .btn {
            width: 100%;
            justify-content: center;
          }

          .cta-box {
            flex-direction: column;
            align-items: flex-start;
          }

          .cta-button {
            width: 100%;
          }

          .cta-button .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>¿Qué es el voto digital?</h1>
          <p>Es la modalidad que te permite participar en las elecciones a través de internet, usando un sistema oficial, seguro y auditable.</p>
          <div className="button-group">
            <button className="btn btn-primary">🗳️ Ir al sistema de votación</button>
            <a href="#proceso" className="btn btn-secondary">Conocer cómo funciona</a>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN CLAVE */}
      <section className="bg-light">
        <div className="section-header">
          <h2>Información clave del voto digital</h2>
          <p>Antes de votar, revisa estas secciones con los aspectos más importantes sobre fechas, requisitos, etapas y seguridad del sistema.</p>
        </div>

        <div className="cards-grid">
          {secciones.map((seccion) => (
            <div key={seccion.id} className="card">
              <div className="card-header">
                <div className="card-icon">{seccion.icono}</div>
                <h3>{seccion.titulo}</h3>
              </div>
              <ul>
                {seccion.items.map((item, i) => (
                  <li key={i}>
                    <strong>{item.titulo}</strong>
                    <span>{item.descripcion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESO PASO A PASO */}
      <section id="proceso" className="bg-white">
        <div className="section-header">
          <h2>¿Cómo funciona el voto digital?</h2>
          <p>El proceso está pensado para ser claro y sencillo. Estos son los pasos que seguirás el día de las elecciones.</p>
        </div>

        <div className="steps-grid">
          {pasosVotoDigital.map((item) => (
            <div key={item.paso} className="step">
              <div className="step-number">{item.paso}</div>
              <h4>{item.titulo}</h4>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="bg-light">
        <div className="section-header">
          <h2>Preguntas frecuentes</h2>
          <p>Si tienes dudas, es probable que la respuesta esté aquí. Lee con calma antes de ingresar al sistema.</p>
        </div>

        <div>
          {preguntasFrecuentes.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">{faq.pregunta}</div>
              <div className="faq-answer">{faq.respuesta}</div>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div style={{ marginTop: "3rem" }}>
          <div className="cta-box">
            <div className="cta-content">
              <h3>¿Listo para ejercer tu derecho al voto digital?</h3>
              <p>Cuando el proceso electoral esté habilitado podrás ingresar con tu DNI y registrar tu voto de forma rápida y segura.</p>
            </div>
            <div className="cta-button">
              <button className="btn btn-primary">🗳️ Ir a votar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}