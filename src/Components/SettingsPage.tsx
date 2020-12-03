import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, LogBox } from 'react-native'
import { Card, Icon, Content } from 'native-base'
import { Slider } from 'react-native-elements'
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { useStateContext } from '../context/state'
import { ActionType } from '../context/reducer'
import * as _ from 'lodash';
import ApiCalls from '../network/ApiCalls'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsParamList } from '../Routes/SettingsStackNavigator/SettingsParamList'
import Gender from '../res/enums'
import { material } from 'react-native-typography'
import { User } from '../models'
import AppTheme from '../res/colors'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


interface ISettings {
    navigation: StackNavigationProp<SettingsParamList, "Profile">
}
export const SettingsPage: React.FC<ISettings> = ({ navigation }) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const { context, dispatch } = useStateContext();
    const multiSliderValue = [context.UserData!.ageGap.minAge, context.UserData!.ageGap.maxAge]
    const [state, setstate] = useState({ distance: context.UserData!.lookingForRange, multiSliderValue, looking_for: 0 })
    function updateUserInfo(state: any, UserData: User) {
        let ageGap = { minAge: state.multiSliderValue![0], maxAge: state.multiSliderValue![1] }
        UserData.lookingForRange = state.distance;
        UserData.ageGap = ageGap;
        UserData.lookingForGender = state.looking_for;

        dispatch!({ type: ActionType.SET_USER_DATA, payload: { UserData } })
        // api call is not working

        ApiCalls.updateProfile(UserData.ageGap, UserData.gender, UserData.lookingForGender, UserData.lookingForRange)
    }
    const updateUser = useCallback(
        _.debounce(updateUserInfo, 2000),
        [],
    )

    const onDistanceChange = (distance: number) => {
        setstate((prevState: any) => {
            return {
                ...prevState,
                distance
            };
        });
        let editedState = Object.assign({}, state);
        editedState.distance = distance

        let UserData = Object.assign({}, context.UserData);

        updateUser(editedState, UserData)
    }
    const setGender = (gender: number) => {
        setstate((prevState: any) => {
            return {
                ...prevState,
                looking_for: gender
            };
        });
        let editedState = Object.assign({}, state);
        editedState.looking_for = gender

        let UserData = Object.assign({}, context.UserData);

        updateUser(editedState, UserData)
    }
    const logOut = async () => {
        await AsyncStorage.removeItem("auth");
        dispatch!({ type: ActionType.SIGN_OUT })
        GoogleSignin.signOut()
        // // firebaseden de logout yapilacak
    }
    const multiSliderValuesChange = (values: any) => {
        setstate((prevState: any) => {
            return {
                ...prevState,
                multiSliderValue: values,
            };
        });
        let editedState = Object.assign({}, state);
        editedState.multiSliderValue = values
        let UserData = Object.assign({}, context.UserData);
        updateUser(editedState, UserData)
    };





    return (
        <View style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                <Card style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={[material.title, { color: AppTheme.Primary, }]}>
                        Bilgilerimi düzenle
                </Text>
                    <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
                        <Text style={{ color: "gray", fontSize: 16, flex: 1 }} >Kişisel bilgileriniz</Text>
                        <Icon style={{ color: "gray", fontSize: 18 }} name="chevron-right" type="Entypo" />
                    </View>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Interest", { setGender })}>
                <Card style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={[material.title, { color: AppTheme.Primary, }]}>
                        Bana Göster
                </Text>
                    <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
                        <Text style={{ color: "gray", fontSize: 16, flex: 1 }} >{Gender[context.UserData!.lookingForGender]}</Text>
                        <Icon style={{ color: "gray", fontSize: 18 }} name="chevron-right" type="Entypo" />
                    </View>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("InterestTypes")}>
                <Card style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={[material.title, { color: AppTheme.Primary, }]}>
                        İlgilendiğim Tipler
                </Text>
                    <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
                        <Text style={{ color: "gray", fontSize: 16, flex: 1 }} >{context.UserData!.lookingForType.map((value) => value + " ")}</Text>
                        <Icon style={{ color: "gray", fontSize: 18 }} name="chevron-right" type="Entypo" />
                    </View>
                </Card>
            </TouchableOpacity>

            <Card style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
                    <Text style={[material.title, { color: AppTheme.Primary, flex: 1 }]}>Azami Mesafe</Text>
                    <Text style={material.subheading}>{state.distance}km</Text>
                </View>

                <Slider thumbStyle={{ height: 21, width: 21 }} minimumValue={1} step={1} maximumValue={160} onValueChange={value => onDistanceChange(value)} value={state.distance} maximumTrackTintColor="#dfdfdf" thumbTintColor={AppTheme.Primary} minimumTrackTintColor={AppTheme.Primary} style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }} />
            </Card>


            <Card style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
                    <Text style={[material.title, { color: AppTheme.Primary, flex: 1 }]}>Yaş Aralığı</Text>
                    <Text style={material.subheading}> {state.multiSliderValue![0]} - {state.multiSliderValue![1]}</Text>
                </View>
                <View style={{ marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                    <MultiSlider
                        values={[
                            state.multiSliderValue![0],
                            state.multiSliderValue![1],
                        ]}
                        trackStyle={{
                            backgroundColor: "#efefef",
                            height: 3.5,
                        }}
                        selectedStyle={{
                            backgroundColor: AppTheme.Primary,
                        }}
                        markerStyle={{
                            backgroundColor: AppTheme.Primary,
                            borderWidth: 0,
                            height: 21,
                            width: 21,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowRadius: 0,
                            shadowOpacity: 0,
                        }}
                        sliderLength={280}
                        onValuesChange={multiSliderValuesChange}
                        min={18}
                        max={65}
                        step={1}
                        allowOverlap
                        snapped
                    />
                </View>

            </Card>


            <Card style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, }}>
                <Text style={[material.title, { color: AppTheme.Primary, }]}>Yasal</Text>
                <Text style={[material.button, { color: "#333", marginTop: 10 }]}>Gizlilik Politikası</Text>
                <Text style={[material.button, { color: "#333", marginTop: 10 }]}>Hizmet Koşulları</Text>

            </Card>

            <TouchableOpacity onPress={() => logOut()}>
                <Card style={{ paddingTop: 20, paddingBottom: 20, }}>
                    <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "400" }}>Çıkış</Text>
                </Card>
            </TouchableOpacity>

            <Card style={{ marginBottom: 30, paddingTop: 20, paddingBottom: 20, }}>
                <Text style={{ textAlign: "center", color: AppTheme.Primary, fontSize: 15, fontWeight: "500" }}>Hesabı Sil</Text>
            </Card>


        </View>
    )
}

