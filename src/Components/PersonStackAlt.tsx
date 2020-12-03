import { Icon } from 'native-base';
import React from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'
import { User } from '../models/User';
import Stack from './Stack';

interface IPersonStackAlt {
    User: User;
    onAction: (result: boolean) => void;
}

export const PersonStackAlt: React.FC<IPersonStackAlt> = ({ User,onAction }) => {
    let swiperRef: React.RefObject<Swiper> = React.createRef();
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
            }  ref={swiperRef} showsButtons={false} >
            {User.photos && User.photos.map((image) => {
                return (
                    <Stack Image={image} User={User} key={image.path} swiperRef={swiperRef} />
                )
            })}
        </Swiper>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <View style={{ marginRight: 40, height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                <Icon onPress={() => onAction(true)} style={{ fontSize: 40, alignSelf: "center", color: "#2ecc71" }} type="Ionicons" name="heart" />
            </View>
            <View style={{ marginLeft: 40, height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                <Icon onPress={() => onAction(false)} style={{ alignSelf: "center", fontSize: 40, color: "#ee5253" }} type="Ionicons" name="ios-heart-dislike" />
            </View>
        </View>
    </View>
    )
}
 