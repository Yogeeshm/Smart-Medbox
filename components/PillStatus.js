<<<<<<< HEAD
import React, {useEffect, useState,useRef} from 'react'
import { StyleSheet, Text, View, Dimensions, Switch, Animated, Pressable, Image, Alert } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Database from './Database';
import { Table, Row } from 'react-native-table-component';
import TitleScreen from './TitleScreen';
=======
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  Animated,
  Pressable,
  Image,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Database from "./Database";
>>>>>>> ee1af26e7fa31e486f91038d6577749ddaa25e51

const ESP8266_IP = "192.168.108.53";
const ESP8266_PORT = 80;
const AlarmListItem = (props) => {
<<<<<<< HEAD
const currentDate = new Date();
  const [taken, setTaken] = useState(false);
  const [dayText, setDayText] = useState('');
  const [tableData, setTableData] = useState([]);
  const titleString = props.alarm.title; 
  const slotNumber = titleString.split(" ")[1];
  const pillName=titleString.split(" ")[7];
  const tableRef = useRef(null);
  const addTableData = (rowData) => {
    setTableData([...tableData, rowData]);
  }

  useEffect(() => {
    if (props.alarm.active == 1) {
      fetch(`http://${ESP8266_IP}:${ESP8266_PORT}/taken`)
        .then(response => response.text())
        .then(text => {
          console.log("Received data:", text);
          if(text=='1T'){
            setTaken(true);
          }
        else{
            setTaken(false);
        }
        })
        .catch(error => console.error(error));
    }
    
    if (taken) {addTableData([
        [`From Slot ${slotNumber} pill ${pillName} was taken on `, currentDate.toLocaleDateString()," at ",props.alarm.hour],
      ]);
    }
    }, [props.alarm, taken]);

   
  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
      <Row data={['Status']} style={styles.head} textStyle={styles.text} />
      {tableData.map((rowData, index) => (
        <Row key={index} data={rowData} textStyle={styles.text} />
      ))}
    </Table>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: 'black',
  },
  text: {
    margin: 6,
    color:"white",
  },
});

export default AlarmListItem;
=======
  const [taken, setTaken] = useState(false);
  const [takencheck, setTakenCheck] = useState(false);
  const [dayText, setDayText] = useState("");
  const [selected, setSelected] = useState(false);
  const [active, setActive] = useState(false);
  const [responseText, setResponseText] = useState("");
  const changeActive = async () => {
    let currentActive = !active;
    Database.updateActive(currentActive ? 1 : 0, props.alarm.id);
    setActive(currentActive);
  };
  useEffect(() => {
    setSelected(false);
    if (props.alarm.active == 1) {
      setActive(true);
      fetch(`http://${ESP8266_IP}:${ESP8266_PORT}/taken`)
        .then((response) => response.text())
        .then((text) => {
          if (text === "T") {
            alert("Medicine Taken");
            console.log("taken Recieved");
            setTaken(true);
          } else {
            setTaken(false);
          }
        })
        .catch((error) => console.error(error));
    }
    // console.log(props.alarm)

    if (
      props.alarm.mon == 1 &&
      props.alarm.tue == 1 &&
      props.alarm.wed == 1 &&
      props.alarm.thu == 1 &&
      props.alarm.fri == 1 &&
      props.alarm.sat == 1 &&
      props.alarm.sun == 1
    ) {
      setDayText("Daily");
    } else if (
      props.alarm.mon == 1 &&
      props.alarm.tue == 1 &&
      props.alarm.wed == 1 &&
      props.alarm.thu == 1 &&
      props.alarm.fri == 1
    ) {
      setDayText("Monday to Friday");
    } else {
      let days = [];
      if (props.alarm.mon == 1) {
        days.push("mon");
      }
      if (props.alarm.tue == 1) {
        days.push("tue");
      }
      if (props.alarm.wed == 1) {
        days.push("wed");
      }
      if (props.alarm.thu == 1) {
        days.push("thu");
      }
      if (props.alarm.fri == 1) {
        days.push("fri");
      }
      if (props.alarm.sat == 1) {
        days.push("sat");
      }
      if (props.alarm.sun == 1) {
        days.push("sun");
      }
      if (days.length > 0) {
        setDayText(days.join(", "));
      } else {
        setDayText("Once");
      }
    }
  }, [props.alarm]);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.hour}>
          {props.alarm.hour} | {taken ? "Taken" : "Not Taken"}
        </Text>
        <Text
          style={{
            color: "white",
            marginLeft: 10,
            textAlignVertical: "center",
          }}
        >
          {dayText} | {props.alarm.title}
        </Text>
      </View>
    </View>
  );
};

export default AlarmListItem;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width / 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flex: 3,
    backgroundColor: "black",
  },
  right: {
    flex: 1,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hour: {
    fontSize: responsiveFontSize(6),
    color: "white",
    marginLeft: 10,
  },
  headerButton: {
    width: Dimensions.get("screen").width / 8,
    height: Dimensions.get("screen").width / 8,
  },
});
>>>>>>> ee1af26e7fa31e486f91038d6577749ddaa25e51
