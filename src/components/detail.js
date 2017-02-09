'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class List extends Component{
    static propTypes={
        user: React.PropTypes.object
    };

    render(){
        if(this.props.user.name == null){
            return (
                <View style={styles.loading} >
                <Image style={styles.loadingImage} source={require('../images/loading.gif')} />
                <Text>Waiting choose</Text>
                </View>
            );
        }
        var user = this.props.user;
        return (
            <View style={styles.container}>
                <Image style={styles.cell} source={{uri: user.image, width:60, height:60}} />
                <Text style={styles.cell}>{user.name}</Text>
                <Text style={styles.cell}>{user.age}</Text>
                <Text style={styles.cell}>{user.phone}</Text>
                <Text style={styles.cell}>{user.phrase}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingLeft: 10
    },
    loading:{
        flex: 1,
        alignItems: 'center'
    },
    loadingImage:{
        width:80
    },
    cell:{
        marginBottom:10
    }
});