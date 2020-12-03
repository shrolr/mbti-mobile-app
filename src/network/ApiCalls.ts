import axios from 'axios';
import { Info } from '../models/info';
import { ServerLink } from '../utilities/constants';
const httpClient = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});
httpClient.defaults.timeout = 15000;


interface IApiCalls { }

interface INetworkResponse {
  status?: number;
  data?: {};
}

class NetworkResponse implements INetworkResponse {
  status: number;
  data: any;
  constructor() {
    this.status = 4;;
    this.data = null;
  }
}

class ApiCalls implements IApiCalls {
  private server_link: string;
  private AXIOS_ERROR: number;
  private AXIOS_OK: number;
  private AXIOS_NO_DATA: number;
  constructor() {
    this.server_link = ServerLink;
    this.AXIOS_ERROR = 0;
    this.AXIOS_OK = 1;
    this.AXIOS_NO_DATA = 2;
  }

  setToken = async (token: string) => {
    httpClient.interceptors.request.use(function (config) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });

  }

  disslike = async (userID: string) => {
    let _NetworkResponse = new NetworkResponse()
    return await httpClient
      .post(this.server_link + 'disLike/', { userID })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }
  like = async (userID: string) => {
    let _NetworkResponse = new NetworkResponse()
    return await httpClient
      .post(this.server_link + 'like/', { userID })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }



  getWhoLikeMe = async () => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + "whoLike")
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse;

  }

  deleteImage = async (imageID: string) => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + 'deleteImage/', { imageID })
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse;
  }

  getMyMates = async () => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + "mymates")
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse;

  }


  uploadImage = async (data: string | undefined) => {
    let _NetworkResponse = new NetworkResponse()

    return await httpClient.post(this.server_link + 'uploadImageBase64/', { base64Data: data })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }

  unMatch = async (userID: number) => {
    throw new Error("not implemented");

  }

  myProfile = async () => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + "me")
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse;


  }

  register = async (handle:string,myType: string, birthDate: string, gender: number, lookingForGender: number, location: any, lookingForType: string[], lookingForRange: number, ageGap:  {
    maxAge: number;
    minAge: number;
}, completed: number) => {

    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "updateUser", {handle, myType, birthDate, gender, lookingForGender, location, lookingForType, lookingForRange, ageGap, completed })
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      return false;
    }




  }
  updateLocation = () => {
    throw new Error("not implemented");

  }
  updateProfile = async (ageGap: {maxAge:number,minAge:number}, gender: number, lookingForGender: number, lookingForRange: number) => {
    let _NetworkResponse = new NetworkResponse()
    return await httpClient.post(this.server_link + 'updateUser/', { ageGap, gender, lookingForGender, lookingForRange })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }
  completeRegistration = async () => {
    let _NetworkResponse = new NetworkResponse()
    return await httpClient.post(this.server_link + 'updateUser/', { completed:1 })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }
  updateInterestedTypes = async (lookingForType: string[]) => {
    let _NetworkResponse = new NetworkResponse()
    return await httpClient.post(this.server_link + 'updateUser/', { lookingForType })
      .then(response => {
        if (response.status === 200) {
          _NetworkResponse.status = this.AXIOS_OK;
          _NetworkResponse.data = response.data;
          return _NetworkResponse;
        } else if (response.status === 204) {
          _NetworkResponse.status = this.AXIOS_NO_DATA;
          return _NetworkResponse;
        }
      })
      .catch(error => {
        _NetworkResponse.status = this.AXIOS_ERROR;
        _NetworkResponse.data = [error];
        return _NetworkResponse;
      });
  }
  updateUserInfo = async (info: Info) => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + 'updateUser/', { info })
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse
  }
  updateUserBio = async (bio: string) => {
    let _NetworkResponse = new NetworkResponse()
    let response = await httpClient.post(this.server_link + 'updateUser/', { bio })
    _NetworkResponse.data = response.data;
    _NetworkResponse.status = response.status;
    return _NetworkResponse
  }

  getFeaturedUsers = async () => {
    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "getUsers")
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      _NetworkResponse.status = this.AXIOS_ERROR;

      return _NetworkResponse;
    }
  }
  login = async (fbID: string) => {
    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "login", { fbID })
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      return false;
    }

  }

  NotifyMessage = async (reciver: string, message: string) => {
    let _NetworkResponse = new NetworkResponse()
    try {
      let response = await httpClient.post(this.server_link + "messageNotification", { reciver, message })
      _NetworkResponse.data = response.data;
      _NetworkResponse.status = response.status;
      return _NetworkResponse;
    } catch (error) {
      console.log(error)
      return false;
    }

  }



}

export default new ApiCalls();