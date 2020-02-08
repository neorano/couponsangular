import { Company } from './Company';
export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:string,
        public userType?:string,
        public company?:Company
    ){}

}