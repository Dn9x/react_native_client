'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
let store = configureStore();

import Main from './Main';

export default class App extends Component{
    constructor(){
        super();
        this.state={
            isLoading: true,
            store:configureStore(()=>{this.setState({isLoading:false});})
        };
    }

    render(){
        return (<Provider store={this.state.store}><Main/></Provider>);
    }
}

