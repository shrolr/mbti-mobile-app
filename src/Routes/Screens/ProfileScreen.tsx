import { Container, Content } from 'native-base'
import React from 'react'
import { View, Text, TouchableWithoutFeedback,Image } from 'react-native'
import { SettingsPage } from '../../Components/SettingsPage';
import { useStateContext } from '../../context/state';
import { getAge, getUserPhoto } from '../../utilities/functions';
import { SettingsStackNavProps } from '../SettingsStackNavigator/SettingsParamList';

export default function ProfileScreen({navigation}: SettingsStackNavProps<"Profile">) {

    const { context, dispatch } = useStateContext();
    
    return (
        <Container style={{ backgroundColor: "#fff", flex: 1 }}>
        <Content>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 40, paddingBottom: 40, alignItems: "center" }}>
          <TouchableWithoutFeedback  onPress={() => navigation.navigate("Media")}  >
          <Image source={{ uri: getUserPhoto(context.UserData!) }} style={{ height: 120, width: 120, borderRadius: 60, overflow: "hidden" }} />
          </TouchableWithoutFeedback>
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "500" }}>{context.UserData?.handle}, {getAge(context.UserData!.birthDate)}</Text>
        <SettingsPage navigation={navigation} ></SettingsPage>
  
        </View>
        </Content>
      </Container>
    )
}
