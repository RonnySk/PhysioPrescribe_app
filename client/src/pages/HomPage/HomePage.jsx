import {
  Avatar,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <Box
      sx={{
        backgroundColor: "#EAEFF1",
        display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Dashboard />

      <Box
        sx={{
          backgroundColor: "#EAEFF1",
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Typography color="primary.dark" sx={{ m: 7 }}>
          WELCOME {user.name.toUpperCase()}
        </Typography>

        {user.isPhysiotherapist && (
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Link
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Patient
            </Link>
            <Link
              href="/exercises"
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Exercises
            </Link>
            <Link
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              New training Plan
            </Link>
          </Stack>
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
    </Box>
  );
}

export default HomePage;
