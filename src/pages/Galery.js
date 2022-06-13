import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const Galery = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(6);
  const [allImages, setAllImages] = useState([]);

  //pasamos el contexto y usamos la función keys para que devuelva un array con el path de cada imagen dentro del contexto (cada elemento del array sería por ej ./adorno.png). Luego mapeamos ese array pasando el contexto como función lo que devuelve para cada imagen un path válido para poner en src como por ej /static/media/1lechuza.8a802242e0b4b127ee16.jpg
  function importAll(r) {
    return r.keys().map(r);
  }
  function componentWillMount() {
    let arrayOfImages = [];
    switch (id) {
      case "tutores":
        arrayOfImages = importAll(
          //el contexto es una función que devuelve el directorio especificado
          //false indica que no busque en subdirectorios
          //toma los archivos que sean válidos para la regex (regular expression) que estén dentro del contexto
          require.context(
            `../../public/images/tutores/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "adornos":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/adornos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "bijouterie":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/bijouterie/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "ceniceros":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/ceniceros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "espejos":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/espejos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "floreros":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/floreros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "fuentes":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/fuentes/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "herrería":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/herreria/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llamadores":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/llamadores/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llaveros":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/llaveros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "platos":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/platos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "porta velas":
        arrayOfImages = importAll(
          require.context(
            `../../public/images/porta-velas/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
    }
    return arrayOfImages;
  }
  useEffect(() => {
    setAllImages(componentWillMount());
  }, []);

  //calcular imágenes actuales
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div>
      {currentImages.map((image, index) => (
        <img className="galery-img" key={index} src={image} alt="info"></img>
      ))}
      <Pagination
        getCurrentPage={setCurrentPage}
        imagesPerPage={imagesPerPage}
        totalImages={allImages.length}
      />
    </div>
  );
};

export default Galery;
