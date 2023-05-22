import React, {useEffect, useState,useRef} from 'react'
import { StyleSheet, Text, View, Dimensions, Switch, Animated, Pressable, Image, Alert } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Database from './Database';
import { Table, Row } from 'react-native-table-component';
import TitleScreen from './TitleScreen';

 const ESP8266_IP = '192.168.108.53';
//const ESP8266_IP = '192.168.29.88';
const ESP8266_PORT = 80;
const AlarmListItem = (props) => {
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
