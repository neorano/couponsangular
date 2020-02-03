import { Company } from './Company';

export class User{
    public constructor(
    public userType:string,
    public id?:number,
	public username?:string,
	public company?:Company
    ){}

}