import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppParamList } from "./AppParamList";

import { HomeStack } from "../HomeStackNavigator/HomeStack";
import { WhoLikesMeStack } from "../LeaderBoardStackNavigator/WhoLikesMeStack";
import { SettingsStack } from "../SettingsStackNavigator/SettingsStack";

import { Icon } from "native-base";
import { MatchesStack } from "../MatchesStackNavigator/MatchesStack";
import AppTheme from "../../res/colors";
import { useStateContext } from "../../context/state";

interface AppTabsProps { }

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({ }) => {

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Featured") {
            return <Icon type="MaterialCommunityIcons" name={"fire"} style={{ fontSize: size, color }} />;
          } else if (route.name === "WhoLikesMe") {
            return <Icon type="MaterialCommunityIcons" name={"star-outline"} style={{ fontSize: size, color }} />;
          }
          else if (route.name === "Settings") {
            return <Icon type="FontAwesome" name={"gear"} style={{ fontSize: size, color }} />;
          }
          else if (route.name === "Matches") {
            return <Icon type="Entypo" name={"chat"} style={{ fontSize: size, color }} />;
          }
        },
        header: null,
      })}
      tabBarOptions={{
        activeTintColor: AppTheme.Primary,
        inactiveTintColor: AppTheme.Secondary,
        inactiveBackgroundColor: "#fff",
        activeBackgroundColor: "#fff",
        style: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen name="Featured" component={HomeStack} />
      <Tabs.Screen name="WhoLikesMe" component={WhoLikesMeStack} />
      <Tabs.Screen name="Matches" component={MatchesStack} />
      <Tabs.Screen name="Settings" component={SettingsStack} />

    </Tabs.Navigator>
  );
};
