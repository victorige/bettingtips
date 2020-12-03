import RealmBase from "./RealmBase";
import {KEY_SEARCH, KeySearch} from "../model/KeySearch";

export default class RealmKeySearch extends RealmBase<KeySearch> {

    constructor() {
        super(KEY_SEARCH)
    }

}