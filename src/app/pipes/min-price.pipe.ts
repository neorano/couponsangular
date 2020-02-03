import { Pipe, PipeTransform } from '@angular/core';
import { Coupon } from '../models/Coupon';

@Pipe({
  name: 'minPricePipe'
})
export class MinPricePipe implements PipeTransform {

  transform(coupons: Coupon[], minprice:number): any {
      if (coupons==null){
          return;
      }
    return coupons.filter(coupon => coupon.price>minprice);
  }

}
