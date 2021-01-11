import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Firebase, { db } from '../config/Firebase.js'


class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        age:''
    }

    handleSignUp = () => {
        const { name, email, password, age  } = this.state
        var regex = /\d/g;
        var allnums = (/^[0-9]+$/) 
        if(regex.test(name)){
            return alert("Names don't include numbers.")
        }
        if(allnums.test(age)){
            return alert("Age don't include letters.")
        }
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                    const user = {
                        name: name,
                        uid: response.user.uid,
                        email: email,
                        age:age
                    }
                    db.collection('users')
                        .doc(response.user.uid)
                        .set(user)
                    this.props.navigation.navigate('Profile',{uid:response.user.uid})
                })
            .catch(error => {
                alert(error.message)
            })
            
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full Name'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.age}
                    onChangeText={age => this.setState({ age })}
                    placeholder='AGE'
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup;