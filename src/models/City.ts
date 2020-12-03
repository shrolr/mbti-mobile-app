import { Location } from "./Location";

interface ICity {
    _id:string;
    name:string;
    location:Location;
}

export class City implements ICity {
    _id: string;
    name: string;
    location: Location;
    constructor(id:string,_name:string,_location:Location) {
        this._id =id;
        this.name =_name;
        this.location = _location;
      }
    
  
   
}

