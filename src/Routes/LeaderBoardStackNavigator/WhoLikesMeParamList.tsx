import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type WhoLikesMeParamList = {
  WhoLikesMe: undefined;
};

export type WhoLikesMetackNavProps<T extends keyof WhoLikesMeParamList> = {
  navigation: StackNavigationProp<WhoLikesMeParamList, T>;
  route: RouteProp<WhoLikesMeParamList, T>;
};
