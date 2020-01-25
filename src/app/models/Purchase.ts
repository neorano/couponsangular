import { Customer } from './Customer';
import { Coupon } from './Coupon';
import { Time } from '@angular/common';


export class Purchase{

    public constructor(
        public id?:number,
        public coupon?:Coupon,
        public customer?:Customer,
        public amount?:number,
        public address?:string,
        public timestamp?:Time 
        
    ){}
   
}