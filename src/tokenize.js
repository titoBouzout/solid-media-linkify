const text = s => s
const bold = s => <b>{s}</b>
const italic = s => <em>{s}</em>
const underline = s => <u>{s}</u>
const stroke = s => <s>{s}</s>
const spoilerRemove = e => {
	e.currentTarget.style.backgroundColor = 'inherit'
	e.currentTarget.style.color = 'inherit'
}
const spoiler = s => <spoiler onClick={spoilerRemove}>{s}</spoiler>
const noop = () => {}
const code = s => (
	<code onClick={() => navigator.clipboard.writeText(s).then(noop).catch(noop)}>`{s}`</code>
)

const tags = {
	'*': (s, i, buffer, pieces) => tokenEnd({ name: '*', wrap: bold }, s, i, buffer, pieces),
	'/': (s, i, buffer, pieces) => tokenEnd({ name: '/', wrap: italic }, s, i, buffer, pieces),
	'_': (s, i, buffer, pieces) => tokenEnd({ name: '_', wrap: underline }, s, i, buffer, pieces),
	'-': (s, i, buffer, pieces) => tokenEnd({ name: '-', wrap: stroke }, s, i, buffer, pieces),
	'|': (s, i, buffer, pieces) => tokenEnd({ name: '|', wrap: spoiler }, s, i, buffer, pieces),
	'`': (s, i, buffer, pieces) => tokenEnd({ name: '`', wrap: code }, s, i, buffer, pieces),
}

const punctuationEnd = (char, string, i) => {
	switch (char) {
		case '?':
		case '!':
		case '.':
		case ',':
		case ']':
		case ')':
		case '"':
		case "'":
			return true
		default:
			return /\s/.test(char)
	}
}

export default function tokenize(s) {
	s = ' ' + (s || '').trim()

	let pieces = []
	let buffer = { data: '' }

	for (let i = 0; i < s.length; i++) {
		// search for an opening tag
		if (/\s/.test(s[i]) && tags[s[i + 1]]) {
			buffer.data += s[i]

			// search for the closing tag
			let newI = tags[s[i + 1]](s, i + 1, buffer, pieces)
			if (i !== newI) {
				i = newI
				continue
			}
			i = newI
		}

		if (s[i] === '\\' && /\s/.test(s[i - 1]) && tags[s[i + 1]]) {
		} else {
			buffer.data += s[i]
		}
	}
	if (buffer.data !== '') pieces.push({ s: buffer.data, name: 'text', wrap: text })

	// undo the added whitespace to facilitate parsing
	pieces[0].s = pieces[0].s.trimStart()
	return pieces
}

function tokenEnd(tag, s, i, buffer, pieces) {
	let oldi = i
	let newBuffer = ''
	let didEnd = false
	for (i += 1; i < s.length; i++) {
		if (s[i] === tag.name && punctuationEnd(s[i + 1], s, i)) {
			didEnd = true
			break
		}
		// skip the closing tag
		if (i === s.length - 1 && s[i] === tag.name) {
		} else {
			newBuffer += s[i]
		}
	}
	if (didEnd || (i === s.length && s[i - 1] === tag.name)) {
		if (buffer.data !== '') pieces.push({ s: buffer.data, name: 'text', wrap: text })
		buffer.data = ''
		pieces.push({ s: newBuffer, name: tag.name, wrap: tag.wrap })
	} else {
		// need to un-eat the char when the closing tag was not found, thanks to @boredofnames
		i = oldi - 1
	}
	return i
}
