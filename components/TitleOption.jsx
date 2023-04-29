import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Switch, Animated, Pressable, Image, TextInput } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import {Picker} from '@react-native-picker/picker';
import confirmButton from '../assets/confirm.png'
import {  Button } from 'react-native';
import { Alert } from 'react-native';

const TitleOption = (props) => {
    const daysInMonth = Array.from({ length: 20 }, (_, i) => i + 1);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(0))
    const [pillNum, setPillNum] = useState("");
    const [selectedBox, setSelectedBox] = useState("");
    const [pill, setPill] = useState('');
    let textInput;
    
    useEffect(() => {
        Animated.spring(
            animationValue,
            {
                toValue: -Dimensions.get('screen').height,
                useNativeDriver: true,
            }
        ).start(textInput.focus())
    }, [])

    const closeOptions = () => {
        Animated.spring(
            animationValue,
            {
                toValue: 0,
                useNativeDriver: true,
            }
        ).start(props.close)
    }

    const sendData = () => {
        if ( selectedBox && pill && pillNum) {
            // send data to server
            textInput.blur()
        closeOptions()
        setPill(pill)
        setSelectedBox(selectedBox)
        setPillNum(pillNum)
        props.set("Slot "+selectedBox +" | " +"Pill Count "+pillNum+" | "+pill)
          } else {
            // show an error message
            Alert.alert('Please fill details for all the fields.');
          }

    }

    

    return (
        <Animated.View style={{position:'absolute', top:Dimensions.get('screen').height, left:0, width:'100%', height:'100%', transform:[{translateY:animationValue}]}}>
            <Pressable style={{ top:0, left:0, width:Dimensions.get('window').width, height:Dimensions.get('window').height}} onPress={()=>{if(textInput.isFocused()){textInput.blur()}else{closeOptions()}}}>
                <View></View>
            </Pressable>
            <View style={styles.container}>
            <View style={{marginTop:7,marginBottom:7}}>
                    <Text style={[styles.text, {textAlign:'center'}]}>Enter Details</Text>
                </View>
                <View style={{ width:Dimensions.get('window').width}}></View>
                <View>
      <Picker
      selectedValue={selectedBox}
      onValueChange={(itemValue) => setSelectedBox(itemValue)}
      style={{color:'white',marginLeft:"7%",marginRight:"7%"}}
      >
        <Picker.Item label="Select Slot Number" value="" />
        <Picker.Item label="Slot 1" value="1" />
        <Picker.Item label="Slot 2" value="2" />
        <Picker.Item label="Slot 3" value="3" />
        <Picker.Item label="Slot 4" value="4" />
        <Picker.Item label="Slot 5" value="5" />
        <Picker.Item label="Slot 6" value="6" />
        <Picker.Item label="Slot 7" value="7" />
        <Picker.Item label="Slot 8" value="8" />
      </Picker>
    </View>
            
                <TextInput
                    placeholder='Enter Medicine Name'
                    placeholderTextColor={"#d1d1d1"}
                    defaultValue={pill}
                    onChangeText={text=>setPill(text)}
                    selectTextOnFocus={true}
                    ref={ref=>textInput=ref}
                    style={styles.input}
                    selectionColor={'#1976D2'}
                ></TextInput>

<Picker
  selectedValue={pillNum}
  onValueChange={(itemValue) => setPillNum(itemValue)}
  style={{ color: 'white', marginLeft: '7%', marginRight: '7%' }}
>
  <Picker.Item label="Select Number of Pill Inserted" value="" />
  {daysInMonth.map((day) => (
    <Picker.Item key={day} label={day.toString()} value={day.toString()} />
  ))}
</Picker>
                
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Pressable onPress={()=>{closeOptions()}} style={[styles.button, {backgroundColor:'darkgray'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Cancel</Text></Pressable>
                    <Pressable onPress={()=>{sendData()}} style={[styles.button, {backgroundColor:'#1976D2'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Ok</Text></Pressable>
                </View>
            </View>
        </Animated.View>
    )
}

export default TitleOption

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:2*(Dimensions.get('window').width/2.55),
        bottom:0,
        // zIndex:10,
        backgroundColor:'#808080',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    option:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width/5,
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontSize:responsiveFontSize(3),
    },
    button:{
        marginHorizontal:20,
        width:(Dimensions.get('window').width/2)-40,
        paddingVertical:10,
        borderRadius:responsiveFontSize(3),
    },
    buttonText:{
        color:'white',
        fontSize:responsiveFontSize(3),
        textAlign:'center'
    },
    input:{
        borderWidth:3,
        borderRadius:Dimensions.get('window').width/20,
        paddingVertical:10,
        borderColor:'#1976D2',
        fontSize:responsiveFontSize(3),
        backgroundColor:'#787878',
        width:Dimensions.get('window').width-50,
        paddingLeft:20,
        marginHorizontal:25,
        color:'white',
        textDecorationLine:'none'
    }
})
