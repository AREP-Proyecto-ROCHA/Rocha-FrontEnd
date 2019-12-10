import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./MaterialesItem.css";
import moment from "moment";
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
                              Material
                            </Typography>
                        }
                        subheader={
                            <Typography variant="body1">
                               FechaIngreso: {moment(this.props.cardInfo.fechaIngreso).format("DD-MM-YYYY")}
                            </Typography>
                        }
                    />

                    <CardContent>
                        <Typography className="pos" color="textPrimary">
                            Cantidad <b>{this.props.cardInfo.cantidad}</b>
                        </Typography>
                        <Typography className="pos" color="textSecondary" >
                            Trabajador <b>{this.props.cardInfo.trabajadorId}</b>
                        </Typography>
                        <Typography>
                            Material <b>{this.props.cardInfo.material}</b>
                        </Typography>
                    </CardContent>
                </Card>
                <br></br>
            </div>
        );
    }
}

export default MaterialesItem;