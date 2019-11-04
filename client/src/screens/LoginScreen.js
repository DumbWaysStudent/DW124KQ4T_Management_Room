import React from 'react';
import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';
import {StyleSheet, View} from 'react-native';
import Auth  from '../services/Auth';
import { connect } from 'react-redux';


class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isSecurePassword: true,
            inputUsername: "",
            inputPassword: "",
            errors: [],
            isSubmitEnable: false,
        }

    }

    async componentDidMount(){
        await this.handleInputUsername("");
        await this.handleInputPassword("");
    }

    handleShowHidePassword = () => {
        this.setState({
            isSecurePassword: !this.state.isSecurePassword
        });
    }


    handleInputUsername = (text) => {
        var errors = [];
        if(text === "" || text === null){
            errors.push("Username is required!");
        }
        var allError = this.state.errors.filter((item, index)=> item.input !== "username");

            if(errors.length>0){
                allError.push({
                    input: "username",
                    errors: errors
                });
            }

            this.checkError({
                inputUsername: text,
                errors: allError  
            });
    }

    handleInputPassword = (text) => {
        var errors = [];
        if(text === "" || text === null){
            errors.push("Password is required!");
        }
        var allError = this.state.errors.filter((item, index)=> item.input !== "password");

            if(errors.length>0){
                allError.push({
                    input: "password",
                    errors: errors
                });
            }

            this.checkError({
                inputPassword: text,
                errors: allError  
            });
    }

    checkError = (json) => {
        var isEnabeled = false;

        if(json.errors.length>0){
            isEnabeled = false
        }
        else{
            isEnabeled =  true
        }
        var objs = {...json, isSubmitEnable: isEnabeled};

        this.setState(objs);
    }

    handleSubmit = () => {
        var data = {
                username: this.state.inputUsername,
                password: this.state.inputPassword
        };
        this.props.login(data);
    }
    
    loginSuccess = () =>{

        if(this.props.auth.data){
            Auth.save(this.props.auth.data);
            this.props.navigation.navigate('Main');
        }
    }

    loginFail = () => {
        let error = this.props.auth.error;
        if(typeof error.data !== "undefined" && typeof error.data.msg !== "undefined"){
            alert(error.data.msg);
        }
        else{
            alert("Check your internet connection!");
        }
        this.props.authReset();
    }

  render() {
    return (
        <Container style={styles.container}>
            {(this.props.auth.isLoading === false && this.props.auth.data)?<>{this.loginSuccess()}</>:<></>}
            {(this.props.auth.isLoading === false && this.props.auth.error)?<>{this.loginFail()}</>:<></>}
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <View style={styles.form}>
                                <H1 style={styles.title}>WaterFall Room</H1>
                                <Text style={styles.subTitle}>Login</Text>
                                <Item>
                                    <Input placeholder="Username" value={this.state.inputUsername} onChangeText={this.handleInputUsername} />
                                </Item>
                                <Item last>
                                    <Input placeholder="Password" value={this.state.inputPassword} secureTextEntry={this.state.isSecurePassword} onChangeText={this.handleInputPassword} />
                                    <Button onPress={this.handleShowHidePassword} transparent>
                                        <Icon style={styles.buttonEyeIcon} type="FontAwesome" name={this.state.isSecurePassword ? "eye-slash":"eye"} />
                                    </Button>
                                </Item>
                                {((this.state.isSubmitEnable) ) ?
                                    <> 
                                    {(this.props.auth.isLoading===false)?<>
                                        <Button rounded onPress={this.handleSubmit} style={{...styles.buttonLogin, backgroundColor: '#3498db'}} block>
                                            <Text>Log In</Text>
                                        </Button>
                                    </>:<>
                                        <Button rounded disabled style={styles.buttonLogin} block>
                                            <Text>Loading</Text>
                                        </Button>
                                    </>}
                                    
                                    </>
                                        : 
                                    <Button rounded disabled style={styles.buttonLogin} block>
                                        <Text>Log In</Text>
                                    </Button>
                                }
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
  }
};


const styles = StyleSheet.create({
    buttonLogin: {
        marginTop: 20
    },
    form: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#2980b9"
    },
    title: {color: "#3498db", fontWeight: "bold"},
    subTitle: {color: "#bdc3c7"},
    buttonEyeIcon: {color:'#3498db'}
  });


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = {
    login: Auth.login,
    authReset: Auth.resetAuth
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);