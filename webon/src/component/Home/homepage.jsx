import React, { Component } from "react";
import NavBar from "./navbar";

class HomePage extends Component {
    state = {
        loading: true,
    };

    render() {

        return (
            <NavBar/>
        );
    }
}

export default HomePage;