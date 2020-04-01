import "react-native-gesture-handler";
import React, {Component} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import Travel from "./navigation/Travel";


const AppContainer = createAppContainer(Travel);

export default class App extends React.Component{

  render() {
    return (
      <AppContainer/>
    );
  }
  
}

