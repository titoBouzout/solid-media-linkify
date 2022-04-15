# Solid Media Linkify

Given a string it returns links, images, videos, audio, simple formatting as tags and also emojis like `:duck:` as 🦆.

A Solid component. See https://www.solidjs.com/

## Usage

```jsx
import Linkify from 'solid-media-linkify'

export default function YourComponent() {
	return (
		<Linkify
			text={`
				 becomes a link tag https://example.net/
				 becomes an image tag https://example.net/image.png,
				 becomes an audio tag https://example.net/audio.ogg"
				 becomes an video tag https://example.net/video.mp4.

				 :duck: becomes <emoji>🦆</emoji>
				 🦆 becomes <emoji>🦆</emoji>

				 *bold* becomes <b>bold</b>
				 /italic/ becomes <em>italic</em>
				 -stroke- becomes <s>stroke</s>
				 _underline_ becomes <u>underline</u>
				 \`code\` becomes <code>\`code\`</code>
				 |spoiler| becomes <spoiler></spoiler>

				 > quote becomes <q>quote</q>
				 / italic something becomes <i>italic something</i>
			`}
			scroll={() => {
				console.log(`
					if you need to scroll something
					after a image/audio/video is displayed
					you can use this
				`)
			}}
			// Chris becomes <mark>Chris</mark>
			mark="Chris"
			// some links, like https://avatars.githubusercontent.com/u/64156?s=60&v=4
			// are images, but theres no indicator on the link itself that its an image
			// for that reason you may want to sniff the links for the contentType
			// this attribute allows to sniff the link using a fetch HEAD request
			// defaults to false
			guessType={true}
			emoji={true}
		/>
	)
}
```

## Install

`npm install solid-media-linkify`

## How it works?

Splits the text in white-spaces and then checks for http/https/data to create the Tags. There's no injection, these are real tags without any risky innerHTML. It has a very small parser for the text formatting.

## Functionality

- supported images: (png|apng|jpg|jpeg|gif|svg|webp)
- supported audio: (wav|mp3|m4a|ogg|oga|opus)
- supported video: (webm|mp4|mpg|ogv)
- Emojis are wrapped in as `<emoji>🦆</emoji>` in case you want to display them bigger.
- You may pass a `scroll` prop function, to be able to scroll(a chat?) after an image/video/audio is visible.
- You may pass a `mark` text. `mark="Tito"` will become `<mark>Tito</mark>`, it's case insensitive
- links contain `rel="noopener"`
- external links open in `_blank`
- `alt` and `title` contain the URL
- open links always in new tabs by adding a number to `target="_blank0"`
- clean ",. from the end of links and embeds
- always open internal images and videos links on new tabs
- converts data urls to blob urls
- provides simple formatting for bold, italic, stroke, underline, code, spoiler
- some images/videos/adios don't give any indication of what they are in the url, we do a HEAD request to try to figure it out when guessType is true.

## TODO

- the text formatter is not recursive
- an option to decode html entities.
- Give the option to format the text content of links, would be nice to replace domain for favicons in some situations
- allow to extend the emoji with images, like `:tito:` to become something else
- allow mark to be an array
- allow to pass a proxy url for embeds, to not leak ips

## Alternatives

?

## Author

- https://github.com/titoBouzout

## URL

- https://github.com/titoBouzout/solid-media-linkify
- https://www.npmjs.com/package/solid-media-linkify
