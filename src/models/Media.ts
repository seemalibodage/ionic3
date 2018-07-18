export class Media {
  constructor(
    public reference_type: ReferenceType = 'PRODUCT',
    public id: number = null,
    public reference_id: number = null,
    public path: string = null,
    ) {
  }
}

type ReferenceType = 'PRODUCT' | 'STORE';
// enum ReferenceType {
//     PRODUCT = "PRODUCT,
//     STORE = "STORE"
// }