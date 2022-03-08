import Video from './media/video.js'
import Audio from './media/audio.js'
import Image from './media/image.js'
import Link from './media/link.js'

export default function Media(props) {
	if (/data:video\/(webm|mp4|mpg|ogv);base64/.test(props.url)) {
		return <Video url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else if (/data:audio\/(wav|mp3|m4a|ogg|oga|opus);base64/.test(props.url)) {
		return <Audio url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else if (/data:image\/(png|apng|jpg|jpeg|gif|svg|webp);base64/.test(props.url)) {
		return <Image url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else if (/[\.\/](webm|mp4|mpg|ogv)/gi.test(props.url)) {
		return <Video url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else if (/[\.\/](wav|mp3|m4a|ogg|oga|opus)/gi.test(props.url)) {
		return <Audio url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else if (/[\.\/](png|apng|jpg|jpeg|gif|svg|webp)/gi.test(props.url)) {
		return <Image url={props.url.split('_DATA_URL_')[0]} scroll={props.scroll} />
	} else {
		return <Link url={props.url.split('_DATA_URL_')[0]} />
	}
}
