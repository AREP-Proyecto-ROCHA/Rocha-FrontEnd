import React from "react";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { Route, Switch } from "react-router-dom";
import NewsList from "../News/NewsList";
import AddRetiros from "../News/AddNewForm";
import MaterialesList from "../Materiales/MaterialesList";
import AddNewMaterial from "../Materiales/AddNewMaterial";
import ProducidosList from "../Producidos/ProducidosList";
import AddNewProucido from "../Producidos/AddProducidos";

import { Redirect } from "react-router-dom";

export class PagesView extends React.Component {
    render() {
        if (localStorage.getItem("token") === "undefined") {
            return (<Redirect to="/"/>);
        }
        return(
            <div>
                <DrawerAppBar/>
                <Switch>
                    <Route path="/app/retiros" component={NewsListView}/>
                    <Route path="/app/postretiros" component={AddRetirosView}/>
                    <Route path="/app/materiales" component={MaterialesListView}/>
                    <Route path="/app/postmateriales" component={AddNewMaterialesView}/>
                    <Route path="/app/producido" component={ProducidosListView}/>
                    <Route path="/app/postproducido" component={AddNewProducidosView}/>
                </Switch>
            </div>
        );
    }
}

const NewsListView = () => (
    <NewsList/>
);

const AddRetirosView = () => (
    <AddRetiros/>
);

const MaterialesListView = () => (
    <MaterialesList/>
);

const AddNewMaterialesView = () => (
    <AddNewMaterial/>
);

const ProducidosListView = () => (
    <ProducidosList/>
);

const AddNewProducidosView = () => (
    <AddNewProucido/>
);
