import RealmBase from "./RealmBase";
import {Device, DEVICE} from "../model/Device";

export default class RealmDevice extends RealmBase<Device> {

    constructor() {
        super(DEVICE)
    }

}