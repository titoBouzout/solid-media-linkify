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
	'*': (s, i, buffer, pieces, w) => tokenEnd({ name: '*', wrap: bold }, s, i, buffer, pieces, w),
	'/': (s, i, buffer, pieces, w) => tokenEnd({ name: '/', wrap: italic }, s, i, buffer, pieces, w),
	'_': (s, i, buffer, pieces, w) =>
		tokenEnd({ name: '_', wrap: underline }, s, i, buffer, pieces, w),
	'-': (s, i, buffer, pieces, w) => tokenEnd({ name: '-', wrap: stroke }, s, i, buffer, pieces, w),
	'|': (s, i, buffer, pieces, w) => tokenEnd({ name: '|', wrap: spoiler }, s, i, buffer, pieces, w),
	'`': (s, i, buffer, pieces, w) => tokenEnd({ name: '`', wrap: code }, s, i, buffer, pieces, w),
}

function punctuationStart(char, s, i) {
	switch (char) {
		case '"':
		case "'":
		case '[':
		case '(':
		case '{':
		case '¡':
		case '¿':
			return /\s/.test(s[i - 1])
		default:
			return /\s/.test(char)
	}
}

function punctuationEnd(char, s, i) {
	switch (char) {
		case '?':
		case '!':
		case '.':
		case ',':
		case ']':
		case ')':
		case '}':
		case '"':
		case "'":
			// end of string or followed by whitespace
			return i + 2 === s.length || /\s/.test(s[i + 2])
		default:
			// end of string or is whitespace
			return i + 1 === s.length || /\s/.test(char)
	}
}

export default function tokenize(s) {
	// to facilitate parsing add a whitespace at the start
	s = ' ' + (s || '').trim()

	let pieces = []
	let buffer = { data: '' }

	for (let i = 0; i < s.length; i++) {
		// search for an opening tag
		if (tags[s[i + 1]] && punctuationStart(s[i], s, i)) {
			// search for the closing tag, i + 1 in the argument to skip the whitespace
			let newI = tags[s[i + 1]](s, i + 1, buffer, pieces, s[i])
			if (i !== newI) {
				i = newI
				continue
			}
			i = newI
		}

		// remove the escape char, i - 1 in the argument to skip the punctuation
		if (!(s[i] === '\\' && tags[s[i + 1]] && punctuationStart(s[i - 1], s, i - 1))) {
			buffer.data += s[i]
		}
	}
	if (buffer.data !== '') {
		pieces.push({ s: buffer.data, name: 'text', wrap: text })
	}

	// undo the added whitespace to facilitate parsing
	pieces[0].s = pieces[0].s.trimStart()
	if (pieces[0].s === '') {
		pieces.shift()
	}
	return pieces
}

function tokenEnd(tag, s, i, buffer, pieces, whitespace) {
	let oldi = i
	let newBuffer = ''
	let found = false
	// i += 1 to skip the opening tag
	for (i += 1; i < s.length; i++) {
		if (s[i] === tag.name && punctuationEnd(s[i + 1], s, i)) {
			found = true
			break
		} else if (s[i] === '\n') {
			break
		}
		newBuffer += s[i]
	}
	if (found) {
		if (buffer.data + whitespace !== '') {
			pieces.push({ s: buffer.data + whitespace, name: 'text', wrap: text })
		}
		buffer.data = ''
		pieces.push({ s: newBuffer, name: tag.name, wrap: tag.wrap })
	} else {
		// need to un-eat the char when the closing tag was not found, thanks to @boredofnames
		i = oldi - 1
	}
	return i
}
