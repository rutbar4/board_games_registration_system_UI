import * as React from "react";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import useAuth from "../Authentication/Auth/useAuth";
import LogIn from "../Authentication/log-in/LogIn";

import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MeniuToolbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const auth = useAuth();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={9} mt={2}>
        <Box>
          <AppBar position="static" open={open}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Board Game Registration System
                {/* LOGO */}
              </Typography>
              {auth.user && (
                <Typography
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  Hi {auth.user.username}!{/* LOGO */}
                </Typography>
              )}
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Register Play
              </Button>
              {!auth.isAuthenticated && (
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/log_in");
                  }}
                >
                  Log in
                </Button>
              )}
              {auth.isAuthenticated && (
                <Button
                  color="inherit"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding>
                {auth.isAuthenticated && auth.user && (
                  <ListItemButton
                    onClick={() => {
                      navigate("/user_profile");
                    }}
                  >
                    <ListItemText primary="My profile" />
                  </ListItemButton>
                )}
              </ListItem>
              <ListItem disablePadding>
                {auth.isAuthenticated && auth.organisation && (
                  <ListItemButton
                    onClick={() => {
                      navigate("/organisation_profile");
                    }}
                  >
                    <ListItemText primary="My profile" />
                  </ListItemButton>
                )}
              </ListItem>
              <ListItem disablePadding>
                {auth.isAuthenticated && (auth.organisation || auth.user) && (
                  <ListItemButton
                    onClick={() => {
                      navigate("/my_board_games");
                    }}
                  >
                    <ListItemText primary="My board games" />
                  </ListItemButton>
                )}
              </ListItem>
              <ListItem disablePadding>
                {!auth.organisation && (
                  <ListItemButton
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <ListItemText primary="Register play" />
                  </ListItemButton>
                )}
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/org_stat");
                  }}
                >
                  <ListItemText primary="Game play statistics" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    // navigate("/sign_up");
                  }}
                >
                  <ListItemText primary="Tournaments" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        </Box>
      </Grid>
    </Grid>
  );
}
