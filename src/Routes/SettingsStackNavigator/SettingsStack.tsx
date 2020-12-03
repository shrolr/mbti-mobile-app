import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsParamList } from "./SettingsParamList";
import ProfileScreen from "../Screens/ProfileScreen";
import MediaScreen from "../Screens/MediaScreen";
import InterestScreen from "../Screens/InterestScreen";
import InterestTypesScreen from "../Screens/InterestTypeScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";

interface SettingsStackProps {}

const Stack = createStackNavigator<SettingsParamList>();

export const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
  return (
    <Stack.Navigator  headerMode="none" initialRouteName="Profile">
      <Stack.Screen  name="Profile" component={ProfileScreen} />
      <Stack.Screen  name="Media" component={MediaScreen} />
      <Stack.Screen  name="Interest" component={InterestScreen} />
      <Stack.Screen  name="InterestTypes" component={InterestTypesScreen} />
      <Stack.Screen  name="EditProfile" component={EditProfileScreen} />

    </Stack.Navigator>
  );
};
