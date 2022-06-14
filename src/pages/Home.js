import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      name: "Adornos",
      img: "images/adornos/1Adorno.jpg",
    },
    {
      name: "Bijouterie",
      img: "images/bijouterie/Anillos.jpg",
    },
    {
      name: "Ceniceros",
      img: "images/ceniceros/1Cenicero.jpg",
    },
    {
      name: "Espejos",
      img: "images/espejos/1espejo.jpg",
    },
    {
      name: "Floreros",
      img: "images/floreros/1florero.jpg",
    },
    {
      name: "Fuentes",
      img: "images/fuentes/1fuente.jpg",
    },
    {
      name: "Herrería",
      img: "images/herreria/1mariposa.jpg",
    },
    {
      name: "Llamadores",
      img: "images/llamadores/1llamador.jpg",
    },
    {
      name: "Llaveros",
      img: "images/llaveros/1llavero.jpg",
    },
    {
      name: "Platos",
      img: "images/platos/1plato.jpg",
    },
    {
      name: "Porta Velas",
      img: "images/porta-velas/1porta.jpg",
    },
    {
      name: "Tutores",
      img: "images/tutores/1lechuza.jpg",
    },
  ];
  return (
    <section className="text-center p-2 light-bg">
      <div className="container">
        <h1 className="my-3 fw-semibold title">Grace Vitrofusión</h1>
        <p className="subtitle fw-semibold fs-3">
          Objetos decorativos en vidrio para tu hogar.
        </p>
        <p>
          Los artículos exhibidos pueden ser personalizados mediante diferentes
          colores, medidas y diseños particulares de su preferencia.
        </p>
        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {categories.map((cat, index) => (
            <div key={index} className="col-12 p-3">
              {/* se pasa como parámetro la categoría clickeada */}
              <Link className="link" to={`/galeria/${cat.name.toLowerCase()}`}>
                <div className="card">
                  <img
                    src={cat.img}
                    alt="imagen"
                    className="card-img-top home-img"
                    loading="lazy"
                  />
                  <div className="card-body black-bg ">
                    <h3 className="card-title light-color">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
