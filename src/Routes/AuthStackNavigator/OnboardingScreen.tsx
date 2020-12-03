import { Button } from 'native-base'
import React from 'react'
import { View, Text, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import ActionHelper from '../../context/ActionHelper';
import { useStateContext } from '../../context/state';
import { AuthNavProps } from './AuthParamList';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import * as firebase from 'firebase';
import { ScreenWidth } from '../../utilities/constants';

export default function OnboardingScreen({ navigation }: AuthNavProps<"Login">) {

    const { dispatch } = useStateContext();

    const signIn = async () => {

        await GoogleSignin.configure({
            webClientId: '689575859836-3tjthd5vvv90g10bunstk7ko7rmc41pg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false,
        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(
                userInfo.idToken
            );
            // login with credential
            firebase.auth().signInWithCredential(credential).then((val) => {
                if (val.user?.email) {
                    ActionHelper.setLogin(val.user.uid, dispatch!, navigation);
                }
            })
        } catch (error) {
            console.log(error)
            Alert.alert("hata", JSON.stringify(error))
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    return (
        <ImageBackground style={{ justifyContent: "center", flex: 1 }} source={require("../../../assets/bg.png")} >
            <Image style={{ height: 50, width: 50, alignSelf: "center", marginBottom: 50 }} source={require("../../../assets/favicon.png")} />
            <GoogleSigninButton
                style={{ width: ScreenWidth, height: 60 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </ImageBackground>
    )
}
