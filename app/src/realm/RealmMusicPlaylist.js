import RealmBase from "./RealmBase";
import {MUSIC_PLAYLIST, MusicPlaylist} from "../model/MusicPlaylist";
import {realm} from "./Realm";

export default class RealmMusicPlaylist extends RealmBase<MusicPlaylist> {

    constructor() {
        super(MUSIC_PLAYLIST)
    }

    getTotalTimeMusicByPlaylist(playlist_id) {
        const musicPlaylists = realm.objects(MUSIC_PLAYLIST).filtered(`playlist.id = "${playlist_id}"`);
        return musicPlaylists.reduce((time, musicPlaylist) => time + musicPlaylist.music.time_total, 0)
    }

    getMusicIdByPlaylist(playlist_id) {
        return realm.objects(MUSIC_PLAYLIST).filtered(`id = "${playlist_id}"`);
    }

    getMusicPlaylistByMusicId(music_id) {
        return realm.objects(MUSIC_PLAYLIST).filtered(`music.id = "${music_id}"`);
    }

    getALlSortedByPriority() {
        return realm.objects(MUSIC_PLAYLIST).sorted('priority');
    }

}