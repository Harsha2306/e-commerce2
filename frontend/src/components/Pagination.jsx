import React from "react";
import List from "@mui/joy/List";
import PaginationItem from "./PaginationItem";

const Pagination = ({ pagination, sendPage }) => {
  console.log(pagination);
  return (
    <List orientation="horizontal">
      <PaginationItem
        onClick={() => sendPage(pagination.previousPage)}
        to="Previous"
        isActive={false}
        isDisabled={pagination.previousIsDisabled}
      />
      <PaginationItem
        onClick={() => sendPage(pagination.first.page)}
        to="First"
        isActive={pagination.first.isActive}
        isDisabled={pagination.first.isDisabled}
      />
      <PaginationItem
        onClick={() => sendPage(pagination.second.page)}
        to={pagination.second.page}
        isActive={pagination.second.isActive}
        isDisabled={pagination.second.isDisabled}
      />
      <PaginationItem
        onClick={() => sendPage(pagination.third.page)}
        to="Last"
        isActive={pagination.third.isActive}
        isDisabled={pagination.third.isDisabled}
      />
      <PaginationItem
        onClick={() => sendPage(pagination.nextPage)}
        to="Next"
        isActive={false}
        isDisabled={pagination.nextIsDisabled}
      />
    </List>
  );
};

export default Pagination;
