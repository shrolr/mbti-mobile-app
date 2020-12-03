import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "../models";
import ApiCalls from "../network/ApiCalls";
import NetworkDataHelper from "../network/NetworkDataHelper";
import { AuthParamList } from "../Routes/AuthStackNavigator/AuthParamList";
import { AXIOS_OK } from "../utilities/constants";
import { setItem } from "../utilities/functions";
import { Action, ActionType } from "./reducer";

class ActionHelper {

    setLogin = async (fbId: string, dispatch: React.Dispatch<Action>, navigation?: StackNavigationProp<AuthParamList, "Login">) => {
        ApiCalls.login(fbId).then((response) => {
            if (response) {
                ApiCalls.setToken(response?.data.accessToken);

                if (response.data.completed) {
                    // It will navigate to Featured Screen aka HomeScreen
                    setItem("auth", fbId)
                    dispatch({ type: ActionType.SIGN_IN, payload: { completed: true, token: response?.data.accessToken } })
                }
                else if (response.data.accessToken) {
                    setItem("tempAuth", fbId)
                    // navigate to register screen
                    if (navigation) {
                        navigation.navigate("Register")
                        dispatch({ type: ActionType.SIGN_IN, payload: { completed: false, token: response?.data.accessToken } })
                    }
                }
            }
            else {
                // TO DO WARNİNG
            }
        })
    }


    FetchMyProfile = async (dispatch: React.Dispatch<Action>) => {
        ApiCalls.myProfile().then((response) => {
            if (response) {
                if (response.status === AXIOS_OK) {
                    if (response.data) {

                        let UserData: User = response.data;
                        dispatch({ type: ActionType.SET_USER_DATA, payload: { UserData } })
                    }
                }
            }
            else {
                // TO DO WARNİNG
            }
        })
    }
    FetchWhoLikesMe = async (dispatch: React.Dispatch<Action>) => {
        NetworkDataHelper.getWhoLikeMe((Users => {
            dispatch({ type: ActionType.SET_WHO_LIKES_ME, payload: { whoLikesMe: Users } })
        }))
    }



    FetchMatches = async (dispatch: React.Dispatch<Action>) => {
        ApiCalls.getMyMates().then((response) => {
            if (response) {
                if (response.status === AXIOS_OK) {
                    if (response.data) {
                        let Matches: [User] = response.data;


                        dispatch({ type: ActionType.SET_MATCHES, payload: { Matches } })
                    }
                }
            }
            else {
                // TO DO WARNİNG
            }
        })
    }

    completeRegister = async (handle: string, myType: string, birthDate: string, gender: number, lookingForGender: number, location: any, lookingForType: string[], lookingForRange: number, completed: number, ageGap: { maxAge: number, minAge: number }, dispatch: React.Dispatch<Action>, navigation: StackNavigationProp<AuthParamList, "Register">) => {

        ApiCalls.register(handle, myType, birthDate, gender, lookingForGender, location, lookingForType, lookingForRange, ageGap, completed).then((response) => {
            if (response) {
                if (response?.status === AXIOS_OK) {
                    navigation.navigate("RegisterPhotoScreen",);
                }
            }
        })
    }


}

export default new ActionHelper();