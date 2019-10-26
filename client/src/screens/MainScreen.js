import React, { Component } from "react";
import { View, Text } from "native-base";

export default class MainScreen extends Component {
    render(){
        return (
            <View>
                <Text>Nice</Text>{console.log("what happen")}
            </View>
        );
    }
}