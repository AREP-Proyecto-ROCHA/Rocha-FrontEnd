import React from "react";
import NewsItem from "./ProducidosItem";
import axios from "axios";

class ProducidosList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded : false,
        };
        this.createAxiosInstance();
    }

    render() {
        if (this.state.loaded === false) {
            this.getNewsFromApi();
            return(
                <h1>Loading!</h1>
            );
        } else {
            return(
                <div>
                    <br></br>
                    {newsListApi}
                </div>
            );
        }
    }

    createAxiosInstance() {
        var token = localStorage.getItem("token");
        axiosInstance = axios.create({
            baseURL: apiURL,
            timeout: 1000,
            headers: {"Authorization": "Bearer " + token}
        });
    }

    getNewsFromApi() {
        axiosInstance.get("/news/all")
        .then((response) => {
            var newsList2 = response.data.map((newsItem, i) => {
                return (
                    <NewsItem key={i} cardInfo={newsItem} />
                );
            });
            newsListApi = newsList2;
            this.setState({
                loaded : true
            });
            return newsList2;
        }).catch((error) => {
            console.log(error);
        });
    }

}

export default ProducidosList;

const apiURL = ((window.location.hostname === "localhost") ? "http://localhost:8080" : "https://myuniapp-back.herokuapp.com");
var axiosInstance;
var newsListApi = (<div></div>);