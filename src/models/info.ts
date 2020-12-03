
interface IInfo {
    look?:{
        bodyType?:string,
        height?:string,
    }
    background?:{
        languages?:string[],
        orientation?:string[],
        relationType ?:string[],
        ethnicity?:string,
        religion?:string,
        politics?:string,
        education?:string,
        employment?:string,
        astroSign?:string,
    }
    lifeStyle?:{
        alcohol?:string,
        smoking?:string,
        diet?:string,
    },
    family?:{
        pets?:string,
        hasKids?:boolean,
        wantKids?:string
    }
  
}

export class Info implements IInfo {
    look?: { bodyType?: string | undefined; height?: string | undefined; } | undefined;
    background?: { languages?: string[] | undefined; orientation?: string[] | undefined; relationType?: string[] | undefined; ethnicity?: string | undefined; religion?: string | undefined; politics?: string | undefined; education?: string | undefined; employment?: string | undefined; astroSign?: string | undefined; } | undefined;
    lifeStyle?: { alcohol?: string | undefined; smoking?: string | undefined; diet?: string | undefined; } | undefined;
    family?: { pets?: string | undefined; hasKids?: boolean | undefined; wantKids?: string | undefined; };
    
   
}

