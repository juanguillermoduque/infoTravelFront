export interface City {
    id:number;
    name:string;
    apiName:string;
    pivot: {
        city_id:number;
        country_id:number;
        id:number;
    }
}