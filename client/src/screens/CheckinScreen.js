import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button, Fab, Icon, Picker } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Checkin  from '../services/Checkin';
import Checkout  from '../services/Checkout';
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
        let room = this.props.getCheckin.data.filter((item)=>item.id===id);
        if(checkin){
            if(room.length>0){
                room = room[0]
                this.setState({
                    room
                });
            }
            
            this.RBSheet.open();
        }
        else{
            if(room.length>0){
                room = room[0]
                this.setState({
                    customerId: room.checkins[0].customer.id.toString(),
                    duration: room.checkins[0].duration.toString(),
                    room
                });
            }
            this[RBSheet+1].open();
        }
    }

    successGetCustomer = () => {
        if(this.state.count===0){
        let count = this.state.count + 1;
        this.setState({
            customers: this.props.getCustomer.data,
            count: count
        });
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

    onCheckout = () => {
        this.props.storeCheckout(this.props.auth.data.token, {roomId:this.state.room.id}, this.state.room.checkins[0].id);
    }

    successCreateCheckout = () => {
        console.log("-----=======",this.props.createCheckout.data)
        this.props.editCheckout(this.props.createCheckout.data);
        this[RBSheet+1].close();

    }

    failCreateCheckout = () => {
        console.log("-----=======",this.props.createCheckout.error)
    }

    onValueChange = (id) =>{
        this.setState({
            customerId: id
        });
    }
    onCancelCheckIn = () => {
        this.RBSheet.close();
    }
    onCancelCheckOut = () => {
        this[RBSheet+1].close();
    }

    render(){
        return (
            <>
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.data!=null)?<>{this.successGetRoom()}</>:<></>}
                {(!this.props.getCheckin.isLoading && this.props.getCheckin.error!=null)?<>{this.failedGetRoom()}</>:<></>}

                {(!this.props.getCustomer.isLoading && this.props.getCustomer.data!=null)?<>{this.successGetCustomer()}</>:<></>}

                {console.log("=================----------",this.props.getCustomer.data)}

                {(!this.props.createCheckin.isLoading && this.props.createCheckin.data!=null)?<>{this.successCreateCheckin()}</>:<></>}
                {(!this.props.createCheckin.isLoading && this.props.createCheckin.error!=null)?<>{this.failCreateCheckin()}</>:<></>}
                {(!this.props.createCheckout.isLoading && this.props.createCheckout.data!=null)?<>{this.successCreateCheckout()}</>:<></>}
                {(!this.props.createCheckout.isLoading && this.props.createCheckout.error!=null)?<>{this.failCreateCheckout()}</>:<></>}

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
                                
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 120 }}
                                    selectedValue={this.state.customerId}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Customer" />
                                        {this.props.getCustomer.data.map((item)=>{
                                            return (
                                                <Picker.Item label={item.name} value={item.id} />
                                            );
                                        })}
                                </Picker>
                                <Item>
                                    <Input value={this.state.duration} onChangeText={this.onDuration} placeholder="Duration"/>
                                </Item>

                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancelCheckIn} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button onPress={this.onCheckin} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                        <Text>Save</Text>
                                    </Button>
                                </View>
                            </View>
                    </RBSheet>
                    <RBSheet
                    ref={ref => {
                        this[RBSheet+1] = ref;
                    }}
                    height={300}
                    duration={250}
                    customStyles={{
                        container: {}
                    }}
                    >
                            <View style={{padding: 10}}>
                                <View><Text style={{fontSize: 30}}>Checkout</Text></View>
                                <Item disabled>
                                    <Input style={{backgroundColor:"#ccc", marginBottom: 5}} disabled value={(this.state.room)?this.state.room.name:""} placeholder="Name" />
                                </Item>
                                <Item>{(this.state.room && this.state.room.checkins[0])?
                                    <Input value={this.state.room.checkins[0].customer.name+"("+this.state.room.checkins[0].customer.identityNumber+")"} style={{backgroundColor:"#ccc", marginBottom: 5}} placeholder="customer id"/>:<></>}
                                </Item>
                                <Item>
                                    <Input value={this.state.duration} style={{backgroundColor:"#ccc", marginBottom: 5}}  placeholder="Duration"/>
                                </Item>

                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancelCheckOut} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button onPress={this.onCheckout} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                        <Text>Checkout</Text>
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
        createCheckin: state.createCheckin,
        createCheckout: state.createCheckout
    }
}
const mapDispatchToProps = {
    getAll: Checkin.index,
    getAllCustomer: Customer.index,
    storeCheckin: Checkin.store,
    editCheckin: Checkin.editCheckin,
    storeCheckout: Checkout.store,
    editCheckout: Checkout.editCheckout
  };

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen);