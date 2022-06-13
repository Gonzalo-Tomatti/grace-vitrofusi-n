import React, { useRef, useEffect } from "react";

const Pagination = ({ currentPage, getCurrentPage, numberOfPages }) => {
  const list = useRef(null);

  //AGREGAR LA CLASE ACTIVE AL BOTÓN DE LA PAGINACIÓN CUANDO SE CAMBIA DE PÁGINA
  useEffect(() => {
    Array.from(list.current.children).forEach((li) => {
      if (li.innerText == currentPage) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }, [currentPage]);

  //CAMBIAR DE PÁGINA AL NÚMERO DE BOTÓN DE LA PAGINACIÓN CLICKEADO
  const handleCLick = (p) => {
    getCurrentPage(p);
  };

  return (
    <nav>
      <ul ref={list} className="pagination justify-content-center mt-5">
        {numberOfPages.map((p) => (
          <li
            className={`page-item ${p == 1 && "active"}`}
            key={p}
            onClick={() => handleCLick(p)}
          >
            <a className="page-link" href="#">
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
