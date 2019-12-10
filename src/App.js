import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PagesView } from "./PagesView/PagesView";

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#f44336",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            //light: '#0066ff',
            main: "#ffb300",
            // dark: will be calculated from palette.secondary.main,
            //contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    typography: {
        useNextVariants: true,
    },
});

const PagesViewView = () => (
    <PagesView/>
);

class App extends Component {
    render() {
        return (
            <div>
                
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <div>
                            <Route path="/app" component={PagesViewView}/>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;