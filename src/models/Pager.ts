export class Pager<T>{
    constructor(
        public total: number,
        public per_page: number,
        public current_page: number,
        public last_page: number,
        public next_page_url: string,
        public prev_page_url: string,
        public from: number,
        public to: number,
        public data: T[],
    ){

    }
}