import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button, Fab, Icon, Picker } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
import { withNavigationFocus } from 'react-navigation';
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
            customerId:"",
            refreshing: false
        }
    }

    onLoad=()=>{
        this.setState({
            refreshing:true
        });

        if(this.props.auth.data){
        this.props.getAll(this.props.auth.data.token)
        this.props.getAllCustomer(this.props.auth.data.token);
        }

        this.setState({
            refreshing:false
        });
    }

    componentDidMount(){

        if(this.props.auth.data){
        this.props.getAll(this.props.auth.data.token)
        this.props.getAllCustomer(this.props.auth.data.token);
        }

        setInterval(()=>{
            if(this.props.getCheckin.data && this.props.getCheckin.data.length>0){
                let checkin = this.props.getCheckin.data;
                let tz = ((new Date()).getTimezoneOffset()/-60)*60*60*1000;
                let today = (new Date).getTime()+(tz);
                checkin.forEach((item)=>{
                    if(item.order && item.order.isBooked){
                        // console.log("hari ini")
                        // console.log(new Date(today));
                        // console.log("end waktu")
                        // console.log(new Date(item.order.orderEndTime));
                        if((new Date(item.order.orderEndTime).getTime())<= today){
                            if(!this.props.createCheckout.isLoading){
                                if(this.props.auth.data){
                                    this.props.storeCheckout(this.props.auth.data.token, {
                                        roomId: item.id,
                                        isBooked: false,
                                        isDone: true
                                    }, item.order.id);
                                }
                            }
                        }
                    }
                });
            }
        },1000);
    }

    successGetRoom = () => {
        // console.log(this.props.getCheckin.data)
    }

    failedGetRoom = () => {
        console.log(this.props.getCheckin.error)
    }

    checkin = (checkin, id) => {
        let index = this.props.getCheckin.data.findIndex(item => item.id === id);
        let room = this.props.getCheckin.data[index];
        let obj = {room};
        if(room.order){
            obj.duration = room.order.duration.toString();
            
        }
            if(checkin){
                delete obj.room.customer;
                delete obj.room.customer;
                obj.customerId = null;
                obj.duration = (0).toString();
                this.setState(obj)
                this.RBSheet.open();
            }
            else{

                this.setState(obj)
                this[RBSheet+1].open();
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
        let endtime = new Date((today+(duration*60*1000)));
        let dt = `${endtime.getFullYear()}-${((endtime.getMonth()+1)<10)?"0"+(endtime.getMonth()+1):(endtime.getMonth()+1)}-${((endtime.getDate())<10)?"0"+(endtime.getDate()):(endtime.getDate())} ${((endtime.getHours())<10)?"0"+(endtime.getHours()):(endtime.getHours())}:${((endtime.getMinutes())<10)?"0"+(endtime.getMinutes()):(endtime.getMinutes())}:${((endtime.getSeconds())<10)?"0"+(endtime.getSeconds()):(endtime.getSeconds())}`;

        if(this.props.auth.data){
            this.props.storeCheckin(this.props.auth.data.token, {
                roomId: this.state.room.id,
                customerId: this.state.customerId,
                duration: duration,
                orderEndTime: dt
            });
        }
    }
    successCreateCheckin=()=>{
        this.setState({
            duration: (0).toString()
        });
        this.RBSheet.close();
        this.props.editCheckin(this.props.createCheckin.data);
    }

    failCreateCheckin = () => {
        if(typeof this.props.createCheckin.error !=="undefined" && typeof this.props.createCheckin.error.data !=="undefined" && typeof this.props.createCheckin.error.data.errors !=="undefined"){
            let str = ""
            let error = this.props.createCheckin.error.data.errors;
            for(var key in error){
                error[key].forEach((item, i)=>{
                    str = str + item+"\n";
                });
            }
            alert(str);
            this.props.createCheckinReset()
        }
    }

    onCheckout = () => {
        if(this.props.auth.data){
        this.props.storeCheckout(this.props.auth.data.token, {
            roomId:this.state.room.id,
            isDone: true,
            isBooked: false
        }, this.state.room.order.id);
        }
    }

    successCreateCheckout = () => {
        this.setState({
            duration: (0).toString()
        });
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

                
                {(!this.props.createCheckin.isLoading && this.props.createCheckin.data!=null)?<>{this.successCreateCheckin()}</>:<></>}
                {(!this.props.createCheckin.isLoading && this.props.createCheckin.error!=null)?<>{this.failCreateCheckin()}</>:<></>}
                {(!this.props.createCheckout.isLoading && this.props.createCheckout.data!=null)?<>{this.successCreateCheckout()}</>:<></>}
                {(!this.props.createCheckout.isLoading && this.props.createCheckout.error!=null)?<>{this.failCreateCheckout()}</>:<></>}

                <Container>
                    <Header androidStatusBarColor="#2980b9" style={{backgroundColor: "#2980b9"}}>
                        <Body>
                            <Title style={{fontWeight:"bold"}}>Checkin</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onLoad} />
                    }>
                    <CardItem>
                            <Body>
                                <View>
                                    {(this.props.getCheckin.data && this.props.getCheckin.data.length>0)?
                                    <FlatList
                                        data = {this.props.getCheckin.data}
                                        keyExtractor = {item => item.id.toString()}
                                        numColumns= {3}
                                        renderItem = {({item})=>(
                                            <>
                                            <TouchableOpacity onPress={this.checkin.bind(this, ((typeof item.order !== "undefined")?((item.order.isBooked)?false:true):true), item.id)}>
                                                <View style={{borderColor:"#2980b9", borderWidth: 1,alignItems: 'center',justifyContent: 'center', width: ((width/3)*(85/100)),margin: 5, height: ((width/3)*(85/100)), backgroundColor: ((typeof item.order !== "undefined")?((item.order.isBooked)?"#ccc":"#3498db"):"#3498db"), borderRadius: 10 }}><Text style={{color: "#fff", fontSize: 30}}>{item.name}</Text></View>
                                            </TouchableOpacity>
                                            </>
                                        )}
                                    />
                                    :<><Text>No Room Registered!</Text></>}
                                </View>
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
                                    style={{ width: (width*(95/100)) }}
                                    selectedValue={this.state.customerId}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item value="" label="Customer" />
                                        {this.props.getCustomer.data.map((item)=>{
                                            return (
                                                <Picker.Item label={`${item.name} (${item.identityNumber})`} value={item.id} />
                                            );
                                        })}
                                </Picker>
                                <Item>
                                    <Input value={this.state.duration} onChangeText={this.onDuration} placeholder="Duration"/>
                                </Item>

                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button rounded onPress={this.onCancelCheckIn} danger style={{flex:9, justifyContent: "center", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Cancel</Text>
                                    </Button>
                                    <View style={{flex: 1}} />
                                    {(!this.props.createCheckin.isLoading && this.props.createCheckin.data===null)?
                                    <Button rounded onPress={this.onCheckin} style={{flex:9, justifyContent: "center", backgroundColor:"#2980b9", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Save</Text>
                                    </Button>
                                    :
                                    <Button disabled rounded style={{flex:9, justifyContent: "center",textTransform: "capitalize", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Loading ...</Text>
                                    </Button>
                                    }
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
                                <Item>{(this.state.room && this.state.room.customer)?
                                    <Input value={this.state.room.customer.name+" ("+this.state.room.customer.identityNumber+")"} style={{backgroundColor:"#ccc", marginBottom: 5}} placeholder="customer id"/>:<></>}
                                </Item>
                                <Item>
                                    <Input value={this.state.duration} style={{backgroundColor:"#ccc", marginBottom: 5}}  placeholder="Duration"/>
                                </Item>

                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button rounded onPress={this.onCancelCheckOut} danger style={{flex:9, justifyContent: "center", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Cancel</Text>
                                    </Button>
                                    <View style={{flex: 1}} />
                                    {(!this.props.createCheckout.isLoading && this.props.createCheckout.data===null)?
                                    <Button rounded onPress={this.onCheckout} style={{flex:9, justifyContent: "center", backgroundColor:"#2980b9", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Checkout</Text>
                                    </Button>
                                    :
                                    <Button rounded disabled style={{flex:9, justifyContent: "center", elevation: 0}}>
                                        <Text style={{textTransform: "capitalize"}}>Loading ...</Text>
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
    editCheckout: Checkout.editCheckout,
    createCheckinReset: Checkin.resetCreateCheckin
  };

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(CheckinScreen));