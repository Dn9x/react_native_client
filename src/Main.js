'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './actions/index';
import List from './components/list';
import Detail from './components/detail';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ProgressViewIOS,
    Image,
    TextInput,
    Button
} from 'react-native';
import LoadingView from './components/loading'

var isFirst = true;

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            age: null,
            phone: null,
            image: null,
            phrase: null,
            text: '',
            showLoading: false
        };

        this.props.dispatch(getUsers(null));
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.users.length != this.props.users.length){
            this.setState({'showLoading':false});
        }
        console.log(nextProps, nextState);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.users.length != this.props.users.length){
            return true;
        }

        if(nextState.name){
            return true;
        }

        if(nextState.showLoading != this.state.showLoading){
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps, prevState, nextProps, nextState){
        console.log(prevProps, prevState, nextProps, nextState);
    }

    handleClick(user) {
        console.log(user);
        this.setState({
            name: user.name,
            age: user.age,
            phone: user.phone,
            image: user.image,
            phrase: user.phrase
        });
    }

    submitSearch(){
        var text = this.refs.search._lastNativeText;
        console.log(text);
        this.setState({'showLoading':true});
        this.props.dispatch(getUsers({q:text}));
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingView showLoading={ this.state.showLoading } />
                {this.props.loading?(<Image source={require('./images/loading.gif')} />):(
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.search}
                            ref="search"
                        />
                        <Button
                          onPress={this.submitSearch.bind(this)}
                          title="Search"
                          style={styles.button}
                        />
                    </View>
                  )}
                {this.props.loading?(<Text>Loading</Text>):(
                    <View style={styles.content}>
                        <View style={styles.list}>
                            <List arr={this.props.users} clickHandle={this.handleClick.bind(this)} ></List>
                        </View>
                        <View style={styles.detail}>
                            <Detail user={this.state}></Detail>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    content:{
        flex:1,
        flexDirection:'row'
    },
    list: {
        flex:1,
        backgroundColor: '#ffffff'
    },
    detail: {
        flex:2,
        backgroundColor: '#ffffff',
        borderLeftColor: '#bbb', 
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    search: {
        flex:3,
        height: 32, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginLeft:10, 
        marginRight:10
    },
    button: {
        flex:1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    progressView: {
        marginTop: 20,
    }
});

function select(store) {
    return {
        loading: store.usersStore.loading,
        users: store.usersStore.users,
        loaderror: store.usersStore.error
    }
}

export default connect(select)(Main);
