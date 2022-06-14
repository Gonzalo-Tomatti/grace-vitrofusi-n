import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const Galery = () => {
  const { id } = useParams();
  const imagesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [currentOpenImage, setCurrentOpenImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState();
  const row = useRef(null);

  useEffect(() => {
    //OBTENER LAS IMÁGENES DE LA PÁGINA ACTUAL
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    setCurrentImages(allImages.slice(indexOfFirstImage, indexOfLastImage));

    //CALCULAR LA CANTIDAD DE PÁGINAS DE LA CATEGORÍA ACTUAL (en vez de un número es un array del 1 a N para usarse en la paginación)
    setNumberOfPages(() => {
      const numbers = [];
      for (let i = 1; i <= Math.ceil(allImages.length / imagesPerPage); i++) {
        numbers.push(i);
      }
      return numbers;
    });
  }, [currentPage, allImages]);

  //// IMPORTAR IMÁGENES DESDE LA CARPETA IMAGES ////

  //pasamos el contexto y usamos la función keys para que devuelva un array con el path de cada imagen dentro del contexto (cada elemento del array sería por ej ./adorno.png). Luego mapeamos ese array pasando el contexto como función lo que devuelve para cada imagen un path válido para poner en src como por ej /static/media/1lechuza.8a802242e0b4b127ee16.jpg
  function getImagesFromContext(r) {
    return r.keys().map(r);
  }
  //SE USA EL ID DE LA CATEGORÍA PARA CALCULAR LA CARPETA DE DÓNDE SE IMPORTAN LAS IMÁGENES
  function getImagesFromImageFolder() {
    let arrayOfImages = [];
    switch (id) {
      case "tutores":
        arrayOfImages = getImagesFromContext(
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
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/adornos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "bijouterie":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/bijouterie/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "ceniceros":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/ceniceros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "espejos":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/espejos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "floreros":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/floreros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "fuentes":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/fuentes/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "herrería":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/herreria/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llamadores":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/llamadores/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llaveros":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/llaveros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "platos":
        arrayOfImages = getImagesFromContext(
          require.context(
            `../../public/images/platos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "porta velas":
        arrayOfImages = getImagesFromContext(
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
    setAllImages(getImagesFromImageFolder());
  }, []);
  //// FIN DE IMPORTACIÓN DE IMÁGENES ///

  //ABRIR Y CERRAR IMÁGEN
  const toggleModal = (img) => {
    setIsModalOpen(!isModalOpen);
    setCurrentOpenImage(img);
  };

  //SE ABRE LA PRIMERA IMAGEN DE LA SIGUIENTE PÁGINA SI SE CLICKEÓ EN SIGUIENTE O LA ÚLTIMA DE LA ANTERIOR SI SE CLICKEÓ EN ATRÁS
  useEffect(() => {
    if (clickedBtn === "next") {
      setCurrentOpenImage(currentImages[0]);
    } else if (clickedBtn === "prev") {
      setCurrentOpenImage(currentImages[currentImages.length - 1]);
    }
  }, [currentImages]);

  //ENCONTRAR currentOpenImage EN LA <img> DEL DOM
  const locateCurrentImg = () => {
    //children de row es cada div con clase col
    const childrenOfRow = Array.from(row.current.children);
    //se busca en el primer hijo (<img>) del hijo (div con clase card) de cada hijo de row (currentImages) el que tenga el mismo src de la currentOpenImage (se cortan los primeros 21 caractéres ya que esa parte del path en el elemento <img> no está en el src de currentOpenImage)
    const currentDiv = childrenOfRow.find(
      (i) => i.children[0].children[0].src.slice(21) === currentOpenImage
    );
    return currentDiv.children[0].children[0];
  };

  //PASAR A LA SIGUIENTE IMAGEN
  const loadNext = () => {
    setClickedBtn("next");
    //se obtiene la imagen actual
    const currentImg = locateCurrentImg();
    //se obtiene la siguiente imagen si existe en currentImages
    const nextImg =
      currentImg.parentNode.parentNode.nextElementSibling &&
      currentImg.parentNode.parentNode.nextElementSibling.children[0]
        .children[0];
    //si no hay más imágenes se pasa a la siguiente página
    if (!nextImg) {
      if (currentPage !== numberOfPages.length) {
        setCurrentPage(currentPage + 1);
      } else {
        //si es la última página se vuelve a la primera
        setCurrentPage(1);
      }
    } else {
      //si existe una siguiente imagen se cambia la actual a la siguiente
      setCurrentOpenImage(nextImg.src.slice(21));
    }
  };

  //PASAR A LA IMAGEN ANTERIOR
  const loadPrev = () => {
    setClickedBtn("prev");
    //se obtiene la imagen actual
    const currentImg = locateCurrentImg();
    //se obtiene la imagen anterior si existe
    const previousImg =
      currentImg.parentNode.parentNode.previousElementSibling &&
      currentImg.parentNode.parentNode.previousElementSibling.children[0]
        .children[0];
    //si no hay más imágenes se pasa a la página anterior
    if (!previousImg) {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      } else {
        //si es la primera página se va a la última
        setCurrentPage(numberOfPages.length);
      }
    } else {
      //si existe una imagen anterior se cambia la actual a la anterior
      setCurrentOpenImage((prevPopUpImage) =>
        previousImg ? previousImg.src.slice(21) : prevPopUpImage
      );
    }
  };

  return (
    <section className="light-bg p-2 text-center">
      <div className="container ">
        {/* MODAL DE IMAGEN */}
        <div className={`${isModalOpen && "show-modal"} modal-overlay`}>
          <img
            className="currentOpenImage"
            src={currentOpenImage}
            alt="image"
          />

          <i
            onClick={toggleModal}
            className="bi bi-x-square close-modal-btn"
          ></i>

          <i
            onClick={() => loadNext()}
            className="bi bi-arrow-right-circle-fill"
          ></i>
          <i
            onClick={() => loadPrev()}
            className="bi bi-arrow-left-circle-fill"
          ></i>
        </div>
        {/* TÍTULO */}
        <h1 className="text-capitalize mt-2 mb-3">{id}</h1>
        <p>
          Para realizar algún pedido o consulta, por favor tome nota del código
          de artículo y diríjase a Contacto.
        </p>
        {/* IMÁGENES */}
        <div ref={row} className="row row-cols-sm-2 row-cols-md-3">
          {currentImages.map((image, index) => (
            <div key={index} className="col-12 p-3">
              <div className="card">
                <img
                  onClick={() => toggleModal(image)}
                  className="card-img-top galery-img"
                  src={image}
                  alt="imagen"
                  loading="lazy"
                ></img>
                <div className="card-body black-bg">
                  <p className="card-title text-center fs-4 light-color">
                    Código: {id}
                    {currentPage}.{index}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* PAGINACIÓN */}
        {numberOfPages.length > 1 && (
          <Pagination
            currentPage={currentPage}
            getCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
          />
        )}
      </div>
    </section>
  );
};

export default Galery;
