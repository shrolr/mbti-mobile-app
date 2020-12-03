import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Platform, UIManager, LayoutAnimation } from 'react-native'
import Swiper from 'react-native-swiper'
import { User } from '../models/User';
import { HomeParamList, HomeStackNavProps } from '../Routes/HomeStackNavigator/HomeParamList';
import { getAge } from '../utilities/functions';
import Stack from './Stack';

interface IPersonStack {
    User: User;
    navigation?: StackNavigationProp<HomeParamList, "Home">
 }

const PersonStack: React.FC<IPersonStack> = ({ User,navigation }) => {
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    let swiperRef: React.RefObject<Swiper> = React.createRef();
    const [detail, setstate] = useState(false)
    return (
        <View style={{ flex: 1 }}>
            <Swiper scrollEnabled={false}
                paginationStyle={{ bottom: undefined, left: undefined, top: 0, right: 0 }}
                activeDot={
                    <View style={{
                        flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5, borderRadius: 5, marginBottom: 50, height: 3, backgroundColor: "white"
                    }} />
                }
                dot={
                    <View style={{
                        flex: 1, marginLeft: 5, marginRight: 5, marginTop: 5, borderRadius: 5, marginBottom: 50, height: 3, backgroundColor: "gray"
                    }} />
                }
                ref={swiperRef} showsButtons={false} >
                {User.photos && User.photos.map((image) => {
                    return (
                        <Stack Image={image} User={User} key={image.path} swiperRef={swiperRef} />
                    )
                })}
            </Swiper>
            <View style={{ position: "absolute", bottom: 0, backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%' }}>
                 <TouchableWithoutFeedback onPress={() => {navigation && navigation.navigate("User",{User})  }} style={{ position: "absolute", bottom: 0, backgroundColor: 'rgba(52, 52, 52, 0.8)', width: '100%' }}>

                    <View style={{ marginLeft: 20 }}>
                        <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "flex-end" }}>
                            <Text style={{ color: "white", fontSize: 30, }}>{User.handle}</Text>
                            <Text style={{ color: "white", textAlignVertical: "center", fontWeight: "bold", fontSize: 30, marginLeft: 10 }}>{getAge(User.birthDate)}</Text>
                        </View>
                        <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>{User.myType}</Text>

                    </View>

                </TouchableWithoutFeedback>
            </View>
        </View>

    )
}

export default PersonStack
