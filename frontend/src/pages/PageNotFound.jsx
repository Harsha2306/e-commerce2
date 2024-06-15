import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const PageNotFound = () => {
    useIsLoggedIn()
  return  <Container sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>;
};

export default PageNotFound;
