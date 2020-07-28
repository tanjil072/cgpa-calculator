import React, { Component } from 'react';
import {ImageBackground } from 'react-native';

var bg=require('./bg.png');

export default class Splash extends Component{
    constructor(props){
        super(props);
        setTimeout(()=>{
            this.props.navigation.navigate("Cgpa");
        },5000);
    }
    render()
    {
        return(
            <ImageBackground
            source={bg}
            style={{height:'100%',width:'100%'}}>
                

            </ImageBackground>
        );
    }
}