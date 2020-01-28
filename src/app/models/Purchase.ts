import { Customer } from './Customer';
import { Coupon } from './Coupon';
import { Time } from '@angular/common';


export class Purchase{

    public constructor(
        public coupon?:Coupon,
        public amount?:number        
    ){}
   
}