import * as React from "react";
import AppBar from "@mui/material/AppBar";
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

export default function MeniuToolbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const auth = useAuth();

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={9} mt={2}>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Board Game Registration System ({auth.user && auth.user.name})
                {/* LOGO */}
              </Typography>
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

              {!auth.isAuthenticated && (
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/sign_up");
                  }}
                >
                  Sign Up
                </Button>
              )}
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
    </Grid>
  );
}
