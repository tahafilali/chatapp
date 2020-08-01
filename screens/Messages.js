import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'

const imageProfil = require('../assets/personne.png')
const MessageItem = ({image,name,message,time})=>{
    return (

    <View style={{
        flexDirection: "row", paddingHorizontal: 33, paddingVertical: 33, borderTopWidth: 0.2, borderBottomWidth: 0.2, borderColor: "#506677", justifyContent: "space-between"
    }}>
        <View style={{ flexDirection: "row"}}>
            <View>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 400 / 2 }}
                    source={image}
                />
            </View>
            <View style={{marginLeft:10}}>
                <Text style={{color:"#FFFFFF",fontSize:17,letterSpacing:1.2}}>{name}</Text>
                <Text style={{color:"#AAB2C8",marginTop:6,letterSpacing:1.1}}>{message}</Text>
            </View>
        </View>
        <View style={{marginTop:6}}>
            <Text style={{color:"#506677",fontSize:13,letterSpacing:1.1}}>{time}</Text>
        </View>

    </View>)
}
export default function Messages() {
    return (
        <View style={styles.container}>
            <Text style={{
                color: "#ECF1FF",
                fontSize: 25,
                marginVertical: 30,
                textAlign: "center"
            }}>Messages</Text>
            <ScrollView style={{flexGrow: 1}}>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
                <MessageItem image={imageProfil} name="Diane Tucker" message="How is your work going" time="2 hours ago"/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#142A3B",
        flex:1
    }
})
