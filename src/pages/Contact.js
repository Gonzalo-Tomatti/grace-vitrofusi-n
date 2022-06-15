import React from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_zk0gkje", //service id
        "template_ta7kmf4", //template id
        e.target,
        "KNxP9-XcginUiypWH" //public key
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset(); //limpiar campos
  };

  return (
    <section className="light-bg p-3 section">
      <a href="/#/acerca-de-grace">PRUEBA</a>
      <div className="container">
        <h1>Contacto</h1>
        <p className="p">
          Para ponerse en contacto, por favor complete el formulario a
          continuación y a la brevedad responderé a su consulta.
        </p>
        <p className="p">
          Si lo prefiere, también puede comunicarse al{" "}
          <i className="bi bi-whatsapp text-success"></i> 221 6903273.
        </p>
        <p className="p"> Muchas gracias.</p>
        <form onSubmit={sendEmail}>
          <label htmlFor="name" className="form-label mt-3">
            Nombre
          </label>
          <input
            type="text"
            className="form-input"
            name="name"
            id="name"
            placeholder="Ingrese su nombre"
          ></input>

          <label htmlFor="email" className="form-label mt-3">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            name="email"
            id="email"
            placeholder="Ingrese su correo electrónico"
          ></input>

          <label htmlFor="message" className="form-label mt-3">
            Mensaje
          </label>
          <textarea
            id="message"
            cols="30"
            rows="4"
            className="form-input textarea"
            name="message"
          ></textarea>

          <button type="submit" className="btn btn-dark m-2">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
