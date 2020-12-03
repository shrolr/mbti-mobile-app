interface IPhoto {
    path:string;
    id: string;
}

export class Photo implements IPhoto {
    path: string;
    id: string;
    constructor(_path:string,id:string) {
        this.id = id;
        this.path = _path;
      }
}

