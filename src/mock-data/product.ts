import { Pager } from "../models/Pager";
import { Product } from "../models/Product";
import { ProductCategory } from "../models/ProductCategory";
import { Store } from "../models/Store";

export let productCategories:ProductCategory[] = JSON.parse(`[
    {
                "id": "1",
                "name": "Rice",
                "products_count": 54
            }, {
                "id": "2",
                "name": "Roti",
                "products_count": 89
            }, {
                "id": "3",
                "name": "Biriyani",
                "products_count": 80
            }, {
                "id": "4",
                "name": "Chicken",
                "products_count": 78
            },{
                "id": "5",
                "name": "Mutton",
                "products_count": 63
            },{
                "id": "6",
                "name": "Soup",
                "products_count": 12
            },{
                "id": "7",
                "name": "Dal",
                "products_count": 23
            }
]`);

export let stores: Store[] = JSON.parse(`[
    {
                "id": "1",
                "name": "Cave and Dine",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.8758,
                    "longitude":77.87235
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            }, {
                "id": "2",
                "name": "Paradise",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.4365,
                    "longitude":77.567
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            }, {
                "id": "3",
                "name": "Biriyani House",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.868,
                    "longitude":77.99021
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            }, {
                "id": "4",
                "name": "Panjabi Resturent",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.4456,
                    "longitude":77.354
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            },{
                "id": "5",
                "name": "Bengali Kitchen",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.14990,
                    "longitude":77.3516
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            },{
                "id": "6",
                "name": "Saviruchi",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.0499480,
                    "longitude":77.0636
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            },{
                "id": "7",
                "name": "Dasu Hotel",
                "imagePath":"https://placeimg.com/200/200/arch",
                "start_time": "10 AM",
                "end_time":"11 PM",
                "coords":{
                    "latitude":12.2499480,
                    "longitude":77.319636
                },
                "address_list":[{
                    "city": "Bangalore"
                }]
            }
]`);

export let products: Pager<Product> = JSON.parse(`{

    "total": 50,
    "per_page": 10,
    "current_page": 1,
    "last_page": 5,
    "next_page_url": "test",
    "prev_page_url": "test",
    "from": 1,
    "to": 10,
    "data": [
        {
            "id": "1",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "2",
            "name": "Kashmiri Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "3",
            "name": "Mixed Fried Rice",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Shefali Yuvraj Palace",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "4",
            "name": "Chicken Fried Rice",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Shefali Yuvra Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "5",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "6",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "7",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "8",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        },
        {
            "id": "9",
            "name": "Hydrabadi Biryani",
            "description": "",
            "price": "179.00",
            "uom_id": "5",
            "category": {
                "id": "7",
                "name": "Rice"
            },
            "store": {
                "id": "44",
                "name": "Kaveri Restaurant",
                "imagePath":"http://lorempixel.com/200/200/city"
            },
            "uom": {
                "id": "5",
                "name": "Per Plate"
            },
            "media_list": [
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                },
                {
                    "path": "http://lorempixel.com/600/400/food/"
                }
            ]
        }

    ]}`);