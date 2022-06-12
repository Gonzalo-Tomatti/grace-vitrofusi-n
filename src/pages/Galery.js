import React from "react";
import { useParams } from "react-router-dom";

const Galery = () => {
  const { id } = useParams();
  let listOfImages = [];

  function importAll(r) {
    return r.keys().map(r);
  }
  function componentWillMount() {
    switch (id) {
      case "tutores":
        listOfImages = importAll(
          require.context(
            `../../public/images/tutores/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "adornos":
        listOfImages = importAll(
          require.context(
            `../../public/images/adornos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "bijouterie":
        listOfImages = importAll(
          require.context(
            `../../public/images/bijouterie/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "ceniceros":
        listOfImages = importAll(
          require.context(
            `../../public/images/ceniceros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "espejos":
        listOfImages = importAll(
          require.context(
            `../../public/images/espejos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "floreros":
        listOfImages = importAll(
          require.context(
            `../../public/images/floreros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "fuentes":
        listOfImages = importAll(
          require.context(
            `../../public/images/fuentes/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "herrería":
        listOfImages = importAll(
          require.context(
            `../../public/images/herreria/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llamadores":
        listOfImages = importAll(
          require.context(
            `../../public/images/llamadores/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "llaveros":
        listOfImages = importAll(
          require.context(
            `../../public/images/llaveros/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "platos":
        listOfImages = importAll(
          require.context(
            `../../public/images/platos/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
      case "porta velas":
        listOfImages = importAll(
          require.context(
            `../../public/images/porta-velas/`,
            false,
            /.(png|JPG|jpe?g|svg)$/
          )
        );
        break;
    }
  }

  componentWillMount();

  return (
    <div>
      {listOfImages.map((image, index) => (
        <img className="galery-img" key={index} src={image} alt="info"></img>
      ))}
    </div>
  );
};

export default Galery;
