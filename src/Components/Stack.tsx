import React from 'react'
import { Text, View, ImageBackground, TouchableWithoutFeedback, Platform } from 'react-native'
import Swiper from 'react-native-swiper'
import { Photo, User } from '../models'
import { ServerLink } from '../utilities/constants'
import { getAge } from '../utilities/functions'


interface IPersonStack {
    Image: Photo,
    User: User,
    swiperRef: React.RefObject<Swiper>
}
const Stack: React.FC<IPersonStack> = ({ Image, User, swiperRef }) => {

    const back = () => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(-1);
        }
    }
    const next = () => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(1);
        }
    }
    return (
        <ImageBackground style={{ backgroundColor: "white", marginBottom: 30, borderRadius: Platform.OS === "ios" ? 10 : 0, overflow: Platform.OS === "ios" ? "hidden" : "visible", flex: 1 }} source={{ uri: ServerLink + Image.path }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableWithoutFeedback onPress={() => back()} style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => next()} style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}></View>
                </TouchableWithoutFeedback>
            </View>

        </ImageBackground>
    )
}

export default Stack
