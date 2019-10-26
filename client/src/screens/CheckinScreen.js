import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button, Fab, Icon } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Checkin  from '../services/Checkin';

const {width, height} = Dimensions.get('window');

class CheckinScreen extends Component {

    componentDidMount(){
        this.props.getAll(this.props.auth.data.token)
    }

    successGetRoom = () => {
        console.log(this.props.getCheckin.data)
    }

    failedGetRoom = () => {
        console.log(this.props.getCheckin.error)
    }

    render(){
        return (
            <>
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.error!=null)?<>{this.failedGetRoom()}</>:<></>}
                <Container>
                    <Header style={{backgroundColor: "#2980b9"}}>
                        <Left></Left>
                        <Body>
                            <Title>Checkin</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                    <CardItem>
                            <Body>
                            <FlatList
                                style={{}}
                                data = {this.props.getCheckin.data}
                                keyExtractor = {item => item.id.toString()}
                                numColumns= {3}
                                renderItem = {({item})=>(
                                    <>
                                    <TouchableOpacity>
                                        <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(90/100)),margin: 1, height: width/3, backgroundColor: ((item.checkins.length>0)?((item.checkins[0].isBooked)?"#ccc":"green"):"green") }}><Text>{item.name}</Text></View>
                                    </TouchableOpacity>
                                    </>
                                )}
                            />
                            </Body>
                        </CardItem>
                    </Content>
                </Container>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        getCheckin: state.getCheckin,
    }
}
const mapDispatchToProps = {
    getAll: Checkin.index,
  };

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen);