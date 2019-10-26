import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity } from "react-native";
import Auth  from '../services/Auth';
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";

const {width, height} = Dimensions.get('window');

class ProfileScreen extends Component {
    constructor(props){
        super(props);
    }
    logout = async () => {
        try{
            await Auth.destroy();
            this.props.authReset();
            this.props.navigation.navigate("Login");
          }
          catch(error){
            console.log(error);
          }
    }
    render(){
        return (<>
            <Container>
                <Content>
                    <CardItem>
                        <Body>
                            <Button full danger onPress={this.logout}><Title>Logout</Title></Button>
                        </Body>
                    </CardItem>
                </Content>
            </Container>
        </>);
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        getCheckin: state.getCheckin,
    }
}
const mapDispatchToProps = {
    authreset: Auth.resetAuth,
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);