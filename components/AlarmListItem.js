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
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Database from "./Database";
import { useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

const ESP8266_IP = "192.168.108.53";
const ESP8266_PORT = 80;

const AlarmListItem = (props) => {
  const [dataSent, setDataSent] = useState(false);
  const [dayText, setDayText] = useState("");
  const [selected, setSelected] = useState(false);
  const [active, setActive] = useState(false);
  const changeActive = async () => {
    let currentActive = !active;
    Database.updateActive(currentActive ? 1 : 0, props.alarm.id);
    setActive(currentActive);
  };

  useEffect(() => {
    if (dataSent) {
      const hour = props.alarm.hour;
      const Box = props.alarm.title;
      fetch(`http://${ESP8266_IP}:${ESP8266_PORT}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Box, hour }),
      })
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dataSent]);

    useEffect(() => {
        setSelected(false)
        if(props.alarm.active==1){
            setActive(true)
            setDataSent(true)
        }       
        const titleString = props.alarm.title; 
        const slotNumber = titleString.split(" ")[1];
        const startIndex = titleString.indexOf("Pill Count") + 10; 
        const endIndex = titleString.indexOf("|", startIndex);
        const pillCount = titleString.substring(startIndex, endIndex).trim(); 
        let alertShown = false;
        if(pillCount==1 && !alertShown)
        {
           alert(`Only One Pill Remaining in Slot ${slotNumber} Refill/Update Info Requested`);
           alertShown = true;
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

  const handlePress = (e) => {
    if (props.selectMode) {
      props.select();
      setSelected((prev) => !prev);
    } else {
      props.click(e);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.left}
        onPress={(e) => {
          handlePress(e);
        }}
        onLongPress={() => {
          props.select();
          setSelected((prev) => !prev);
        }}
      >
        <View style={styles.left}>
          <Text style={styles.hour}>{props.alarm.hour}</Text>
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
      </Pressable>
      <View style={styles.right}>
        <Switch
          // trackColor={{ false: "red", true: "green" }}
          thumbColor={"white"}
          ios_backgroundColor="white"
          onValueChange={changeActive}
          value={active}
        />
      </View>
      {selected ? (
        <Pressable
          onPress={(e) => {
            handlePress(e);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").width / 4,
            backgroundColor: "rgba(250, 160, 160, 0.5)",
            borderTopEndRadius: 25,
            borderBottomEndRadius: 25,
          }}
        ></Pressable>
      ) : null}
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
    fontSize: responsiveFontSize(7),
    color: "white",
    marginLeft: 10,
  },
  headerButton: {
    width: Dimensions.get("screen").width / 8,
    height: Dimensions.get("screen").width / 8,
  },
});
