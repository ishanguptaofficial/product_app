import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Logo from "../utils/Image/logo.jpeg";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

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

export default function SideBar({togglePageMargin}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(false);

  const toggleTab = () => {
    setOpenTab(!openTab);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    togglePageMargin(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    togglePageMargin(false)
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box style={{width:"100%", display: "flex", justifyContent: "space-between" }}>
            <Box>{""}</Box>
            <Button
              color="inherit"
              onClick={() => alert("Logout Successfully")}
            >
              <LogoutIcon />
              &nbsp; Logout
            </Button>
          </Box>
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
              <>
                <img src={Logo} alt="amrytt Logo" style={{ width: "50px" }} />
                <br />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  style={{ fontSize: "15px" }}
                >
                  AMRYTT MEDIA LLC
                </Typography>
                <ChevronRightIcon />
              </>
            ) : (
              <>
                <ChevronRightIcon />
              </>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => toggleTab()}>
            <ListItemIcon>
              <ListItemText primary="Website List" />
            </ListItemIcon>
            {openTab ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText primary="Website 1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Website 2" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Website 3" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
}
