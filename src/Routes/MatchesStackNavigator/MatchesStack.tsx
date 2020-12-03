import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MatchesParamList } from "./MatchesParamList";
import MatchesScreen from "../Screens/MatchesScreen";
import ChatScreen from "../Screens/ChatScreen";
import UserScreen from "../Screens/UserScreen";

interface MatchesStackProps { }

const Stack = createStackNavigator<MatchesParamList>();

export const MatchesStack: React.FC<MatchesStackProps> = ({ }) => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Matches">
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="User" component={UserScreen} />

    </Stack.Navigator>
  );
};
