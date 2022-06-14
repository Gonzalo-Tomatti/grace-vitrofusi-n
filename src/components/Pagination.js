import React, { useRef, useEffect } from "react";

const Pagination = ({ currentPage, getCurrentPage, numberOfPages }) => {
  const list = useRef(null);

  //AGREGAR LA CLASE ACTIVE AL BOTÓN DE LA PAGINACIÓN CUANDO SE CAMBIA DE PÁGINA
  useEffect(() => {
    Array.from(list.current.children).forEach((li) => {
      if (li.innerText == currentPage) {
        li.children[0].classList.add("bg-success");
        li.children[0].classList.remove("bg-dark");
      } else {
        li.children[0].classList.add("bg-dark");
        li.children[0].classList.remove("bg-success");
      }
    });
  }, [currentPage]);

  //CAMBIAR DE PÁGINA AL NÚMERO DE BOTÓN DE LA PAGINACIÓN CLICKEADO
  const handleCLick = (p) => {
    getCurrentPage(p);
  };

  return (
    <nav>
      <ul ref={list} className="pagination justify-content-center">
        {numberOfPages.map((p) => (
          <li className="page-item" key={p} onClick={() => handleCLick(p)}>
            <a
              className={`page-link text-light ${
                p == 1 ? "bg-success" : "bg-dark"
              }`}
              href="#"
            >
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
