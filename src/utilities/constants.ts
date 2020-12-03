import { Dimensions } from "react-native";

const ScreenWidth =  Dimensions.get("window").width
const AXIOS_ERROR = 0;
const AXIOS_OK = 201;
const AXIOS_NO_DATA = 2;
const ServerLink = "https://mbti-app.herokuapp.com/";
const ImageError = 'https://mbti-app.herokuapp.com/res/error_img.jpg';
export {AXIOS_ERROR,AXIOS_OK,AXIOS_NO_DATA,ScreenWidth,ServerLink,ImageError}

