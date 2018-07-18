export class Address {
  constructor(
    public id: number,
    public address1: string,
    public address2: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: string,
    public lat: number,
    public long: number,
    public full_address: string
    ) {

  }
}
