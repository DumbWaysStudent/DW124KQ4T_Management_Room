import React, { Component } from "react";
import { View, Text, Container, Content, Header, Left, Title, Right, Body, CardItem, Input, Item, Button } from "native-base";
import { FlatList, RefreshControl, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux';
import RBSheet from "react-native-raw-bottom-sheet";
import Customer  from '../services/Customer';


const {width, height} = Dimensions.get('window');

class CustomerScreen extends Component {
    componentDidMount(){
        this.props.getAll(this.props.auth.data.token);
    }
    render(){
        return (
            <>
                {console.log(this.props.getCustomer.data)}
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
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        getCustomer: state.getCustomer,
    }
}
const mapDispatchToProps = {
    getAll: Customer.index
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);