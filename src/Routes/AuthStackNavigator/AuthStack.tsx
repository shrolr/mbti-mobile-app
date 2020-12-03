import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "./AuthParamList";
import OnboardingScreen from "./OnboardingScreen";
import RegisterScreen from "./RegisterScreen";
import RegisterPhotoScreen from "./RegisterPhotoScreen";

interface AuthStackProps { }

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
        }}
        name="Login"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Register",
        }}
        name="Register"
        component={RegisterScreen}
      />
        <Stack.Screen
        options={{
          headerTitle: "Photo",
        }}
        name="RegisterPhotoScreen"
        component={RegisterPhotoScreen}
      />
    </Stack.Navigator>
  );
};
