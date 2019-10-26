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
            inputName: "",
            editInputName:""
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
        else{
            let data = this.props.getRoom.data.filter((item)=>item.id===id);
            if(data.length > 0 ){
                this.setState({
                    editInputName:data[0].name
                });
                this[RBSheet + id].open();
            }
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

    onChangeEditName = (text) => {
        this.setState({
            editInputName: text
        });
    }

    onCancel = () => {
        this.RBSheet.close();
    }

    onCreateRoom = () => {
        this.props.onCreateRoom(this.props.auth.data.token, {name: this.state.inputName});
    }

    successCreateRoom = () => {
        this.props.addRoom(this.props.createRoom.data);
        this.RBSheet.close();
        
    }

    failedCreateRoom = () => {
        console.log(this.props.createRoom.error);
    }

    onEditCancel = (id) => {
        this[RBSheet + id].close();
    }

    onEditRoom = (id) => {
        this.props.onUpdateRoom(this.props.auth.data.token, {name:this.state.editInputName}, id);
        // this[RBSheet + id].close();
    }

    successUpdateRoom = () =>{
        this.props.editRoom(this.props.updateRoom.data);
        this[RBSheet + this.props.updateRoom.data.id].close();
    }

    failedUpdateRoom = () => {
        console.log(this.props.updateRoom.error);
    }


    render(){
        return (
            <>
                {(!this.props.getRoom.isLoading && this.props.getRoom.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getRoom.isLoading && this.props.getRoom.error!=null)?<>{this.failedGetRoom()}</>:<></>}

                {(!this.props.createRoom.isLoading && this.props.createRoom.data!=null)?<>{this.successCreateRoom()}</>:<></>}
                {(!this.props.createRoom.isLoading && this.props.createRoom.error!=null)?<>{this.failedCreateRoom()}</>:<></>}

                {(!this.props.updateRoom.isLoading && this.props.updateRoom.data!=null)?<>{this.successUpdateRoom()}</>:<></>}
                {(!this.props.updateRoom.isLoading && this.props.updateRoom.error!=null)?<>{this.failedUpdateRoom()}</>:<></>}

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
                                    <>
                                    <TouchableOpacity onPress={this.onDetailRoom.bind(this, item.id)}>
                                        <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(90/100)),
                                        margin: 1, height: width/3 }}><Text>{item.name}</Text></View>
                                    </TouchableOpacity>
                                    <RBSheet
                                    ref={ref => {
                                        this[RBSheet + item.id] = ref;
                                    }}
                                    duration={250}
                                    customStyles={{
                                        container: {}
                                    }}
                                    >
                                        <View style={{padding: 10}}>
                                        <View><Text style={{fontSize: 30}}>Edit: {item.name}</Text></View>
                                        <Item>
                                            <Input value={this.state.editInputName} placeholder="Name" onChangeText={this.onChangeEditName} />
                                        </Item>
                                        </View>
                                        <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                            <Button onPress={this.onEditCancel.bind(this, item.id)} danger style={{flex:1, justifyContent: "center"}}>
                                                <Text>Cancel</Text>
                                            </Button>
                                            <Button onPress={this.onEditRoom.bind(this, item.id)} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                                <Text>Update</Text>
                                            </Button>
                                        </View>
                                    </RBSheet>
                                    </>
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
        createRoom: state.createRoom,
        updateRoom: state.updateRoom
    }
}
const mapDispatchToProps = {
    getAll: Room.index,
    onCreateRoom: Room.store,
    addRoom: Room.addRoom,
    onUpdateRoom: Room.update,
    editRoom: Room.editRoom
  };

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

