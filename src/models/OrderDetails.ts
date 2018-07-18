export class OrderDetails {
    constructor(
        public product_id:number,
        public product_name: string,
        public product_image: string,
        public qty:number,
        public uom_id:number,
        public uom: string,
        public price:number,
        public order_id?: number,
      ) {
    }
}
