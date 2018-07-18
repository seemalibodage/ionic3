export class User {
  constructor(
    public id: number,
    public name: string,
    public phone_no: string,
    public access_token?: string
  ) {}
}
