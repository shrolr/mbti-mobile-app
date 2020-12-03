import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

interface IListEmptyComponent {
    icon:string;
    text:string;
    type:"AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined;
}

export const ListEmptyComponent: React.FC<IListEmptyComponent> = ({ icon,text,type }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
    <View style={{ alignItems: "center" }}>
        <Icon style={{ fontSize: 100, color: "#7f8c8d" }} name={icon} type={type} />
        <Text style={{ fontSize: 16, marginTop: 20, color: "gray" }}>{text}</Text>
    </View>
</View>
  );
};