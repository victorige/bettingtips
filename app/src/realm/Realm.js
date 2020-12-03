import Realm from 'realm'
import {ProductSchema} from "../model/Product"
import {KeySearch} from "../model/KeySearch";
import {Device} from "../model/Device";
import {Music} from "../model/Music";
import {MusicDetail} from "../model/MusicDetail";
import {MusicPlaylist} from "../model/MusicPlaylist";
import {Playlist} from "../model/Playlist";
import {HistoryPlay} from "../model/HistoryPlay";

export const realm = new Realm({
    schema: [
        KeySearch.schema,
        Device.schema,
        Music.schema,
        MusicDetail.schema,
        MusicPlaylist.schema,
        Playlist.schema,
        HistoryPlay.schema
    ],
    schemaVersion: 0
});

export const convertRealmArray = (results) => {
    return results.map(x => Object.assign({}, x))
}