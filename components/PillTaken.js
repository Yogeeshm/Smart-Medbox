import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, ScrollView, Dimensions, Image,Button } from 'react-native'
import PillStatus from './PillStatus'
import Database from './Database';

const AlarmListScreen = (props) => {

    const [alarms, setAlarms] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        getAlarms()
    }, [isFocused])

    useEffect(() => {
        let interval = setInterval(()=>{getAlarms()},60000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const getAlarms = async () => {
        let dbAlarms = await Database.get()
        dbAlarms = JSON.parse(dbAlarms)
        setAlarms(dbAlarms.rows._array)   
    }

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.screen}>
                {alarms.map((alarm, i)=><PillStatus key={i} alarm={alarm}/>)}
            </ScrollView>
        </View>
    )
}

export default AlarmListScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'black'
    },
    button:{
        width: Dimensions.get('screen').width/4,
        height: Dimensions.get('screen').width/4,
        tintColor:'white'
    },
    left:{
        position:'absolute',
        bottom:10,
        left: Dimensions.get('screen').width/2-(Dimensions.get('screen').width/8),
    }
})
