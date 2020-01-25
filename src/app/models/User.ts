import { Company } from './Company';

export class User{
    public constructor(
    public id:number,
	public username:string,
	public userType:string,
	public company:Company
    ){}

}