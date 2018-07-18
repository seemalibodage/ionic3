import {Address} from './Address';
import {OrderDetails} from './OrderDetails';
import {User} from './User';

export class Order {
    public id;
    constructor(
        public customer: User,
        public tax:number,
        public vat:number,
        public order_status:ORDER_STATUS_TYPE,
        public order_details?: OrderDetails[],
        public address_list?: Address[],
        public order_ref_id?: string,
        public deliver_at?:string,
        public remarks?:string,
        public sub_total_price?:number,
        public total_price?:number,
        ) {
    }

    static toPostData(data:Order){
        return {
            "customer_id": data.customer.id,
            "tax": data.tax,
            "vat": data.vat,
            "total_price": data.total_price,
            "address":[{
                "lat":12.9716,
                "long":77.5946
            }],
            "order_detail": data.order_details.map((ele)=>{
                return {
                    "product_id": ele.product_id,
                    "qty": ele.qty,
                    "uom_id": ele.uom_id,
                    "price": ele.price
                };
            })
        }
    }
}
export type ORDER_STATUS_TYPE = 'PENDING' | 'DELIVERED' | 'PROCESSING' | 'CANCELED';
