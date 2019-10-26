import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem } from "native-base";
import { FlatList, RefreshControl, Dimensions } from "react-native";
import Room  from '../services/Room';
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window');

class MainScreen extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getAll(this.props.auth.data.token);
    }
    successGetRoom(){
        console.log(this.props.getRoom.data);
    }
    failedGetRoom(){
        console.log(this.props.getRoom.error);
    }
    render(){
        return (
            <>
                {(!this.props.getRoom.isLoading && this.props.getRoom.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getRoom.isLoading && this.props.getRoom.error!=null)?<>{this.failedGetRoom()}</>:<></>}

                <Container>
                    <Header style={{backgroundColor: "#2980b9"}}>
                        <Left></Left>
                        <Body>
                            <Title>Room</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content refreshControl={
                                    <RefreshControl
                                        onRefresh={this.props.getAll.bind(this, this.props.auth.data.token)}
                                        refreshing = {this.props.getRoom.isLoading} />
                                }>
                        <CardItem>
                            <Body>
                            <FlatList
                                style={{}}
                                data = {this.props.getRoom.data}
                                keyExtractor = {item => item.id.toString()}
                                numColumns= {3}
                                renderItem = {({item})=>(
                                    <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(90/100)),
                                    margin: 1, height: width/3 }}><Text>{item.name}</Text></View>
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
        getRoom: state.getRoom
    }
}
const mapDispatchToProps = {
    getAll: Room.index,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

