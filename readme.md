# Solid Media Linkify

Given a string it returns links, images, videos, audio as tags and also emojis like `:duck:` as 🦆.

## Usage

```jsx
import Linkify from 'solid-media-linkify'

export default function YourComponent() {
	return (
		<Linkify
			text={`
				 becomes a link tag https://example.net/
				 becomes an image tag https://example.net/image.(png|apng|jpg|jpeg|gif|svg|webp)
				 becomes an audio tag https://example.net/audio.(wav|mp3|m4a|ogg|oga)
				 becomes an video tag https://example.net/video.(webm|mp4|mpg|ogv)
				 :duck: becomes 🦆
			`}
			scroll={() => {
				console.log(`
				if you need to scroll something
				after a image/audio/video loads
				you can use this`)
			}}
			mark="will"
		/>
	)
}
```

## Install

`npm install https://github.com/titoBouzout/solid-media-linkify.git`

or

`npm install solid-media-linkify`

## How it works?

Splits the text in white-spaces and then checks for http, https or blob to create the Tags. There's no injection, these are real tags without any risky innerHTML.

## Functionality

- Emojis are wrapped in as `<span class="emoji-native">🦆</span>` in case you want to display them bigger.
- You may pass a `scroll` prop function, to be able to scroll(a chat?) after an image/video/audio finishes loading.
- You may pass a `mark` text. `mark="Tito"` will become `<mark>Tito</mark>`
- srcs contain `crossorigin="crossorigin"`
- links contain `rel="noopener"`
- external links open in `_blank`
- `alt` and `title` contain the URL

## Caveats

- Look at the source code, there's a big RegExp and a big JSON for the emojis functionality.
- As this code is used mostly in chats, the matching is weak on purpose to give the best experience. Consider this link `https://media.tenor.com/videos/024630f433c58cba878a57a98b69337f/mp4` They don't use pronunciation before the extension...

## TODO

As is, does the job on my sites. Possibly new functionalities.

- custom formatters for special cases
-

## Author

- https://github.com/titoBouzout

## URL

- https://github.com/titoBouzout/solid-media-linkify
