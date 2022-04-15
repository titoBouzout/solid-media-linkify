export default function tokenize(s) {
	s = ' ' + (s || '').trim()

	let pieces = []
	let buffer = { data: '' }

	for (let i = 0; i < s.length; i++) {
		// search for an opening tag
		if (s[i] === ' ' && tags[s[i + 1]]) {
			// search for the closing tag
			let newI = tags[s[i + 1]](s, i, buffer, pieces)
			if (i !== newI) {
				i = newI
				continue
			}
			i = newI
		}

		buffer.data += s[i]
	}
	if (buffer.data !== '') pieces.push({ s: buffer.data, name: 'text', wrap: text })

	// undo added char to facilitate parsing
	pieces[0].s = pieces[0].s.trimStart()
	return pieces
}
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
const code = s => <code>`{s}`</code>

let tags = {
	'*': (s, i, buffer, pieces) => token({ name: '*', wrap: bold }, s, i, buffer, pieces),
	'/': (s, i, buffer, pieces) => token({ name: '/', wrap: italic }, s, i, buffer, pieces),
	'_': (s, i, buffer, pieces) => token({ name: '_', wrap: underline }, s, i, buffer, pieces),
	'-': (s, i, buffer, pieces) => token({ name: '-', wrap: stroke }, s, i, buffer, pieces),
	'|': (s, i, buffer, pieces) => token({ name: '|', wrap: spoiler }, s, i, buffer, pieces),
	'`': (s, i, buffer, pieces) => token({ name: '`', wrap: code }, s, i, buffer, pieces),
}

function token(tag, s, i, buffer, pieces) {
	let oldi = i
	let newBuffer = s[i] //  + s[i + 1] skip opening tag
	let didEnd = false
	for (i += 2; i < s.length; i++) {
		if (s[i] === tag.name && s[i + 1] === ' ') {
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
		i = oldi
	}
	return i
}
