import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button, Fab, Icon } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Customer  from '../services/Customer';


const {width, height} = Dimensions.get('window');

class CustomerScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            inputName:"",
            inputIdentity:"",
            inputPhone:"",
            editInputName:"",
            editInputIdentity:"",
            editInputPhone:"",
            refreshing: false,
            identityNumber: "",
            editId: ""
        }
    }
    componentDidMount(){

        if(this.props.auth.data){
        this.props.getAll(this.props.auth.data.token);
        }
    }
    onLoad = () => {
        this.setState({
            refreshing: true
        });
        if(this.props.auth.data){
            this.props.getAll(this.props.auth.data.token);
        }
        this.setState({
            refreshing: false
        });
    }
    onChangeName = (text) => {
        this.setState({
            inputName: text
        });
    }
    onChangeIdentity = (text) => {
        this.setState({
            inputIdentity: text
        });
    }
    onChangePhone = (text) => {
        this.setState({
            inputPhone: text
        });
    }
    onCreateCustomer = () => {
        if(this.props.auth.data){
        this.props.onCreateCustomer(this.props.auth.data.token, {
            name: this.state.inputName,
            identity: this.state.inputIdentity,
            phone: this.state.inputPhone
        });
    }
    }
    onCancel = () => {
        this.RBSheet.close();
    }
    successCreateCustomer = () => {
        this.props.addCustomer(this.props.createCustomer.data);
        this.RBSheet.close();
        
    }

    failedCreateCustomer = () => {
        if(typeof this.props.createCustomer.error !=="undefined" && typeof this.props.createCustomer.error.data !=="undefined" && typeof this.props.createCustomer.error.data.errors !=="undefined"){
            let str = ""
            let error = this.props.createCustomer.error.data.errors;
            for(var key in error){
                error[key].forEach((item, i)=>{
                    str = str + item+"\n";
                });
            }
            alert(str);
            this.props.resetCreateCustomer()
        }
    }

    onDetailCustomer = (id) => {
        let data = this.props.getCustomer.data.filter((item)=>item.id===id);
        if(data.length > 0 ){
            let state = this.state;
            this.setState({
                ...state,
                editInputName:data[0].name,
                editInputIdentity:data[0].identityNumber,
                editInputPhone:data[0].phoneNumber,
                focusInputEditCustomer: true,
                identityNumber:data[0].identityNumber,
                editId: id
            });
            this[RBSheet + 1].open();
        }
    }
    onEditCancel = (id) => {
        this[RBSheet + 1].close();
    }
    onChangeEditName = (text) => {
        this.setState({
            editInputName: text
        });
    }
    onChangeEditIdentity = (text) => {
        this.setState({
            editInputIdentity: text
        });
    }
    onChangeEditPhone = (text) => {
        this.setState({
            editInputPhone: text
        });
    }
    onUpdateCustomer = (id) => {
        if(this.props.auth.data){
        this.props.onUpdateCustomer(this.props.auth.data.token, {
            name:this.state.editInputName,
            identity:this.state.editInputIdentity,
            phone:this.state.editInputPhone,
        }, id);
    }
    }
    successUpdateCustomer = () =>{
        this[ RBSheet + 1].close();
        this.props.editCustomer(this.props.updateCustomer.data);
    }

    failedUpdateCustomer = () => {
        if(typeof this.props.updateCustomer.error !=="undefined" && typeof this.props.updateCustomer.error.data !=="undefined" && typeof this.props.updateCustomer.error.data.errors !=="undefined"){
            let str = ""
            let error = this.props.updateCustomer.error.data.errors;
            for(var key in error){
                error[key].forEach((item, i)=>{
                    str = str + item+"\n";
                });
            }
            alert(str);
            this.props.resetUpdateCustomer()
        }
    }
    fabAddCustomer = () => {
        this.setState({
            focusInputAddCustomer: true
        })
        this.RBSheet.open();
    }
    render(){
        return (
            <>
                {(!this.props.createCustomer.isLoading && this.props.createCustomer.data!=null)?<>{this.successCreateCustomer()}</>:<></>}
                {(!this.props.createCustomer.isLoading && this.props.createCustomer.error!=null)?<>{this.failedCreateCustomer()}</>:<></>}

                {(!this.props.updateCustomer.isLoading && this.props.updateCustomer.data!=null)?<>{this.successUpdateCustomer()}</>:<></>}
                {(!this.props.updateCustomer.isLoading && this.props.updateCustomer.error!=null)?<>{this.failedUpdateCustomer()}</>:<></>}
                <Container>
                    <Header androidStatusBarColor="#2980b9" style={{backgroundColor: "#2980b9"}}>
                        <Body>
                            <Title style={{fontWeight: "bold"}}>Customer</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onLoad} />
                    }>
                        <CardItem>
                            <Body>
                                <FlatList
                                    style={{}}
                                    data = {this.props.getCustomer.data}
                                    keyExtractor = {item => item.id.toString()}
                                    renderItem = {({item})=>(
                                        <>
                                            <TouchableOpacity onPress={this.onDetailCustomer.bind(this, item.id)}>
                                            <View style={{flex: 1, flexDirection:'row', marginBottom: 15}}>
                                                <Image style={{width: 65, height: 65, borderRadius:(65/2)}} source={{uri: `${item.image}`}} />
                                                <View style={{marginLeft: 20}}>
                                                    <View style={{flex:1, justifyContent:"center"}}>
                                                        <Text>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={{flex:1, justifyContent:"center"}}>
                                                        <Text>
                                                            {item.identityNumber}
                                                        </Text>
                                                    </View>
                                                    <View style={{flex:1, justifyContent:"center"}}>
                                                        <Text>
                                                            {item.phoneNumber}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                    />
                            </Body>
                        </CardItem>
                    </Content>
                    <Fab
                        active={false}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: "#2980b9", elevation: 0}}
                        position="bottomRight"
                        onPress={this.fabAddCustomer}>
                        <Icon name="plus" type="FontAwesome" />
                    </Fab>
                    <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnDragDown={true}
                    height={320}
                    duration={250}
                    customStyles={{
                        container: {}
                    }}
                    >
                            <View style={{padding: 10}}>
                                <View><Text style={{fontSize: 30}}>Add Customer</Text></View>
                                <Item>
                                    <Input autoFocus={true} value={this.state.inputName} placeholder="Name" onChangeText={this.onChangeName} />
                                </Item>
                                <Item>
                                    <Input value={this.state.inputIdentity} placeholder="Identity Number" onChangeText={this.onChangeIdentity} />
                                </Item>
                                <Item>
                                    <Input value={this.state.inputPhone} placeholder="Phone Number" onChangeText={this.onChangePhone} />
                                </Item>
                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancel} rounded danger style={{flex:9, justifyContent: "center", elevation: 0}}>
                                        <Text style={{textTransform:"capitalize"}}>Cancel</Text>
                                    </Button>
                                    <View style={{flex: 1}} />
                                    <Button onPress={this.onCreateCustomer} rounded style={{flex:9, justifyContent: "center", backgroundColor:"#2980b9", elevation: 0}}>
                                        <Text style={{textTransform:"capitalize"}}>Save</Text>
                                    </Button>
                                </View>
                            </View>
                    </RBSheet>
                    <RBSheet
                        ref={ref => {
                            this[RBSheet + 1] = ref;
                        }}
                        closeOnDragDown={true}
                        height={320}
                        duration={250}
                        customStyles={{
                            container: {}
                        }}
                        >
                                <View style={{padding: 10}}>
                                    <View><Text style={{fontSize: 30}}>Edit Customer</Text></View>
                                    <Item>
                                        <Input autoFocus={true} value={this.state.editInputName} placeholder="Name" onChangeText={this.onChangeEditName} />
                                    </Item>
                                    <Item>
                                        <Input value={this.state.editInputIdentity} placeholder="Identity Number" onChangeText={this.onChangeEditIdentity} />
                                    </Item>
                                    <Item>
                                        <Input value={this.state.editInputPhone} placeholder="Phone Number" onChangeText={this.onChangeEditPhone} />
                                    </Item>
                                    <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                        <Button rounded onPress={this.onEditCancel.bind(this, this.state.editId)} danger style={{flex:9, justifyContent: "center", elevation: 0}}>
                                            <Text style={{textTransform:"capitalize"}}>Cancel</Text>
                                        </Button>
                                        <View style={{flex:1}} />
                                        <Button rounded onPress={this.onUpdateCustomer.bind(this, this.state.editId)} style={{flex:9, justifyContent: "center", backgroundColor:"#2980b9", elevation: 0}}>
                                            <Text style={{textTransform:"capitalize"}}>Update</Text>
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
        getCustomer: state.getCustomer,
        createCustomer: state.createCustomer,
        updateCustomer: state.updateCustomer
    }
}
const mapDispatchToProps = {
    getAll: Customer.index,
    onCreateCustomer: Customer.store,
    addCustomer: Customer.addCustomer,
    editCustomer: Customer.editCustomer,
    onUpdateCustomer: Customer.update,
    resetCreateCustomer: Customer.resetCreateCustomer,
    resetUpdateCustomer: Customer.resetUpdateCustomer

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);