import React from "react";
import MaterialesItem from "./MaterialesItem";
import axios from "axios";

class MaterialesList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loaded : false,
        };
        this.createAxiosInstance();
    }

    render(){
        if (this.state.loaded === false) {
            this.getKioskoItemsFromApi();
            return(
                <h1>Loading from the kiosks</h1>
            );
        } else {
            return (
                <div>
                    <br></br>
                    {kioskosListApi}
                </div>
            );
        }
    }

    createAxiosInstance(){
        var token = localStorage.getItem("token");
        axiosInstance = axios.create({
            baseURL: apiURL,
            timeout: 1000,
            headers: {"Authorization": "Bearer " + token}
        });
    }

    getKioskoItemsFromApi(){
        axiosInstance.get("/kioskos/menuItems")
        .then((response) => {
            var kioskoList2 = response.data.map((kioskosItem, i) => {
                return(
                    <MaterialesItem key={i} cardInfo={kioskosItem} />
                );
            });
            kioskosListApi = kioskoList2;
            this.setState({
                loaded : true
            });
            return kioskoList2;
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default MaterialesList;

const apiURL = ((window.location.hostname === "localhost") ? "http://localhost:8080" : "https://myuniapp-back.herokuapp.com");
var axiosInstance;
var kioskosListApi = (<div></div>);