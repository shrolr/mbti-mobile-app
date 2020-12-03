import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "./HomeParamList";
import FeaturedScreen from "../Screens/FeaturedScreen";
import UserScreenFeatured from "../Screens/UserScreenFeatured";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator  headerMode="none" initialRouteName="Home">
      <Stack.Screen  name="Home" component={FeaturedScreen} />
      <Stack.Screen  name="User" component={UserScreenFeatured} />

    </Stack.Navigator>
  );
};
