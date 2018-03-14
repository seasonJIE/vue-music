
export default class Song {
	constructor({id,mid,singer,name,album,duration,image,url}) {
		this.id= id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
}

export function createSong(muiscData) {
	return new Song({
    id: muiscData.songid,
    mid: muiscData.songmid,
    singer: filterSinger(muiscData.singer),
    name: muiscData.songname,
    album: muiscData.albumname,
    duration: muiscData.interval,
    image:
      "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
      muiscData.albummid +
      ".jpg?max_age=2592000",
    url:
      "http://fs.w.kugou.com/201803131330/053aa89b37ba33bf872a682c9c49192d/G012/M07/1C/19/rIYBAFUPtx6AV4G3AGZ5d-nijfs460.mp3"
  });
}

export function filterSinger(singer) {
	let ret = []
	if(!singer) {
		return ''
	}
	singer.forEach((s)=>{
		ret.push(s.name)
	})
	return ret.join('/')
}