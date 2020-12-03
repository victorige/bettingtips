import RealmBase from "./RealmBase";
import {PRODUCT, ProductSchema} from "../model/Product";

export default class RealmProduct extends RealmBase<ProductSchema> {

    constructor() {
        super(PRODUCT)
    }

}