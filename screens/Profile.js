import React, {useState, useEffect} from 'react'
import { View, TextInput, StyleSheet, Text,Button, TouchableOpacity } from 'react-native'
import Firebase, { db } from '../config/Firebase'
import { useNavigation } from '@react-navigation/native';

function Profile(props){
    const [form, setForm] = useState({
                                name:'',
                                email:'',
                                age:'',
                                uid:''
                                })
    const navigation = useNavigation();
    console.log("navigation")
    console.log(navigation)
    console.log("props")
    console.log(props)

    const handleSignout = () => {
        Firebase.auth().signOut()
        navigation.navigate('Login')
    }

    useEffect(() => {
        async function getLocalValues(){
            if(props.route.params && Object.keys(props.route.params).indexOf('uid') > -1){
                var uid = props.route.params.uid
                try {
                    const user = await db
                        .collection('users')
                        .doc(uid)
                        .get()
                    setForm({
                        name:user.data().name,
                        email:user.data().email,
                        age:user.data().age,
                        uid: uid
                    })
                } catch (e) {
                    alert(e)
                }
            }
        }
        getLocalValues()
    },[])

    

   const updateUser = () => {
        const updateDBRef = db.collection('users').doc(form.uid);
        updateDBRef.set({
          name: form.name,
          email: form.email,
          age: form.age,
        }).then(() => {
            alert("Updated Successfully")
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      }

        return (
            <View style={styles.container}>
                    <View style={styles.box}> 
                        <View style={{marginBottom:15}}>    
                            <Text style={styles.fontStyle}>Email : {form.email}</Text>
                        </View>                    
                        <View style={styles.input}>
                            <Text style={styles.fontStyle}>Name : </Text>
                            <TextInput
                            style={[styles.fontStyle],{ height: 40, borderColor: 'transparent', borderWidth: 1 }}
                            onChangeText={name => setForm({...form, name})}
                            value = {form.name? form.name : ''}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.fontStyle}>Age : </Text> 
                            <TextInput
                            style={[styles.fontStyle],{ height: 40, borderColor: 'transparent', borderWidth: 1 }}
                            onChangeText={(age) => setForm({...form, age})}
                            value = {form.age ? form.age : ''}
                            />
                        </View>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={updateUser}>
                        <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                <Button title='Logout' onPress={handleSignout} />
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
    box:{
        margin: 35,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius:5,
        padding: 35,

    },
    input: {
        padding: 0,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    fontStyle:{
        fontSize:16
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },

})

export default Profile;