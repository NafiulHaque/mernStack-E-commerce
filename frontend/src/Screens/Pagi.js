import React from "react";

export default function Pagi(props) {
  const {
    postsPerPage,
    totalPosts,
    paginate,
    nextPage,
    prevPage,
    currentPage,
  } = props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          {currentPage !== 1 ? (
            <li className="page-item ">
              <a
                className="page-link"
                href="#"
                tabindex="-1"
                onClick={() => prevPage()}
              >
                Previous
              </a>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link" href="#" tabindex="-1">
                Previous
              </a>
            </li>
          )}
          {pageNumbers.map((num) => (
            <li className="page-item">
              <a className="page-link" onClick={() => paginate(num)} href="#">
                {" "}
                {num}
              </a>
            </li>
          ))}

          {currentPage < pageNumbers.length ? (
            <li className="page-item">
              <a className="page-link" onClick={() => nextPage()} href="#">
                Next
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
