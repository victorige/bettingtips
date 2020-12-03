import RealmBase from "./RealmBase";
import {HISTORY_PLAY, HistoryPlay} from "../model/HistoryPlay";

export default class RealmHistoryPlay extends RealmBase<HistoryPlay> {

    constructor() {
        super(HISTORY_PLAY)
    }

}