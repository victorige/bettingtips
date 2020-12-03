import RealmBase from "./RealmBase";
import {PLAYLIST, Playlist} from "../model/Playlist";

export default class RealmPlaylist extends RealmBase<Playlist> {

    constructor() {
        super(PLAYLIST)
    }

}