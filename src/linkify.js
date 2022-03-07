import Media from './media.js'
import Emoji from './emoji.json'
import isEmoji from './isEmoji.js'

const noop = () => {}

export default function Linkify(props) {
	let s = props.text
		.replace(/https?:\/\/youtu\.be\//gi, 'https://www.youtube.com/watch?v=')
		.trim()
		.split(/(\s+)/)

	let scroll = props.scroll || noop
	let mark = props.mark || ''

	for (let i = 0, l = s.length; i < l; i++) {
		isEmoji.lastIndex = 0

		if (
			(s[i].indexOf('http') === 0 || s[i].indexOf('blob:') === 0) &&
			s[i] != 'http' &&
			s[i] != 'https' &&
			s[i] != 'blob'
		) {
			s[i] = <Media url={s[i]} scroll={scroll} />
		} else if (mark.toLowerCase() === s[i].toLowerCase()) {
			s[i] = <mark>{s[i]}</mark>
		} else if (Emoji[s[i]]) {
			// :duck: to <span class="emoji-native">🦆</span>
			// 🦆 to <span class="emoji-native">🦆</span>
			s[i] = <span class="emoji-native">{Emoji[s[i]]}</span>
		} else if (!/[a-z0-9&*#]/i.test(s[i]) && isEmoji.test(s[i])) {
			// _unkown emoji_ to <span class="emoji-native">_unkown emoji_</span>
			s[i] = <span class="emoji-native">{s[i]}</span>
		}
		s[i] = <>{s[i]}</>
	}

	return s
}
