
interface ILocation {
    _id:string;
    coordinates:string[];
    type:string;
}

export class Location implements ILocation {
    _id: string;
    coordinates: string[];
    type: string;
    constructor(id:string,_coordinates:string[],_type:string) {
        this._id =id;
        this.coordinates =_coordinates;
        this.type = _type;
      }
  
   
}

