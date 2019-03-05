export class Coupon {
    public id: number;
    public name: string;
    public amount: number;
    public description: string;
    public imageLocation: string;
    public startDate: Date;
    public endDate: Date;
    // todo(?) delete or access from another place
    // public company: Company;
    // public customers: Array<Customer>;


    constructor(id: number, name: string, amount: number, description: string, imageLocation: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.imageLocation = imageLocation;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
