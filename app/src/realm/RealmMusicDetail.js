import RealmBase from "./RealmBase";
import {MUSIC_DETAIL, MusicDetail} from "../model/MusicDetail";

export default class RealmMusicDetail extends RealmBase<MusicDetail> {

    constructor() {
        super(MUSIC_DETAIL)
    }

}