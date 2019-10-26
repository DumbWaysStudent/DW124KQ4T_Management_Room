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
            inputPhone:""
        }
    }
    componentDidMount(){
        this.props.getAll(this.props.auth.data.token);
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
        this.props.onCreateCustomer(this.props.auth.data.token, {
            name: this.state.inputName,
            identity: this.state.inputIdentity,
            phone: this.state.inputPhone
        });
    }
    onCancel = () => {
        this.RBSheet.close();
    }
    successCreateCustomer = () => {
        this.props.addCustomer(this.props.createCustomer.data);
        this.RBSheet.close();
        
    }

    failedCreateCustomer = () => {
        console.log(this.props.createCustomer.error);
    }
    render(){
        return (
            <>
                {(!this.props.createCustomer.isLoading && this.props.createCustomer.data!=null)?<>{this.successCreateCustomer()}</>:<></>}
                {(!this.props.createCustomer.isLoading && this.props.createCustomer.error!=null)?<>{this.failedCreateCustomer()}</>:<></>}
                <Container>
                    <Header style={{backgroundColor: "#2980b9"}}>
                        <Left></Left>
                        <Body>
                            <Title>Customer</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                        <CardItem>
                            <Body>
                                <FlatList
                                    style={{}}
                                    data = {this.props.getCustomer.data}
                                    keyExtractor = {item => item.id.toString()}
                                    renderItem = {({item})=>(
                                        <>
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
                        style={{ backgroundColor: "#2980b9"}}
                        position="bottomRight"
                        onPress={() => {this.RBSheet.open();}}>
                        <Icon name="plus" type="FontAwesome" />
                    </Fab>
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
                                <View><Text style={{fontSize: 30}}>Add Customer</Text></View>
                                <Item>
                                    <Input value={this.state.inputName} placeholder="Name" onChangeText={this.onChangeName} />
                                </Item>
                                <Item>
                                    <Input value={this.state.inputIdentity} placeholder="Identity Number" onChangeText={this.onChangeIdentity} />
                                </Item>
                                <Item>
                                    <Input value={this.state.inputPhone} placeholder="Phone Number" onChangeText={this.onChangePhone} />
                                </Item>
                                <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                    <Button onPress={this.onCancel} danger style={{flex:1, justifyContent: "center"}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                    <Button onPress={this.onCreateCustomer} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
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
        getCustomer: state.getCustomer,
        createCustomer: state.createCustomer,
    }
}
const mapDispatchToProps = {
    getAll: Customer.index,
    onCreateCustomer: Customer.store,
    addCustomer: Customer.addCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);