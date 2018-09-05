import React, {Component} from "react";
import {Router} from "react-native-router-flux";
import {Provider} from "react-redux";
import scenes from "../routes/scenes";
import propTypes from 'prop-types';

export default class AppContainer extends Component {
    static propTypes = {
        store: propTypes.object.isRequired
    }
    render(){
        return (
            <Provider store={this.props.store}>
                <Router scenes={scenes}/>
            </Provider>
        )
    }
}