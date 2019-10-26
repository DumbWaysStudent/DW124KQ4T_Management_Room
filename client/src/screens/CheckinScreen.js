import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button, Fab, Icon } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image, Picker } from "react-native";
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Checkin  from '../services/Checkin';
import Customer  from '../services/Customer';

const {width, height} = Dimensions.get('window');

class CheckinScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            room: null,
            customer: null,
            customers: (this.props.getCustomer.length>0)?this.props.getCustomer.data:[],
            count:0,
            duration: 0,
            customerId:""
        }
    }

    componentDidMount(){
        this.props.getAll(this.props.auth.data.token)
        this.props.getAllCustomer(this.props.auth.data.token);
    }

    successGetRoom = () => {
        console.log(this.props.getCheckin.data)
    }

    failedGetRoom = () => {
        console.log(this.props.getCheckin.error)
    }

    checkin = (checkin, id) => {
        if(checkin){
            let room = this.props.getCheckin.data.filter((item)=>item.id===id);
            if(room.length>0){
                room = room[0]
                this.setState({
                    room
                });
            }
            
            this.RBSheet.open();
        }
    }

    successGetCustomer = () => {
        if(this.state.count===0){
        let count = this.state.count + 1;
        this.setState({
            customers: this.props.getCustomer.data,
            count: count
        });
        console.log("-------------",this.state.customers)
    }
    }

    onDuration = (text) => {
        this.setState({
            duration: text
        })
    }

    onCustomerId = (text) => {
        this.setState({
            customerId: text
        })
    }

    onCheckin = () => {
        let duration = parseInt(this.state.duration);
        let today = (new Date()).getTime();
        let endtime = today+(duration*60*1000);
        console.log(this.state.customerId, "--------nih");
        this.props.storeCheckin(this.props.auth.data.token, {
            roomId: this.state.room.id,
            customerId: this.state.customerId,
            duration: duration,
            orderEndTime: endtime
        });
    }
    successCreateCheckin=()=>{
        this.RBSheet.close();
        this.props.editCheckin(this.props.createCheckin.data);
    }

    failCreateCheckin = () => {
        console.log(this.props.createCheckin.error);
    }

    render(){
        return (
            <>
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.error!=null)?<>{this.failedGetRoom()}</>:<></>}

                {(!this.props.getCustomer.isLoading && this.props.getCustomer.data!=null)?<>{this.successGetCustomer()}</>:<></>}
                {(!this.props.createCheckin.isLoading && this.props.createCheckin.data!=null)?<>{this.successCreateCheckin()}</>:<></>}
                {(!this.props.createCheckin.isLoading && this.props.createCheckin.error!=null)?<>{this.failCreateCheckin()}</>:<></>}

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
                                    <TouchableOpacity onPress={this.checkin.bind(this, ((item.checkins.length>0)?((item.checkins[0].isBooked)?false:true):true), item.id)}>
                                        <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(90/100)),margin: 1, height: width/3, backgroundColor: ((item.checkins.length>0)?((item.checkins[0].isBooked)?"#ccc":"green"):"green") }}><Text>{item.name}</Text></View>
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
                    height={300}
                    duration={250}
                    customStyles={{
                        container: {}
                    }}
                    >
                            <View style={{padding: 10}}>
                                <View><Text style={{fontSize: 30}}>Checkin</Text></View>
                                <Item disabled>
                                    <Input style={{backgroundColor:"#ccc"}} disabled value={(this.state.room)?this.state.room.name:""} placeholder="Name" />
                                </Item>
                                <Item>
                                    <Input value={this.state.customerId} onChangeText={this.onCustomerId} placeholder="customer id"/>
                                </Item>
                                <Item>
                                    <Input value={this.state.duration} onChangeText={this.onDuration} placeholder="Duration"/>
                                </Item>

                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancel} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button onPress={this.onCheckin} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
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
        getCheckin: state.getCheckin,
        getCustomer: state.getCustomer,
        createCheckin: state.createCheckin
    }
}
const mapDispatchToProps = {
    getAll: Checkin.index,
    getAllCustomer: Customer.index,
    storeCheckin: Checkin.store,
    editCheckin: Checkin.editCheckin
  };

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen);