import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Fastfood from "@material-ui/icons/Fastfood";
import Place from "@material-ui/icons/Place";
import WebIcon from "@material-ui/icons/Web";
import AssignMent from "@material-ui/icons/Assignment"
import MenuOutlined from "@material-ui/icons/MenuOutlined";
import AccountBox from "@material-ui/icons/AccountBox";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import "./DrawerAppBar.css";

class DrawerAppBar extends React.Component {

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };
    
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    render() {
        var sideList = (
            <div>
                <List>
                    <ListItem button key="user" >
                        <ListItemIcon>
                            <AccountBox className="accountIcon" />
                        </ListItemIcon>
                        <ListItemText primary={localStorage.getItem("userName")} secondary={localStorage.getItem("userMail")} />
                    </ListItem>
                    <Divider/>

                    <ListItem button key="retiros" component={Link} to="/app/retiros" >
                        <ListItemIcon>
                            <AssignMent/>
                        </ListItemIcon>
                        <ListItemText primary="Retiros" />
                    </ListItem>
                    <ListItem button key="postretiros" component={Link} to="/app/postretiros" >
                        <ListItemIcon>
                            <WebIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Retirar Material" />
                    </ListItem>
                    <ListItem button key="materiales" component={Link} to="/app/materiales">
                        <ListItemIcon>
                            <AssignMent/>
                        </ListItemIcon>
                        <ListItemText primary="Materiales" />
                    </ListItem>
                    <ListItem button key="postmateriales" component={Link} to="/app/postmateriales" >
                        <ListItemIcon>
                           <WebIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Ingresar Material" />
                    </ListItem>
                    <ListItem button key="producido" component={Link} to="/app/producido">
                        <ListItemIcon>
                            <AssignMent/>
                        </ListItemIcon>
                        <ListItemText primary="Producido" />
                    </ListItem>
                    <ListItem button key="postproducido" component={Link} to="/app/postproducido" >
                        <ListItemIcon>
                           <WebIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Ingresar Producido" />
                    </ListItem>
                </List>
            </div>
        );
        if (this.state.logout === true) {
            return (<Redirect to="/"/>);
        }
        return (
            <div>
                <AppBar title="My App" position="relative">
                    <Toolbar>
                        <IconButton style={styles.menuButton} onClick={this.toggleDrawer("left", true)} >
                            <MenuOutlined />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="grow" >
                            ROCHA - Manejador de Inventario
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    onOpen={this.toggleDrawer("left", true)}
                >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer("left", false)}
                    onKeyDown={this.toggleDrawer("left", false)}
                >
                    {sideList}
                </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

export default DrawerAppBar;