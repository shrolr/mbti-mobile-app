import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type SettingsParamList = {
  Profile:undefined;
  Media:undefined;
  Interest:{setGender(gender:number): void};
  InterestTypes:undefined;
  EditProfile:undefined;

};

export type SettingsStackNavProps<T extends keyof SettingsParamList> = {
  navigation: StackNavigationProp<SettingsParamList, T>;
  route: RouteProp<SettingsParamList, T>;
};
