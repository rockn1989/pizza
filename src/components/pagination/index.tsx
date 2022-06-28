import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

type PaginationProps = {
  value: number,
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) =>  (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={value - 1}
  />
);
