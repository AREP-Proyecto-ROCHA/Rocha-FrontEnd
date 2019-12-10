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
            trabajadorId : "",
            material : "",
            cantidad : "",
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
        
        axiosInstance.post("/inventario/ingresar?trabajadorId="+this.state.trabajadorId+"&material="+this.state.material+"&cantidad="+this.state.cantidad, {
            trabajadorId : this.state.trabajadorId,
            material : this.state.material,
            cantidad : this.state.cantidad
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
                                <InputLabel htmlFor="trabajadorId">Identificacion del Trabajador</InputLabel>
                                <Input id="trabajadorId" name="trabajadorId" autoFocus
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="material">Nombre del Material</InputLabel>
                                <Select 
                                    inputProps={{name:"tipo", id:"tipo"}}
                                    value={this.state.tipo}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="Normal">
                                        <em>Elegir tipo</em>
                                    </MenuItem>
                                    <MenuItem value="P">Poliester</MenuItem>
                                    <MenuItem value="Ñ">Paño</MenuItem>
                                    <MenuItem value="A">Algodon</MenuItem>
                                    <MenuItem value="S">Seda</MenuItem>
                                    <MenuItem value="L">Lino</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
                                <Input id="cantidad" name="cantidad"
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
                                    Ingresar
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </main>
                <br></br>
                <h2>Vista Previa</h2>
                <br></br>
                <MaterialItem cardInfo={{
                    trabajadorId : this.state.trabajadorId,
                    material : this.state.material,
                    cantidad : this.state.cantidad
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

const apiURL = ((window.location.hostname === "localhost") ? "http://localhost:8080" : "http://proyectoback-env.av6dmn2nyi.us-east-2.elasticbeanstalk.com");
var axiosInstance;