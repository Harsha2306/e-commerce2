import { useState } from "react";
import TuneIcon from "@mui/icons-material/TuneRounded";
import {
  Drawer,
  Box,
  DialogTitle,
  ModalClose,
  Button,
  Divider,
  Accordion,
  AccordionGroup,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/joy";
import { List, ListItem, Grid } from "@mui/material";
import StyledButton from "./StyledButton";

const FilterAndSort = ({ sendFilterOptions }) => {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [price, setPrice] = useState("none");
  const [catShoes, setCatShoes] = useState(false);
  const [catClothing, setCatClothing] = useState(false);
  const [catAccessories, setCatAccessories] = useState(false);

  const applyButtonClickHandler = () => {
    let category = [];
    if (catShoes) category.push("Shoes");
    if (catClothing) category.push("Clothes");
    if (catAccessories) category.push("Accessories");
    let filterOptions = {};
    if (sortBy !== "none") filterOptions.sortBy = sortBy;
    if (price !== "none") {
      const [min, max] = price.split("-");
      filterOptions.min = min;
      if (max !== undefined) filterOptions.max = max;
    }
    if (category.length !== 0) filterOptions.category = category;
    sendFilterOptions(filterOptions);
    setOpen(false);
  };

  const onSortByChangeHandler = (e) => {
    setSortBy(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}
    >
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Change filters
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Filter & Sort</DialogTitle>
        <Divider />
        <AccordionGroup>
          <Accordion>
            <AccordionSummary>SORT BY</AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                name="radio-buttons-group"
                value={sortBy}
                onChange={onSortByChangeHandler}
              >
                <Radio color="neutral" value="asc" label="Price low to high" />
                <Radio color="neutral" value="dsc" label="Price high to low" />
                <Radio color="neutral" value="latest" label="Newest" />
                <Radio color="neutral" value="none" label="None" />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>CATEGORY</AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <Checkbox
                    onChange={() => setCatShoes(!catShoes)}
                    color="neutral"
                    label="Shoes"
                  />
                </ListItem>
                <ListItem>
                  <Checkbox
                    onChange={() => setCatClothing(!catClothing)}
                    color="neutral"
                    label="Clothing"
                  />
                </ListItem>
                <ListItem>
                  <Checkbox
                    onChange={() => setCatAccessories(!catAccessories)}
                    color="neutral"
                    label="Accessories"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>PRICE</AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                name="radio-buttons-group"
                value={price}
                onChange={priceChangeHandler}
              >
                <Radio color="neutral" value="500-3000" label="500 - 3,000" />
                <Radio
                  color="neutral"
                  value="3000-5000"
                  label="3,000 - 5,000"
                />
                <Radio
                  color="neutral"
                  value="5000-7000"
                  label="5,000 - 7,000"
                />
                <Radio color="neutral" value="7000" label="More than 7,000" />
                <Radio color="neutral" value="none" label="None" />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        <Grid
          display="flex"
          justifyContent="center"
          sx={{ bottom: "10px" }}
          mb={2}
        >
          <StyledButton
            onClick={applyButtonClickHandler}
            variant="contained"
            text="apply"
            width="90%"
            height="40px"
            color="white"
            backgroundColor="black"
            hoverStyles={{ color: "white", backgroundColor: "black" }}
          />
        </Grid>
      </Drawer>
    </Box>
  );
};

export default FilterAndSort;
