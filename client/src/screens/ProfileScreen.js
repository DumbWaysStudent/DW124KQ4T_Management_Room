import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
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
            this.props.resetAuth();
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
                            {(this.props.auth.data)?
                                <View style={{flex: 1, flexDirection:'row', marginBottom: 15}}>
                                    <Image style={{width: 65, height: 65, borderRadius:(65/2)}} source={{uri: `https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1`}} />
                                    <View style={{marginLeft: 20}}>
                                        <View style={{flex:1, justifyContent:"center"}}>
                                            <Text>
                                                {this.props.auth.data.name}
                                            </Text>
                                        </View>
                                        <View style={{flex:1, justifyContent:"center"}}>
                                            <Text>
                                                {this.props.auth.data.username}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            :<></>}
                            <View></View>
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
    resetAuth: Auth.resetAuth,
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);