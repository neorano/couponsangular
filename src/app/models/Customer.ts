import { User } from './User';
export class Customer{

    

    public constructor(
        public user:User,
        public address?:string, 
        public name?:string,
        public phone?:string,
        public amountOfKids?:number,
        public isMarried?:boolean ,
        public id?:number
    ){}
   
}