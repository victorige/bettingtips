import {action, observable} from 'mobx'
import I18n from "react-native-i18n";
import {removeCurrentMusic, saveLanguage, saveMusicRepeat} from "../util/Store";
import EventRegister, {ON_SLIDING_COMPLETE} from "../util/EventRegister";

export default class UserStore {

    @observable language = 'en'
    @observable music = {
        id: null,
        audioUrl: null,
        isPlay: false,
        timeTotal: 0,
        currentPosition: 0,
        volume: 0.6,
        musicDetail: []
    }

    @observable isRepeatAll = true
    @observable isEdit = false
    @observable nextOrder = []
    @observable listItemDownload = []
    @observable itemDownload = -1
    @observable progressDownload = 0
    @observable playlist = []
    @observable musicPlaylist = []
    @observable musicPlaylistDisplay = []
    @observable musicPlaylistPlay = []

    initMusic = () => {
        return {
            id: null,
            audioUrl: null,
            isPlay: false,
            timeTotal: 0,
            currentPosition: 0,
            volume: 0.6,
            music_id: null,
            musicDetail: []
        }
    }

    @action updateProgressDownload(progressDownload) {
        this.progressDownload = progressDownload
    }

    @action onEndMusicDemo() {
        this.music = this.initMusic()
    }

    @action updateItemDownload(itemDownload) {
        this.itemDownload = itemDownload
    }

    @action saveItemDownload(itemDownload, callback) {
        let listItemDownload = this.listItemDownload.slice()
        const indexAvailable = listItemDownload.findIndex(item => itemDownload.id === item.id)

        if (indexAvailable === -1) {
            this.listItemDownload = [...listItemDownload, itemDownload]
            callback(true)
        } else {
            callback(false)
        }
    }

    @action removeItemDownload(itemDownload) {
        let listItemDownload = this.listItemDownload.slice()
        this.listItemDownload = listItemDownload.filter(item => item.id !== itemDownload.id)
    }

    @action emptyItemDownload() {
        this.listItemDownload = []
    }

    @action initPlaylist(playlist, musicPlaylist, currentMusic) {
        let currentMusicActive = false

        playlist.forEach((item, index) => {
            if (currentMusic && currentMusic.playlist_id && item.is_active) {
                item.isSelect = item.id === currentMusic.playlist_id
                currentMusicActive = true
                if (item.id === currentMusic.playlist_id) this.isRepeatAll = item.is_repeat_all
            } else {
                item.isSelect = index === 0
                if (index === 0) this.isRepeatAll = item.is_repeat_all
            }
        })
        this.playlist = playlist
        this.musicPlaylist = musicPlaylist
        let musicPlaylistInit = []
        if (musicPlaylist.length > 0) {
            musicPlaylistInit = musicPlaylist.filter((music, index) => {
                if (currentMusicActive) {
                    return music.playlist.id === currentMusic.playlist_id
                }
                return music.playlist.id === playlist[0].id
            })
            // if (musicPlaylistInit.length > 0) this.music = this.convertMusicPlayObject(musicPlaylistInit[0], false)
        }
        if (currentMusicActive) {
            this.musicPlaylistPlay = musicPlaylistInit
            this.music = {
                ...currentMusic,
                isPlay: false
            }
        }
        this.musicPlaylistDisplay = musicPlaylistInit
    }

    @action changePlaylistName(name, playlistSelect) {
        let playlist = this.playlist.slice()
        playlist.forEach((item, index) => {
            if (item.id === playlistSelect.id) {
                playlist[index].name = name
            }
        })
        this.playlist = playlist
    }

    @action addMusicToPlaylist(music, playlistSelect) {
        let musicPlaylist = this.musicPlaylist.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        const playlist = this.playlist.slice()
        const indexAvailable = musicPlaylist.findIndex(item => music.id === item.id)

        if (indexAvailable === -1) {
            // if (musicPlaylist.length === 0) {
            //     this.music = this.convertMusicPlayObject(music, false)
            // }
            musicPlaylist = [music, ...musicPlaylist]
            // if (playlist[4].is_active) {
            const index = playlist.findIndex(item => item.isSelect)
            if (index !== -1) {
                if (playlist[index].id === playlistSelect.id) {
                    musicPlaylistDisplay = [music, ...musicPlaylistDisplay]
                }

                if (musicPlaylistPlay.length > 0) {
                    if (playlistSelect.id === musicPlaylistPlay[0].playlist.id) {
                        musicPlaylistPlay = [music, ...musicPlaylistPlay]
                    }
                }
            }
            // } else if (playlist[0].is_active) {
            //     musicPlaylistDisplay = musicPlaylist
            //     musicPlaylistPlay = musicPlaylist
            // }

            this.musicPlaylistDisplay = musicPlaylistDisplay
            this.musicPlaylistPlay = musicPlaylistPlay
            this.musicPlaylist = musicPlaylist
        }
    }

    @action changeSelectPlaylist(playlistSelect) {
        let playlist = this.playlist.slice()
        playlist.forEach(item => {
            item.isSelect = (item.id === playlistSelect.id)
        })
        this.playlist = playlist
        this.isRepeatAll = playlistSelect.is_repeat_all

        let musicPlaylist = this.musicPlaylist.slice()
        if (musicPlaylist.length > 0) {
            this.musicPlaylistDisplay = musicPlaylist.filter((music, index) => {
                return music.playlist.id === playlistSelect.id
            })
        }
    }

    @action toggleRepeat() {
        this.isRepeatAll = !this.isRepeatAll
        this.playlist.forEach(item => {
            if (item.isSelect) item.is_repeat_all = this.isRepeatAll
        })
        // saveMusicRepeat(this.isRepeatAll)
    }

    @action setAllRepeat(isRepeatAll) {
        this.isRepeatAll = isRepeatAll
    }

    @action switchEdit() {
        this.isEdit = !this.isEdit
    }

    @action changeLanguage(language) {
        this.language = language
        I18n.locale = language
        saveLanguage(language)
    }

    @action changeVolumeMusicPlaying(music) {
        if (music.id === this.music.id) this.music.volume = music.volume

        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        const indexDisplay = musicPlaylistDisplay.findIndex(element => element.id === music.id)
        if (indexDisplay !== -1) {
            musicPlaylistDisplay[indexDisplay].volume = music.volume
        }
        this.musicPlaylistDisplay = musicPlaylistDisplay
    }

    @action changeVolumeAudio(music) {
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        const indexDisplay = musicPlaylistDisplay.findIndex(element => element.id === music.id)
        if (indexDisplay !== -1) {
            musicPlaylistDisplay[indexDisplay].volume = music.volume
            if (music.id === this.music.id) this.music.volume = music.volume
        }
        this.musicPlaylistDisplay = musicPlaylistDisplay

        let musicPlaylistPlay = this.musicPlaylistDisplay.slice()
        const indexPlay = musicPlaylistPlay.findIndex(element => element.id === music.id)
        if (indexPlay !== -1) {
            musicPlaylistPlay[indexPlay].volume = music.volume
            if (music.id === this.music.id) this.music.volume = music.volume
        }
        this.musicPlaylistPlay = musicPlaylistPlay

        let musicPlaylist = this.musicPlaylist.slice()
        const index = musicPlaylist.findIndex(element => element.id === music.id)
        if (index !== -1) {
            musicPlaylist[index].volume = music.volume
            if (music.id === this.music.id) this.music.volume = music.volume
        }
        this.musicPlaylist = musicPlaylist
    }

    convertMusicPlayObject = (music, isPlay) => {
        return {
            id: music.id,
            audioUrl: music.music.origin_url,
            isPlay,
            timeTotal: music.music.time_total || 0,
            currentPosition: 0,
            volume: music.volume,
            playlist_id: music.playlist.id,
            music_id: music.music.id,
            musicDetail: music.music.music_detail
        }
    }

    @action playAudio(item) {
        let musicPlaylist = this.musicPlaylist.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()

        const prevIndexPlay = musicPlaylistPlay.findIndex(element => element.id === this.music.id)
        if (prevIndexPlay !== -1) musicPlaylistPlay[prevIndexPlay].isPlay = false
        const prevIndexDisplay = musicPlaylistDisplay.findIndex(element => element.id === this.music.id)
        if (prevIndexDisplay !== -1) musicPlaylistDisplay[prevIndexDisplay].isPlay = false
        const prevIndex = musicPlaylist.findIndex(element => element.id === this.music.id)
        if (prevIndex !== -1) musicPlaylist[prevIndex].isPlay = false

        if (musicPlaylistPlay.length > 0) {
            if (musicPlaylistDisplay[0].playlist.id === musicPlaylistPlay[0].playlist.id) {
                const indexPlay = musicPlaylistPlay.findIndex(element => element.id === item.id)
                // const indexDisplay = musicPlaylistDisplay.findIndex(element => element.id === item.id)
                const index = musicPlaylist.findIndex(element => element.id === item.id)

                if (indexPlay !== -1) {
                    musicPlaylistPlay[indexPlay].isPlay = true
                    musicPlaylistDisplay[indexPlay].isPlay = true
                    musicPlaylist[index].isPlay = true

                    if (musicPlaylistPlay[indexPlay].id === this.music.id) {
                        this.music.isPlay = true
                    } else {
                        this.music = this.convertMusicPlayObject(musicPlaylistPlay[indexPlay], true)
                    }

                    this.musicPlaylistPlay = musicPlaylistPlay
                    this.musicPlaylistDisplay = musicPlaylistDisplay
                    this.musicPlaylist = musicPlaylist
                }
            } else {
                musicPlaylistPlay = this.musicPlaylistDisplay.slice()
                const indexPlay = musicPlaylistPlay.findIndex(element => element.id === item.id)
                // const indexDisplay = musicPlaylistDisplay.findIndex(element => element.id === item.id)
                const index = musicPlaylist.findIndex(element => element.id === item.id)

                if (indexPlay !== -1) {
                    musicPlaylistPlay[indexPlay].isPlay = true
                    musicPlaylistDisplay[indexPlay].isPlay = true
                    musicPlaylist[index].isPlay = true

                    this.music = this.convertMusicPlayObject(musicPlaylistPlay[indexPlay], true)

                    this.musicPlaylistPlay = musicPlaylistPlay
                    this.musicPlaylistDisplay = musicPlaylistDisplay
                    this.musicPlaylist = musicPlaylist
                }
            }
        } else {
            musicPlaylistPlay = musicPlaylistDisplay
            const indexDisplay = musicPlaylistDisplay.findIndex(element => element.id === item.id)
            const index = musicPlaylist.findIndex(element => element.id === item.id)
            if (indexDisplay !== -1) {
                musicPlaylistPlay[indexDisplay].isPlay = true
                musicPlaylistDisplay[indexDisplay].isPlay = true
                musicPlaylist[index].isPlay = true

                this.music = this.convertMusicPlayObject(musicPlaylistPlay[indexDisplay], true)

                this.musicPlaylistPlay = musicPlaylistPlay
                this.musicPlaylistDisplay = musicPlaylistDisplay
                this.musicPlaylist = musicPlaylist
            }
        }
    }

    @action nextAudio(music, onEnd) {
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylist = this.musicPlaylist.slice()

        const indexPlay = musicPlaylistPlay.findIndex(element => element.id === music.id)
        const index = musicPlaylist.findIndex(element => element.id === music.id)

        if (indexPlay !== -1) {
            const isTheSameList = musicPlaylistDisplay.length > 0 && musicPlaylistDisplay[0].playlist.id === musicPlaylistPlay[0].playlist.id
            musicPlaylistPlay[indexPlay].isPlay = false
            if (isTheSameList) musicPlaylistDisplay[indexPlay].isPlay = false
            musicPlaylist[index].isPlay = false

            if (indexPlay < musicPlaylistPlay.length - 1) {
                this.music = this.convertMusicPlayObject(musicPlaylistPlay[indexPlay + 1], true)

                musicPlaylistPlay[indexPlay + 1].isPlay = true
                if (isTheSameList) musicPlaylistDisplay[indexPlay + 1].isPlay = true
                const nextIndex = musicPlaylist.findIndex(element => element.id === musicPlaylistPlay[indexPlay + 1].id)
                musicPlaylist[nextIndex].isPlay = true

            } else if (musicPlaylistPlay[0] && musicPlaylistPlay[0].playlist.is_repeat_all) {
                if (onEnd && onEnd.onEnd && musicPlaylistPlay.length === 1) {
                    EventRegister.emit(ON_SLIDING_COMPLETE, 0)
                    this.music.currentPosition = 0
                } else if (musicPlaylistPlay.length > 1) {
                    this.music = this.convertMusicPlayObject(musicPlaylistPlay[0], true)
                    musicPlaylistPlay[0].isPlay = true
                    if (isTheSameList) musicPlaylistDisplay[0].isPlay = true
                    const nextIndex = musicPlaylist.findIndex(element => element.id === musicPlaylistPlay[0].id)
                    musicPlaylist[nextIndex].isPlay = true
                }
            } else if (onEnd && onEnd.onEnd) {
                // Last music
                this.music = this.initMusic()
                removeCurrentMusic()
            }
            this.musicPlaylistPlay = musicPlaylistPlay
            this.musicPlaylistDisplay = musicPlaylistDisplay
            this.musicPlaylist = musicPlaylist
        }
    }

    @action prevAudio(music) {
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylist = this.musicPlaylist.slice()

        const indexPlay = musicPlaylistPlay.findIndex(element => element.id === music.id)
        const index = musicPlaylist.findIndex(element => element.id === music.id)

        if (indexPlay !== -1 && indexPlay > 0) {
            const isTheSameList = musicPlaylistDisplay.length > 0 && musicPlaylistDisplay[0].playlist.id === musicPlaylistPlay[0].playlist.id
            musicPlaylistPlay[indexPlay].isPlay = false
            if (isTheSameList) musicPlaylistDisplay[indexPlay].isPlay = false
            musicPlaylist[index].isPlay = false

            this.music = this.convertMusicPlayObject(musicPlaylistPlay[indexPlay - 1], true)

            musicPlaylistPlay[indexPlay - 1].isPlay = true
            if (isTheSameList) musicPlaylistDisplay[indexPlay - 1].isPlay = true
            const nextIndex = musicPlaylist.findIndex(element => element.id === musicPlaylistPlay[indexPlay - 1].id)
            musicPlaylist[nextIndex].isPlay = true
        }

        this.musicPlaylistPlay = musicPlaylistPlay
        this.musicPlaylistDisplay = musicPlaylistDisplay
        this.musicPlaylist = musicPlaylist
    }

    @action playAudioDemo(music) {
        this.music.isPlay = false
        this.music = {
            ...music,
            currentPosition: 0,
            volume: 0.6,
            isDemo: true
        }
    }

    @action changePlay(isPlay, music) {
        if (music) {
            this.music = {
                ...music,
                isPlay: isPlay
            }
        } else {
            this.music.isPlay = isPlay
        }
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylist = this.musicPlaylist.slice()

        const indexPlay = musicPlaylistPlay.findIndex(element => element.id === this.music.id)
        const index = musicPlaylist.findIndex(element => element.id === this.music.id)

        if (indexPlay !== -1) {
            const isTheSameList = musicPlaylistDisplay.length > 0 && musicPlaylistDisplay[0].playlist.id === musicPlaylistPlay[0].playlist.id
            musicPlaylistPlay[indexPlay].isPlay = isPlay
            musicPlaylist[index].isPlay = isPlay
            if (isTheSameList) musicPlaylistDisplay[indexPlay].isPlay = isPlay

            this.musicPlaylistPlay = musicPlaylistPlay
            this.musicPlaylistDisplay = musicPlaylistDisplay
            this.musicPlaylist = musicPlaylist
        }
    }

    @action updateNextOrder(nextOrder) {
        if (nextOrder && nextOrder.length > 0) this.nextOrder = nextOrder
    }

    @action updateMusicByNewOrder = () => {
        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let temp = []

        this.nextOrder.forEach((item, index) => {
            temp.push(musicPlaylistDisplay[parseInt(item)])
        })
        if (musicPlaylistPlay.length > 0) {
            if (musicPlaylistPlay[0].playlist.id === musicPlaylistDisplay[0].playlist.id) {
                this.musicPlaylistPlay = temp
            }
        }
        this.musicPlaylistDisplay = temp
        this.nextOrder = []
    }

    @action deleteMusic(music) {
        let musicPlaylist = this.musicPlaylist.slice()
        this.musicPlaylist = musicPlaylist.filter((item) => {
            return item.id !== music.id
        })
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        this.musicPlaylistDisplay = musicPlaylistDisplay.filter((item) => {
            return item.id !== music.id
        })

        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        if (musicPlaylistPlay.length > 0) {
            this.musicPlaylistPlay = musicPlaylistPlay.filter((item) => {
                return item.id !== music.id
            })
        }

        if (music.id === this.music.id) {
            this.music = this.initMusic()
        }
    }

    @action updateCurrentPosition(currentPosition) {
        const comparePosition = currentPosition - this.music.currentPosition
        if (comparePosition < 2 && comparePosition > 0)
            this.music.currentPosition = currentPosition
    }

    @action replayMusic(isReplay) {
        this.music.isReplay = isReplay

        let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        let musicPlaylistDisplay = this.musicPlaylistDisplay.slice()
        let musicPlaylist = this.musicPlaylist.slice()

        const indexPlay = musicPlaylistPlay.findIndex(element => element.id === this.music.id)
        const index = musicPlaylist.findIndex(element => element.id === this.music.id)

        if (indexPlay !== -1) {
            const isTheSameList = musicPlaylistDisplay.length > 0 && musicPlaylistDisplay[0].playlist.id === musicPlaylistPlay[0].playlist.id
            musicPlaylistPlay[indexPlay].isReplay = isReplay
            musicPlaylist[index].isReplay = isReplay
            if (isTheSameList) musicPlaylistDisplay[indexPlay].isReplay = isReplay

            this.musicPlaylistPlay = musicPlaylistPlay
            this.musicPlaylistDisplay = musicPlaylistDisplay
            this.musicPlaylist = musicPlaylist
        }
    }

    @action onChangeSeekBar(currentPosition, onChangeSlide) {
        this.music.onChangeSlide = onChangeSlide
        this.music.currentPosition = Math.floor(currentPosition)
        // this.music.isPlay = isPlay
        // let musicPlaylistPlay = this.musicPlaylistPlay.slice()
        // musicPlaylistPlay.forEach((item, index) => {
        //     if (item.id === this.music.id) {
        //         musicPlaylistPlay[index].isPlay = isPlay
        //     }
        // })
        // this.musicPlaylistPlay = musicPlaylistPlay
    }

    @action setDuration(timeTotal) {
        this.music.timeTotal = timeTotal
    }

    @action setTimeTotalPlay(timeTotalPlay) {
        this.music.timeTotalPlay = timeTotalPlay
    }

    @action setTimePlay(timePlay) {
        this.music.timePlay = timePlay
    }
}