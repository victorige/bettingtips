import RealmBase from "./RealmBase";
import {MUSIC, Music} from "../model/Music";

export default class RealmMusic extends RealmBase<Music> {

    constructor() {
        super(MUSIC)
    }

}