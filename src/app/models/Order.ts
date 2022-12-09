import { BookDTO } from "./BookDTO";

export class Order{
    orderNo:number
    userId:number;
    deliveryAddress:string;
    deliveryStatus:string;
    books:BookDTO[];
    constructor(){}
}
