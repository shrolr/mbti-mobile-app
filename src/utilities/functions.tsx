import AsyncStorage from '@react-native-community/async-storage';
import { User } from '../models';
import { ImageError, ServerLink } from './constants';


async function GetItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return await JSON.parse(value);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

async function setItem(key: string, data: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}


async function RemoveItem(key: string, data: any) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}


function makeChatPath(UserA: User, UserB: User) {
  if (UserA.id < UserB.id) {
    return  "Messages/"+ UserA.id + "****" + UserB.id
  }
  else {
    return  "Messages/"+  UserB.id + "****" + UserA.id
  }
}

function getUserPhoto(User: User) {
  if (User.photos.length > 0) {
    if (User.photos[0].path) {
      return ServerLink + User.photos[0].path
    }
  }
  return ImageError;
}

function getAge(dateString: Date) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export { GetItem, setItem, getUserPhoto, RemoveItem, getAge ,makeChatPath}