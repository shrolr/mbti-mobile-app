import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { User } from "../../models";

export type MatchesParamList = {
  Matches: undefined;
  Chat: {User:User};
  User:{User:User};
};

export type MatchesStackNavProps<T extends keyof MatchesParamList> = {
  navigation: StackNavigationProp<MatchesParamList, T>;
  route: RouteProp<MatchesParamList, T>;
};
