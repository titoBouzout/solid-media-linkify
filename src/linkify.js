import Media from './media.js'
import Emoji from './emoji.json'
import isEmoji from './isEmoji.js'

const noop = () => {}
const separator = /(\s+)/

export default function Linkify(props) {
	let scroll = props.scroll || noop
	let mark = props.mark ? props.mark.toLowerCase() : false

	let s = []
	if (typeof props.children === 'string') {
		s = (props.children || '').trim().split(separator)
	} else {
		;(props.children || []).forEach(item => {
			if (typeof item === 'string') {
				s.push(...item.split(separator))
			} else {
				s.push(item)
			}
		})
	}

	let nodes = []
	for (let i = 0, l = s.length; i < l; i++) {
		isEmoji.lastIndex = 0

		if (typeof s[i] !== 'string') {
			nodes.push(s[i])
		} else if (props.emoji && Emoji[s[i]]) {
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
			nodes.push(<Media url={s[i]} scroll={scroll} guessType={props.guessType} />)
		} else if (mark !== false && mark === s[i].toLowerCase()) {
			nodes.push(<mark>{s[i]}</mark>)
		} else if (props.emoji && !/[a-z0-9&*#]/i.test(s[i]) && isEmoji.test(s[i])) {
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
