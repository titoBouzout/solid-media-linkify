import Media from './media.js'
import Emoji from './emoji.json'
import isEmoji from './is-emoji.js'
import tokenize from './tokenize.js'

const noop = () => {}
const separator = /(\s+)/

export default function Linkify(props) {
	let scroll = props.scroll || noop
	let mark = props.mark ? props.mark.toLowerCase() : false

	let s
	if (!props.trim) {
		s = (props.text || '').trim()
	} else {
		s = (props.text || '')
			.split('\n')
			.map(m => m.trim())
			.join('\n')
			.trim()
	}

	let quote = s => s
	let italic = s => s
	if (s.startsWith('>')) {
		s = s.replace(/^>\s*/, '').trim()
		quote = s => <q>{s}</q>
	}
	if (s.startsWith('/ ')) {
		s = s.replace(/^\/\s+/, '').trim()
		italic = s => <em>{s}</em>
	}

	let tokens = tokenize(s)

	let nodes = []
	for (let token of tokens) {
		s = token.s.split(separator)
		let node = []
		for (let i = 0, l = s.length; i < l; i++) {
			isEmoji.lastIndex = 0

			if (props.emoji && Emoji[s[i]]) {
				// :duck: to <span class="emoji-native">🦆</span>
				// 🦆 to <span class="emoji-native">🦆</span>
				node.push(<emoji>{s[i][0] === '#' ? s[i] + ' ' + Emoji[s[i]] : Emoji[s[i]]}</emoji>)
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
				node.push(<Media url={s[i]} scroll={scroll} guessType={props.guessType} />)
			} else if (mark !== false && mark === s[i].toLowerCase()) {
				node.push(<mark>{s[i]}</mark>)
			} else if (props.emoji && !/[a-z0-9&*#]/i.test(s[i]) && isEmoji.test(s[i])) {
				// _unkown emoji_ to <span class="emoji-native">_unkown emoji_</span>
				node.push(<emoji>{s[i]}</emoji>)
			} else if (typeof node[node.length - 1] === 'string') {
				// to create as little text node as possible append a string to the previous string
				node[node.length - 1] += s[i]
			} else {
				node.push(s[i])
			}
		}
		nodes.push(token.wrap(node))
	}

	return <>{quote(italic(nodes))}</>
}
