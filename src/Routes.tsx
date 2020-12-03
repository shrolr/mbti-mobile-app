import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppTabs } from "./Routes/AppTabNavigator/AppTabs";
import { AuthStack } from "./Routes/AuthStackNavigator/AuthStack";
import { useStateContext } from "./context/state";
import { Text } from "react-native";
import { GetItem } from "./utilities/functions";
import { Spinner } from "native-base";
import ActionHelper from "./context/ActionHelper";

interface RoutesProps { }

export const Routes: React.FC<RoutesProps> = ({ }) => {
  const { context, dispatch } = useStateContext();
  const [loading, setLoading] = useState(true)
  // TO DO CHECK IF USERS IS LOGGED IN 
  useEffect(() => {
    checkAuth()
  }, [])
  const checkAuth = async () => {
    let auth = await GetItem("auth")
    if (auth) {
      ActionHelper.setLogin(auth, dispatch!).then(() => {
        setLoading(false)
      })
    }
    else {
      setLoading(false)

    }
  }
  const { isAuthenticated, isCompletedRegister } = context;
  if (loading) {
    return <Spinner />
  }
  return (
    <NavigationContainer>
      { isAuthenticated && isCompletedRegister ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
