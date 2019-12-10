import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import PresentToAll from "@material-ui/icons/PresentToAll";
import { Select, MenuItem, TextField } from "@material-ui/core";
import MaterialItem from "./MaterialesItem";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./AddNewMaterial.css";

class AddNewMaterial extends React.Component {

    constructor(props){
        super(props);
        this.createAxiosInstance();
        this.state = {
            titulo : "",
            tipo : "",
            precio : 0,
            descripcion : "",
            kiosko : "",
            imageURL : "undefined",
            fireRedirect : false
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance.post("/kioskos/menuItems/post?titulo="+this.state.titulo+"&tipo="+this.state.tipo+"&precio="+this.state.precio+"&descripcion="+this.state.descripcion+"&kiosko="+this.state.kiosko+"&imageURL="+this.state.imageURL, {
            titulo : this.state.titulo,
            tipo : this.state.tipo,
            precio : this.state.precio,
            descripcion : this.state.descripcion,
            kiosko : this.state.kiosko,
            imageURL : this.state.imageURL
        }).then((response) => {
            this.setState({
                fireRedirect : true
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        return(
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <PresentToAll color="secondary" className="svg_icons"/>
                        <Typography variant="h4">Publicar un Material</Typography>
                        <form className="form" onSubmit={this.handleSubmit} name="login-form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="titulo">Título</InputLabel>
                                <Input id="titulo" name="titulo" autoFocus 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="tipo">Tipo</InputLabel>
                                <Select 
                                    inputProps={{name:"tipo", id:"tipo"}}
                                    value={this.state.tipo}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="Normal">
                                        <em>Elegir tipo</em>
                                    </MenuItem>
                                    <MenuItem value="A">Almuerzo</MenuItem>
                                    <MenuItem value="D">Desayuno</MenuItem>
                                    <MenuItem value="I">Individual</MenuItem>
                                    <MenuItem value="B">Bebida</MenuItem>
                                    <MenuItem value="C">Combo</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="precio">Precio</InputLabel>
                                <Input id="precio" name="precio" 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="descripcion"
                                    name="descripcion"
                                    label="Contenido del producto"
                                    multiline
                                    rows="5"
                                    defaultValue="Contenido Principal"
                                    margin="normal" 
                                    onChange={this.handleChange}>
                                </TextField>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="kiosko">Kiosko</InputLabel>
                                <Select 
                                    inputProps={{name:"kiosko", id:"kiosko"}}
                                    value={this.state.kiosko}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="Normal">
                                        <em>Elegir Kiosko de Venta</em>
                                    </MenuItem>
                                    <MenuItem value="RS">Restaurante</MenuItem>
                                    <MenuItem value="K1">K1</MenuItem>
                                    <MenuItem value="K2">K2</MenuItem>
                                    <MenuItem value="K3">K3</MenuItem>
                                    <MenuItem value="HV">Harveys</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="imageurl">Link de Imagen</InputLabel>
                                <Input
                                    name="imageURL"
                                    id="imageURL"
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Publicar
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </main>
                <br></br>
                <h2>Vista Previa</h2>
                <br></br>
                <MaterialItem cardInfo={{
                    titulo : this.state.titulo,
                    tipo : this.state.tipo,
                    precio : this.state.precio,
                    descripcion : this.state.descripcion,
                    kiosko : this.state.kiosko,
                    imageURL : this.state.imageURL
                }
                }/>
            </React.Fragment>
        );
    }

    createAxiosInstance(token) {
        axiosInstance = axios.create({
            baseURL: apiURL,
            timeout: 1000,
        });
    }

}

export default AddNewMaterial;

const apiURL = ((window.location.hostname === "localhost") ? "http://localhost:8080" : "https://myuniapp-back.herokuapp.com");
var axiosInstance;