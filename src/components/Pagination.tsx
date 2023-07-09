interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-5 mb-20">
      <ul className="pagination flex">
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ml-5 ${currentPage === pageNumber + 1 ? "active" : ""}`}
          >
            <button onClick={() => paginate(pageNumber + 1)} className="page-link">
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
