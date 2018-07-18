import { Address } from './Address';

export class Store {
	constructor(
		public id: number,
		public name: string,
		public imagePath: string,
		public description?: string,
		public start_time?: string,
		public end_time?: string,
		public delivery_time?: number,
		public tax?: number,
		public vat?: number,
		public coords?: {
			"latitude": number,
			"longitude": number
		},
		public address_list?: Address[],
	) {
	}
}