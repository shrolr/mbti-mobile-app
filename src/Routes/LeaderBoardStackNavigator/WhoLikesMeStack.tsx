import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WhoLikesMeParamList } from "./WhoLikesMeParamList";
import  WhoLikesMeScreen from "../Screens/WhoLikesMeScreen";

interface HomeStackProps {}

const Stack = createStackNavigator<WhoLikesMeParamList>();

export const WhoLikesMeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="WhoLikesMe">
      <Stack.Screen name="WhoLikesMe" component={WhoLikesMeScreen} />
    </Stack.Navigator>
  );
};
