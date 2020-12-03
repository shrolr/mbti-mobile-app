import { City } from "./City";
import { Info } from "./info";
import { Photo } from "./Photo";

interface Iuser {
    path: string;
    id: string;
    photos: [Photo]
    handle: string;
    active: boolean;
    ageGap: {
        minAge: number, maxAge: number
    };
    birthDate: Date;
    city: City;
    completed: boolean;
    gender: number;
    lookingForGender: number;
    lookingForRange: number;
    lookingForType: string[];
    info: Info,
    myType:string;
    chatted?:boolean;
}

export class User implements Iuser {
    path: string;
    id: string;
    myType:string;
    photos: [Photo];
    handle: string;
    active: boolean;
    chatted?:boolean;

    ageGap: {
        minAge: number, maxAge: number
    };
    birthDate: Date;
    city: City;
    bio?: string;
    completed: boolean;
    gender: number;
    lookingForGender: number;
    lookingForRange: number;
    info: Info;
    lookingForType: string[];
    constructor(myType:string,info: Info, bio: string, _path: string, id: string, _photos: [Photo], _handle: string, _active: boolean, _ageGap: {
        minAge: number;
        maxAge: number;
    }, _birthDate: Date, _city: City, _completed: boolean, _gender: number
        , _lookingForGender: number, _lookingForRange: number, _lookingForType: string[]
    ) {
        this.id = id;
        this.myType = myType;
        this.path = _path;
        this.photos = _photos;
        this.handle = _handle;
        this.active = _active;
        this.birthDate = _birthDate;
        this.ageGap = _ageGap;
        this.city = _city;
        this.completed = _completed;
        this.bio = bio;
        this.gender = _gender;
        this.lookingForGender = _lookingForGender;
        this.lookingForRange = _lookingForRange;
        this.lookingForType = _lookingForType;
        this.info = info;
    }



}

