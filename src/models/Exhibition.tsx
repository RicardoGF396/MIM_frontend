export interface Exhibition {
    id?:number,
    name:string,
    participants:string,
    description:string,
    start_date:string,
    end_date:string,
    virtual_route?:string,
    images?:any,
    room:string,
    fulldate?:Array<string>
}