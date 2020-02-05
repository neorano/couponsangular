import { Customer } from './Customer';
import { Coupon } from './Coupon';
import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';


export class Purchase{

    public constructor(
        public coupon?:Coupon,
        public amount?:number ,
        public timestamp?:  Date     
    ){}
   
}