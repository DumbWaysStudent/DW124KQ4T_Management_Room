import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity } from "react-native";
import Room  from '../services/Room';
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";

const {width, height} = Dimensions.get('window');

class RoomScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputName: "",
            editInputName:"",
            editId:"",
            editName:""
        }
    }
    componentDidMount(){
        if(this.props.auth.data){
        this.props.getAll(this.props.auth.data.token);
        }
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
                    editInputName:data[0].name,
                    editName:data[0].name,
                    editId: id
                });
                this[RBSheet + 1].open();
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
        if(this.props.auth.data){
        this.props.onCreateRoom(this.props.auth.data.token, {name: this.state.inputName});
        }
    }

    successCreateRoom = () => {
        this.props.addRoom(this.props.createRoom.data);
        this.RBSheet.close();
        
    }

    failedCreateRoom = () => {
        if(typeof this.props.createRoom.error !=="undefined" && typeof this.props.createRoom.error.data !=="undefined" && typeof this.props.createRoom.error.data.errors !=="undefined"){
            let str = ""
            let error = this.props.createRoom.error.data.errors;
            for(var key in error){
                error[key].forEach((item, i)=>{
                    str = str + item+"\n";
                });
            }
            alert(str);
            this.props.resetCreateRoom()
        }
    }

    onEditCancel = (id) => {
        this[RBSheet + 1].close();
    }

    onEditRoom = (id) => {
        if(this.props.auth.data){
        this.props.onUpdateRoom(this.props.auth.data.token, {name:this.state.editInputName}, id);
        }
        // this[RBSheet + id].close();
    }

    successUpdateRoom = () =>{
        this.props.editRoom(this.props.updateRoom.data);
        this[RBSheet + 1].close();
    }

    failedUpdateRoom = () => {
        if(typeof this.props.updateRoom.error !=="undefined" && typeof this.props.updateRoom.error.data !=="undefined" && typeof this.props.updateRoom.error.data.errors !=="undefined"){
            let str = ""
            let error = this.props.updateRoom.error.data.errors;
            for(var key in error){
                error[key].forEach((item, i)=>{
                    str = str + item+"\n";
                });
            }
            alert(str);
            this.props.resetUpdateRoom();
        }
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
                                        onRefresh={((
                                            (this.props.auth.data))?this.props.getAll.bind(this, this.props.auth.data.token):{})}
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
                                        <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(85/100)),margin: 5, height: ((width/3)*(85/100)),borderRadius: 10 }}><Text>{item.name}</Text></View>
                                    </TouchableOpacity>
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
                                    <Input autoFocus={true} value={this.state.inputName} placeholder="Name" onChangeText={this.onChangeName} />
                                </Item>
                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancel} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    {(!this.props.getRoom.isLoading && this.props.getRoom.data!=null)?
                                    <Button onPress={this.onCreateRoom} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                        <Text>Save</Text>
                                    </Button>
                                    :
                                    <Button disabled style={{flex:1, justifyContent: "center"}}>
                                        <Text>Loading ...</Text>
                                    </Button>
                                    }
                                </View>
                            </View>
                    </RBSheet>
                    <RBSheet
                        ref={ref => {
                            this[RBSheet + 1] = ref;
                        }}
                        duration={250}
                        customStyles={{
                            container: {}
                        }}
                        >
                            <View style={{padding: 10}}>
                            <View><Text style={{fontSize: 30}}>Edit: {this.state.editName}</Text></View>
                            <Item>
                                <Input autoFocus={true} value={this.state.editInputName} placeholder="Name" onChangeText={this.onChangeEditName} />
                            </Item>
                            <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                <Button onPress={this.onEditCancel.bind(this, this.state.editId)} danger style={{flex:1, justifyContent: "center"}}>
                                    <Text>Cancel</Text>
                                </Button>
                                {(!this.props.updateRoom.isLoading && this.props.updateRoom.data===null)?
                                <Button onPress={this.onEditRoom.bind(this, this.state.editId)} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                    <Text>Update</Text>
                                </Button>
                                :
                                <Button disabled style={{flex:1, justifyContent: "center"}}>
                                    <Text>Loading ...</Text>
                                </Button>
                                }
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
    editRoom: Room.editRoom,
    resetCreateRoom: Room.resetCreateRoom,
    resetUpdateRoom: Room.resetUpdateRoom
  };

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);

