export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:string,
        public userType?:string,
        public companyName?:string
    ){}

}