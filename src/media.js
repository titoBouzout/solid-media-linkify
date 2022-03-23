import { createMutable } from 'solid-js/store'
import { createSignal } from 'solid-js'

import Video from './media/video.js'
import Audio from './media/audio.js'
import Image from './media/image.js'
import Link from './media/link.js'

function toObjectURL(url) {
	let link = createMutable({ url })
	fetch(url)
		.then(r => r.blob())
		.then(blob => {
			link.url = URL.createObjectURL(blob)
		})
	return link
}

async function toMediaLink(url, scroll) {
	let res = await fetch(url, { method: 'HEAD' })
	let contentType = res.headers.get('Content-Type')
	return <Media url={url} scroll={scroll} type={contentType} />
}

function fallback(fallback, promise) {
	const [message, setMessage] = createSignal(fallback)
	promise.then(r => r !== undefined && setMessage(r))
	return message
}

export default function Media(props) {
	let url = props.url
	if (/^data:video\/(webm|mp4|mpg|ogv);base64/.test(url)) {
		let link = toObjectURL(url)
		return <Video url={link.url} scroll={props.scroll} />
	} else if (/^data:audio\/(wav|mp3|m4a|ogg|oga|opus);base64/.test(url)) {
		let link = toObjectURL(url)
		return <Audio url={link.url} scroll={props.scroll} />
	} else if (/^data:image\/(png|apng|jpg|jpeg|gif|svg|webp);base64/.test(url)) {
		let link = toObjectURL(url)
		return <Image url={link.url} scroll={props.scroll} />
	} else if (/^data:/.test(url)) {
		let link = toObjectURL(url)
		return <Link url={link.url} />
	} else if (/[\.\/](webm|mp4|mpg|ogv)/gi.test(props.type || url)) {
		return <Video url={url} scroll={props.scroll} />
	} else if (/[\.\/](wav|mp3|m4a|ogg|oga|opus)/gi.test(props.type || url)) {
		return <Audio url={url} scroll={props.scroll} />
	} else if (/[\.\/](png|apng|jpg|jpeg|gif|svg|webp)/gi.test(props.type || url)) {
		return <Image url={url} scroll={props.scroll} />
	} else if (props.type) {
		// if type is set, then we already tried to figure out the type, do nothing
	} else if (props.guessType && /^[^/]+\/\/[^/]+\/.+/.test(url)) {
		// do not guess type of links without paths
		// display a link as fallback
		// try to guess the type by doing fetch
		return fallback(<Link url={url} />, toMediaLink(url, props.scroll))
	} else {
		return <Link url={url} />
	}
}
