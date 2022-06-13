import React, { useRef } from "react";

const Pagination = ({ getCurrentPage, imagesPerPage, totalImages }) => {
  const list = useRef(null);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCLick = (p) => {
    Array.from(list.current.children).forEach((li) => {
      if (li.innerText == p) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
    getCurrentPage(p);
  };
  return (
    <nav>
      <ul ref={list} className="pagination justify-content-center my-5">
        {pageNumbers.map((p) => (
          <li className="page-item" key={p} onClick={() => handleCLick(p)}>
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
