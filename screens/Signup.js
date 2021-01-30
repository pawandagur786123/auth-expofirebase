import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Firebase, { db } from '../config/Firebase.js'
import { useNavigation } from '@react-navigation/native';

function Signup() {
    const [form, setForm] = useState({
        name : '',
        email : '',
        password : '',
        age : ''
    }) 
    const navigation = useNavigation();
    const handleSignUp = () => {
            var regex = /\d/g;
            var allnums = (/^[0-9]+$/) 
            if(regex.test(form.name)){
                return alert("Names don't include numbers.")
            }
            if(!allnums.test(form.age)){
                return alert("Age don't include letters.")
            }
            Firebase.auth()
                .createUserWithEmailAndPassword(form.email, form.password)
                .then((response) => {
                        const user = {
                            name: form.name,
                            uid: response.user.uid,
                            email: form.email,
                            age:form.age
                        }
                        db.collection('users')
                            .doc(response.user.uid)
                            .set(user)
                        navigation.navigate('Profile',{uid:response.user.uid})
                    })
                .catch(error => {
                    alert(error.message)
                })       
        }
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={form.name}
                    onChangeText={name => setForm({...form, name})}
                    placeholder='Full Name'
                />
                <TextInput
                    style={styles.inputBox}
                    value={form.email}
                    onChangeText={email => setForm({...form,email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={form.password}
                    onChangeText={password => setForm({...form, password})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    value={form.age}
                    onChangeText={age => setForm({...form, age})}
                    placeholder='AGE'
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
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