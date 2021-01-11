import React from 'react'
import { View, TextInput, StyleSheet, Text,Button, TouchableOpacity } from 'react-native'
import Firebase, { db } from '../config/Firebase'

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            age:'',
            uid:''
        }
    }
    handleSignout = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    componentDidMount(){
        this.getLocalValues()
    }

    async getLocalValues(){
        if(this.props.route.params && Object.keys(this.props.route.params).indexOf('uid') > -1){
            var uid = this.props.route.params.uid
            try {
                const user = await db
                    .collection('users')
                    .doc(uid)
                    .get()
                this.setState({
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

    updateUser() {
        const updateDBRef = db.collection('users').doc(this.state.uid);
        updateDBRef.set({
          name: this.state.name,
          email: this.state.email,
          age: this.state.age,
        }).then(() => {
            alert("Updated Successfully")
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      }

    
    render() {
        const { name,email,age } = this.state
        return (
            <View style={styles.container}>
                    <View style={styles.box}> 
                        <View style={{marginBottom:15}}>    
                            <Text style={styles.fontStyle}>Email : {email}</Text>
                        </View>                    
                        <View style={styles.input}>
                            <Text style={styles.fontStyle}>Name : </Text>
                            <TextInput
                            style={[styles.fontStyle],{ height: 40, borderColor: 'transparent', borderWidth: 1 }}
                            onChangeText={name => this.setState({name})}
                            value = {name?name : ''}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.fontStyle}>Age : </Text> 
                            <TextInput
                            style={[styles.fontStyle],{ height: 40, borderColor: 'transparent', borderWidth: 1 }}
                            onChangeText={(age) => {this.setState({age})}}
                            value = {age ? age : ''}
                            />
                        </View>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={()=>this.updateUser()}>
                        <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                <Button title='Logout' onPress={this.handleSignout} />
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