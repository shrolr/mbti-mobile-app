import { StackNavigationProp } from "@react-navigation/stack";
import { Photo, User } from "../models";
import ApiCalls from "../network/ApiCalls";
import { AuthParamList } from "../Routes/AuthStackNavigator/AuthParamList";
import { AXIOS_OK } from "../utilities/constants";

class NetworkDataHelper {
    constructor() { }

    getMyImages = async (callback: (images: [Photo]) => void) => {
        ApiCalls.myProfile().then((response) => {
            if (response) {
                if (response?.status === AXIOS_OK) {
                    if (response.data.photos) {
                        callback(response.data.photos)
                    }
                }
            }
            // TO DO CATCH
        })
    }
    getWhoLikeMe = async (callback: (Users: [User]) => void) => {
        ApiCalls.getWhoLikeMe().then((response) => {
            if (response) {
                if (response?.status === AXIOS_OK) {
                    if (response.data) {
                        callback(response.data)
                    }
                }
            }
            // TO DO CATCH
        })
    }



}

export default new NetworkDataHelper();