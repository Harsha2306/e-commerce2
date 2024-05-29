/* eslint-disable react/prop-types */
import List from "@mui/joy/List";
import PaginationItem from "./PaginationItem";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from "@mui/icons-material/FirstPage";

const Pagination = ({ pagination, sendPage }) => {

  return (
    <List orientation="horizontal">
      <PaginationItem
        startIcon={<FirstPageIcon />}
        onClick={() => sendPage(pagination.first)}
        isDisabled={false}
      />
      <PaginationItem
        startIcon={<NavigateBeforeIcon />}
        onClick={() => sendPage(pagination.previous)}
        isDisabled={pagination.previous <= 0}
      />
      <PaginationItem
        startIcon={pagination.page}
        onClick={() => sendPage(pagination.page)}
        isDisabled={true}
      />
      <PaginationItem
        startIcon={<NavigateNextIcon />}
        onClick={() => sendPage(pagination.next)}
        isDisabled={pagination.next > pagination.last}
      />
      <PaginationItem
        startIcon={<LastPageIcon />}
        onClick={() => sendPage(pagination.last)}
        isDisabled={false}
      />
    </List>
  );
};

export default Pagination;
