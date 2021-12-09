import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends Component {
constructor(){
  super();
  this.state={
    buttonState:'normal',
    hasCameraPermissions:null,
    scanned:false,
    scannedData:''
  }
}


getCameraPermissions = async()=>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA)
 // console.log(status)
 this.setState(
  {
    buttonState:'clicked',
    hasCameraPermissions:status==='granted',
    scanned:false
  })
}


  render() {
    const {buttonState, hasCameraPermissions, scanned, scannedData} = this.state;

    if(buttonState==='clicked' && hasCameraPermissions === false){
      return(
        <Text>Permission Denied</Text>
      )
    }
    else if(buttonState==='clicked' && hasCameraPermissions === true){
      return(
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}>

        </BarCodeScanner>
      )
    }
    else{

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Transaction Screen</Text>
  
          <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>Click to Scan</Text>
          </TouchableOpacity>
  
        </View>
      )
    }

    ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width:'40%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F48D20',
    borderRadius:15
  },
  buttonText:{
    fontSize:24,
    color:'#FFFFFF'
  }
});