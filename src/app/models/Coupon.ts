import { Company } from './Company';

export class Coupon{

    

    public constructor(
        public title?:string,
        public amount?:number,
        public price?:number,
        public company?:Company,  
        public description?:string,
        public category?:string,
        public startDate?:Date,
        public endDate?:Date
    ){}
   
}