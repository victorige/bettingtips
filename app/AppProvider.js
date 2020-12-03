import React, {Component} from 'react';
import {Provider} from "mobx-react";
import stores from "./src/mobx";
import App from "./App";

class AppProvider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider {...stores}>
                <App/>
            </Provider>
        );
    }
}

export default AppProvider