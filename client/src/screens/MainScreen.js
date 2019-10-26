import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity } from "react-native";
import Room  from '../services/Room';
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";

const {width, height} = Dimensions.get('window');

class MainScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputName: ""
        }
    }
    componentDidMount(){
        this.props.getAll(this.props.auth.data.token);
    }
    successGetRoom(){
        
    }
    failedGetRoom(){
        console.log(this.props.getRoom.error);
    }

    onDetailRoom = (id) => {
        if(id===0){
            this.onAddRoom();
        }
    }

    onAddRoom = ()=>{
        this.RBSheet.open();
    }

    onChangeName = (text) => {
        this.setState({
            inputName: text
        });
    }

    onCancel = () => {
        this.RBSheet.close();
    }

    onCreateRoom = () => {
        this.props.onCreateRoom(this.props.auth.data.token, {name: this.state.inputName});
    }

    successCreateRoom = () => {
        console.log("bro");
        this.props.addRoom(this.props.createRoom.data);
        this.RBSheet.close();
        
    }

    failedCreateRoom = () => {
        console.log(this.props.createRoom.error);
    }


    render(){
        return (
            <>
                {(!this.props.getRoom.isLoading && this.props.getRoom.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getRoom.isLoading && this.props.getRoom.error!=null)?<>{this.failedGetRoom()}</>:<></>}

                {console.log(this.props.createRoom)}
                {(!this.props.createRoom.isLoading && this.props.createRoom.data!=null)?<>{this.successCreateRoom()}</>:<></>}
                {(!this.props.createRoom.isLoading && this.props.createRoom.error!=null)?<>{this.failedCreateRoom()}</>:<></>}

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
                                    <TouchableOpacity onPress={this.onDetailRoom.bind(this, item.id)}>
                                        <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(90/100)),
                                        margin: 1, height: width/3 }}><Text>{item.name}</Text></View>
                                    </TouchableOpacity>
                                )}
                            />
                            </Body>
                        </CardItem>
                    </Content>
                    <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    duration={250}
                    customStyles={{
                        container: {}
                    }}
                    >
                            <View style={{padding: 10}}>
                                <View><Text style={{fontSize: 30}}>Add Room</Text></View>
                                <Item>
                                    <Input value={this.state.inputName} placeholder="Name" onChangeText={this.onChangeName} />
                                </Item>
                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancel} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button onPress={this.onCreateRoom} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                        <Text>Save</Text>
                                    </Button>
                                </View>
                            </View>
                    </RBSheet>
                </Container>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        getRoom: state.getRoom,
        createRoom: state.createRoom
    }
}
const mapDispatchToProps = {
    getAll: Room.index,
    onCreateRoom: Room.store,
    addRoom: Room.addRoom,
  };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

