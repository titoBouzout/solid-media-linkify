import Media from './media.js'
import Emoji from './emoji.json'
import isEmoji from './isEmoji.js'

const noop = () => {}

export default function Linkify(props) {
	let s = (props.text || '').trim().split(/(\s+)/)

	let scroll = props.scroll || noop
	let mark = props.mark || false
	let nodes = []

	for (let i = 0, l = s.length; i < l; i++) {
		isEmoji.lastIndex = 0

		if (Emoji[s[i]]) {
			// :duck: to <span class="emoji-native">🦆</span>
			// 🦆 to <span class="emoji-native">🦆</span>
			nodes.push(<span class="emoji-native">{Emoji[s[i]]}</span>)
		} else if (
			(s[i].indexOf('http://') === 0 ||
				s[i].indexOf('https://') === 0 ||
				s[i].indexOf('blob:') === 0 ||
				s[i].indexOf('data:') === 0) &&
			s[i] != 'http://' &&
			s[i] != 'https://' &&
			s[i] != 'blob:' &&
			s[i] != 'data:'
		) {
			nodes.push(<Media url={s[i]} scroll={scroll} />)
		} else if (mark !== false && mark.toLowerCase() === s[i].toLowerCase()) {
			nodes.push(<mark>{s[i]}</mark>)
		} else if (!/[a-z0-9&*#]/i.test(s[i]) && isEmoji.test(s[i])) {
			// _unkown emoji_ to <span class="emoji-native">_unkown emoji_</span>
			nodes.push(<span class="emoji-native">{s[i]}</span>)
		} else if (typeof nodes[nodes.length - 1] === 'string') {
			// to create as little text nodes as possible append a string to the previous string
			nodes[nodes.length - 1] += s[i]
		} else {
			nodes.push(s[i])
		}
	}

	return nodes
}
