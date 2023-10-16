import {
  Avatar,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Paperbase from "../../components/Dashboard/Paperbase";
import Dashboard from "../../components/Dashboard/Dashboard";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function HomePage() {
  const { user } = useContext(AuthContext);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  console.log(user);

  return (
    <Box>
      {/* <Paperbase /> */}
      <Dashboard />
      <Typography>Welcome {user.name}</Typography>

      {user.isPhysiotherapist && (
        <>
          <Link>Patient</Link>
          <Link>Exercises</Link>
          <Link>New training Plan</Link>
        </>
      )}

      {!user.isPhysiotherapist && (
        <>
          <Typography>Name: {user.name}</Typography>

          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Your Trainings
            </Typography>
            <Demo>
              <List dense={dense}>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                )}
              </List>
            </Demo>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default HomePage;
