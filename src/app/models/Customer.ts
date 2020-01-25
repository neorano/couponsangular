import { User } from './User';
export class Customer{

    

    public constructor(
        public user:User,
        public id?:number,
        public name?:string,
        public phone?:string,
        public amountOfKids?:number,
        public address?:string,
        public isMarried?:boolean 
        
    ){}
   
}