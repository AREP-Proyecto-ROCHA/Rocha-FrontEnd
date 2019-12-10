import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import PresentToAll from "@material-ui/icons/PresentToAll";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import { Select, MenuItem, TextField } from "@material-ui/core";
import NewsItem from "./NewsItem";
import axios from "axios";
import moment from "moment";
import { Redirect } from "react-router-dom";
import "./AddNewForm.css";

class AddNewForm extends React.Component {

    constructor(props) {
        super(props);
        this.createAxiosInstance();
        this.state = {
            title : "",
            publisher : "",
            date : new Date(),
            content : "",
            email : "",
            type : "",
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

    handleDateChange = (dateValue) => {
        this.setState({
            date: dateValue
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        axiosInstance.post("/news/post", {
            title : this.state.title,
            publisher : this.state.publisher,
            date : moment(this.state.date).format("x"),
            content : this.state.content,
            email : this.state.email,
            type : this.state.type,
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
        if (this.state.fireRedirect === true) {
            return (<Redirect to="/app/news"/>);
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <PresentToAll color="secondary" className="svg_icons"/>
                        <Typography variant="h4">Publicar una noticia</Typography>
                        <form className="form" onSubmit={this.handleSubmit} name="login-form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="title">Título</InputLabel>
                                <Input id="title" name="title" autoFocus 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="publisher">Nombre del Editor</InputLabel>
                                <Input id="publisher" name="publisher" 
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} >
                                    <DatePicker
                                        margin="normal"
                                        label="Seleccionar Fecha"
                                        id="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}>
                                    </DatePicker>
                                </MuiPickersUtilsProvider>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="type">Tipo</InputLabel>
                                <Select 
                                    inputProps={{name:"type", id:"type"}}
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="Normal">
                                        <em>Elegir tipo</em>
                                    </MenuItem>
                                    <MenuItem value="Normal">Normal</MenuItem>
                                    <MenuItem value="Warning">Advertencia</MenuItem>
                                    <MenuItem value="Info">Info</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email de Contacto</InputLabel>
                                <Input id="email" name="email"
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <TextField
                                    id="content"
                                    name="content"
                                    label="Contenido de la Noticia"
                                    multiline
                                    rows="5"
                                    defaultValue="Contenido Principal"
                                    margin="normal" 
                                    onChange={this.handleChange}>
                                </TextField>
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
                                    Publicar Noticia
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </main>
                <br></br>
                <h2>Vista Previa</h2>
                <br></br>
                <NewsItem cardInfo={{
                    title : this.state.title,
                    publisher : this.state.publisher,
                    date : this.state.date,
                    content : this.state.content,
                    email : this.state.email,
                    type : this.state.type,
                    imageURL : this.state.imageURL
                }
                }/>
            </React.Fragment>
        );
    }

    createAxiosInstance() {
        var token = localStorage.getItem("token");
        axiosInstance = axios.create({
            baseURL: apiURL,
            timeout: 1000,
            headers: {"Authorization": "Bearer "+ token}
        });
    }
}

export default AddNewForm;

const apiURL = ((window.location.hostname === "localhost") ? "http://localhost:8080" : "https://myuniapp-back.herokuapp.com");
var axiosInstance;