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
		id:muiscData.songid,
		mid:muiscData.songmid,
		singer:filterSinger(muiscData.singer),
		name:muiscData.songname,
		album:muiscData.albumname,
		duration:muiscData.interval,
		image:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ muiscData.albummid +'.jpg?max_age=2592000',
		url:'http://dl.stream.qqmusic.qq.com/C400002mDsuz4FIoRr.m4a?vkey=A2081FC078EBB2B29ACEF8FD33B97D6C44C8A3982C676996E622EEC610F9B1F8A904E8D2212F9AF49EBA1BF0571C8D4137E94C889ADDFE7A&guid=4814341492&uin=0&fromtag=66'
	})
}

function filterSinger(singer) {
	let ret = []
	if(!singer) {
		return ''
	}
	singer.forEach((s)=>{
		ret.push(s.name)
	})
	return ret.join('/')
}
