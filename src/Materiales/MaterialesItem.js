import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./MaterialesItem.css";
import { CardHeader } from "@material-ui/core";

class MaterialesItem extends React.Component{
    render() {
        var padding = "15%";
        if(this.props.cardInfo.imageURL === "undefined"){
            padding = "0%";
        }
        const mediaClass = {"height": 0, "paddingTop": padding};
        return (
            <div>
                <Card className="card">
                    <CardHeader
                        title={
                            <Typography variant="h5">
                               {this.props.cardInfo.titulo}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="body1">
                               Tipo: {this.props.cardInfo.tipo}
                            </Typography>
                        }
                    />
                    <CardMedia 
                        style={mediaClass}
                        image={this.props.cardInfo.imageURL}
                        title="Imagen Comida"
                    />
                    <CardContent>
                        <Typography className="pos" color="textPrimary">
                            Precio <b>{this.props.cardInfo.precio}</b>
                        </Typography>
                        <Typography className="pos" color="textSecondary" >
                            Kiosco <b>{this.props.cardInfo.kiosko}</b>
                        </Typography>
                        <Typography>
                            {this.props.cardInfo.descripcion}
                        </Typography>
                    </CardContent>
                </Card>
                <br></br>
            </div>
        );
    }
}

export default MaterialesItem;