import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput,ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import $ from 'jquery';

const Chat = require('twilio-chat');
const MesssageBubble = ({ isMine, message}) => {
  return (
    <View style={{ alignSelf: isMine ? "flex-end" : "flex-start" }}>
      <View style={isMine ? styles.mine : styles.notmine}>
        <Text style={{ color: "white", letterSpacing: 1.1, lineHeight: 20 }}>{message}</Text>
      </View>
      <Text style={{ textAlign: "right", color: "#506677", fontSize: 12, letterSpacing: 1.1 }}>fff</Text>
    </View>
  )
}
export default class ChatScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: '',
      channel: null,
      token: {},
      input: ''
    }
  
  }
  
  getToken = () => {
    let promise = new Promise((resolve,reject)=>{
      fetch('https://twilioapi-123.herokuapp.com/token')
      .then((response) => response.json())
      .then((token) => {
        this.setState({token})
        this.setState({username : token.identity})
        resolve(token)
    })})
  return promise
      
     

  
     
    
  
    }
  addMessage = (message) => {
    
    const messageData = { message, me: true }
    this.state.channel.sendMessage(text);
    this.setState({
      messages: [...this.state.messages, messageData],
      input : ''
    })
     
  }
  componentDidMount = () => {
    this.getToken()
   .then(this.createChatClient)
    .catch((error) => {
  this.toast("error")
    }) 
       

    
  }

  toast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
 

  createChatClient = (token) => {
    
    let promise1 = new Promise((resolve,reject)=>{
      Chat.Client.create(token).then((client) =>{
        client.getSubscribedChannels().then(()=>{
          client.getChannelByUniqueName('general').then((channel)=>{
            this.setState({channel})
            channel.join().then(()=>{
              this.toast("worked")
              
            }).catch(() => reject(Error('Could not join general channel.')))
            resolve(channel)
          }).catch(() => reject(Error('Could not join general channel.')))
        }).catch(() => reject(Error('Could not join general channel.')))
      })
      
    })
    return promise1
    
  }

  joinGeneralChannel = () => {
    
    let promise2 = new Promise((resolve, reject)=>{
      resolve("test")
    })
    return promise2
  }

  createGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
        .then(() => this.joinGeneralChannel(chatClient))
        .catch(() => reject(Error('Could not create general channel.')))
    })
  }
  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      const messageData = { message, me: false }
      this.setState({
        messages: [...this.state.messages,  messageData],
      })
    })

    channel.on('memberJoined', (member) => {

    })

    channel.on('memberLeft', (member) => {
  
    })
  }

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text);
      this.addMessage(text)
    }
  }




  render() {
    const test = "hello"
    return (
      <View style={{ flex: 1, backgroundColor: "#142A3B" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, alignItems: "center", alignContent: "center", borderBottomWidth: 0.2, borderColor: "#506677", paddingVertical: 30 }}>
          <View><AntDesign name="arrowleft" size={25} color="white" /></View>
          <View>
            <View>
              <Image
              
              
                style={{ width: 45, height: 45, borderRadius: 400 / 2, alignSelf: "center" }}
                source={require('../assets/personne.png')}
              />
              <View style={{ marginTop: 5 }}>
                <Text style={{ textAlign: "center", color: "white", fontSize: 18, letterSpacing: 1.1 }}>{this.state.username}</Text>
              </View>
            </View>
          </View>
          <View></View>
        </View>
        <View>
          <ScrollView style={{ marginHorizontal: 30, marginVertical: 20 }}>
            {
              this.state.messages.map((message, index) => {
                return (
                  <MesssageBubble isMine={message.me}  key={index} message={message.message}/>
                )
              })
            }


          </ScrollView>

        </View>
        <View style={{ flexDirection: "row", borderTopWidth: 0.7, borderColor: "#506677", paddingHorizontal: 30, justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ padding: 10 }}>
              <Entypo name="attachment" size={24} color="#ECF1FF" />
            </View>
            <View style={{}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', fontSize: 16, color: "white",flex: 1,
                justifyContent: 'flex-end',}}
                placeholder="Write your message..."
                value={this.state.input}
                onChangeText={input => this.setState({ input })}
              />
            </View>
          </View>
          <View style={{ padding: 5 }}>
            <AntDesign onPress={()=>this.addMessage(this.state.input)}  name="arrowright" size={25} color="#ECF1FF" style={{ backgroundColor: "#5574F7", borderRadius: 50, padding: 5 }} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  notmine: {
    marginVertical: 10,
    backgroundColor: "#1F3C53",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "flex-start"
  },
  mine: {
    marginVertical: 10,
    backgroundColor: "#5574F7",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: "flex-end"
  }
})
