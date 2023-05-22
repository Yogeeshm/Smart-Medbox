import React, { useState, useEffect, useRef } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  Button,
} from "react-native";
import * as TaskManager from "expo-task-manager";
import * as SQLite from "expo-sqlite";

import AlarmListItem from "./AlarmListItem";
import BigAlarm from "./BigAlarm";
import Database from "./Database";

import add from "../assets/add.png";
import bin from "../assets/bin.png";
import view from "../assets/view.png";
const AlarmListScreen = (props) => {
  const [bigAlarm, setBigAlarm] = useState(false);
  const [bigAlarmTop, setBigAlarmTop] = useState(0);
  const [alarms, setAlarms] = useState([]);

  const [selected, setSelected] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    setBigAlarm(false);
    getAlarms();
  }, [isFocused]);

  useEffect(() => {
    let interval = setInterval(() => {
      getAlarms();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getAlarms = async () => {
    let dbAlarms = await Database.get();
    dbAlarms = JSON.parse(dbAlarms);
    setSelected([]);
    setSelectMode(false);
    setAlarms(dbAlarms.rows._array);
  };

  const openBigAlarm = (id, top) => {
    console.log(id, top);
    setBigAlarm(id);
    if (id != false) {
      console.log(
        top - 120 + Dimensions.get("screen").width,
        Dimensions.get("screen").height
      );
      if (top < 200) {
        setBigAlarmTop(20);
      } else if (
        top - 120 + Dimensions.get("screen").width >
        Dimensions.get("window").height
      ) {
        setBigAlarmTop(
          Dimensions.get("window").height -
            (Dimensions.get("screen").width + 80)
        );
      } else {
        setBigAlarmTop(Math.floor(top - 180));
      }
    } else {
      getAlarms();
    }
  };

  const deleteAlarm = async () => {
    console.log("deleted");
    for (let i = 0; i < alarms.length; i++) {
      console.log(selected[i]);
      if (selected[i] == true) {
        await Database.delete(alarms[i].id);
      }
    }
    getAlarms();
  };

  const selectAlarm = (index) => {
    let currentSelected = [...selected];
    currentSelected[index] = !currentSelected[index];
    console.log(currentSelected);
    if (currentSelected.find((el) => el == true) != undefined) {
      if (!selectMode) {
        setSelectMode(true);
      }
    } else {
      setSelectMode(false);
    }
    setSelected(currentSelected);
  };

  const editAlarm = () => {
    props.navigation.navigate("AlarmOptions", { alarm: alarms[bigAlarm - 1] });
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textHead}>SMART MEDBOX</Text>
      </View>

      <View style={styles.subheader}>
        <Text style={styles.textSubHead}>Alarm Lists</Text>
      </View>

      <View style={styles.screen}>
        <ScrollView>
          {alarms.map((alarm, i) => (
            <AlarmListItem
              key={i}
              alarm={alarm}
              click={(evt) => {
                openBigAlarm(i + 1, evt.nativeEvent.pageY);
              }}
              select={() => {
                selectAlarm(i);
              }}
              selectMode={selectMode}
              delete={() => {
                deleteAlarm(alarm.id);
              }}
            />
          ))}
        </ScrollView>

        <Pressable
          style={[styles.button, styles.right_1]}
          onPress={() => {
            if (selectMode) {
              deleteAlarm();
            } else {
              props.navigation.navigate("AlarmOptions", { alarm: false });
            }
          }}
        >
          <View style={{ flex: 1 }}>
            {selectMode ? (
              <Image
                style={[styles.button_del, { tintColor: "white" }]}
                source={bin}
              ></Image>
            ) : (
              <Image style={[styles.button]} source={add}></Image>
            )}
          </View>
        </Pressable>
        <Pressable
          style={[styles.button_1, styles.left_1]}
          onPress={() => {
            props.navigation.navigate("PillStatus");
          }}
        >
          <View style={{ flex: 1 }}>
            {selectMode ? (
              <Image></Image>
            ) : (
              <Image style={styles.button_1} source={view}></Image>
            )}
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default AlarmListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    width: Dimensions.get("screen").width / 5,
    height: Dimensions.get("screen").width / 5,
    tintColor: "white",
  },
  left: {
    position: "absolute",
    bottom: 30,
    left:
      Dimensions.get("screen").width / 2 - Dimensions.get("screen").width / 3,
  },
  button_1: {
    width: Dimensions.get("screen").width / 5,
    height: Dimensions.get("screen").width / 5,
    tintColor: "white",
  },
  left_1: {
    position: "absolute",
    bottom: 30,
    left:
      Dimensions.get("screen").width / 2 + Dimensions.get("screen").width / 5,
  },
  right_1: {
    position: "absolute",
    bottom: 30,
    right:
      Dimensions.get("screen").width / 2 + Dimensions.get("screen").width / 5,
  },
  button_del: {
    width: Dimensions.get("screen").width / 4,
    height: Dimensions.get("screen").width / 4,
    tintColor: "white",
    alignSelf: "center",
    bottom: 20,
  },
  header: {
    backgroundColor: "black",
    textAlign: "center",
  },
  textHead: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    marginTop: 40,
  },
  subheader: {
    backgroundColor: "black",
  },
  textSubHead: {
    color: "white",
    fontSize: 20,
    marginVertical: 5,
    marginTop: 40,
    paddingLeft: 25,
  },
});
