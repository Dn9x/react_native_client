'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    Image,
    TouchableHighlight,
    ScrollView
} from 'react-native';

export default class List extends Component{
    static propTypes={
        arr: React.PropTypes.array,
        clickHandle: React.PropTypes.func
    };
    
    handleClick(item, event){
        if(this.props.clickHandle){
            this.props.clickHandle(item);
        }

        event.preventDefault();
    }

    render(){
        if(this.props.arr.length==0){
            return null;
        }
        var self = this;
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
            {
                this.props.arr.map(function (item, index) {
                    return (
                        <TouchableHighlight style={styles.view} key={index} onPress={self.handleClick.bind(self, item)}>
                            <View style={styles.cell}>
                                <Image source={{uri: item.image, width:32, height:32}} />
                                <Text style={{height: 32, marginLeft:8, paddingTop: 8}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )
                }) 
            }
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    view: {
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor: '#bbb', 
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    cell:{
        flex:1,
        flexDirection:'row'
    }
});