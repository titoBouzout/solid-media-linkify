# Solid Media Linkify

Given a string it returns links, images, videos, audio as tags and also emojis like `:duck:` as 🦆.

A Solid component. See https://www.solidjs.com/

## Usage

```jsx
import Linkify from 'solid-media-linkify'

export default function YourComponent() {
	return (
		<Linkify
			children={`
				 becomes a link tag https://example.net/
				 becomes an image tag https://example.net/image.png,
				 becomes an audio tag https://example.net/audio.ogg"
				 becomes an video tag https://example.net/video.mp4.
				 :duck: becomes 🦆 QUACK!
			`}
			scroll={() => {
				console.log(`
					if you need to scroll something
					after a image/audio/video is displayed
					you can use this
				`)
			}}
			mark="will"
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

`npm install https://github.com/titoBouzout/solid-media-linkify.git`

or

`npm install solid-media-linkify`

## How it works?

Splits the text in white-spaces and then checks for http/https/data to create the Tags. There's no injection, these are real tags without any risky innerHTML.

## Functionality

- supported images: (png|apng|jpg|jpeg|gif|svg|webp)
- supported audio: (wav|mp3|m4a|ogg|oga|opus)
- supported video: (webm|mp4|mpg|ogv)
- Emojis are wrapped in as `<span class="emoji-native">🦆</span>` in case you want to display them bigger.
- You may pass a `scroll` prop function, to be able to scroll(a chat?) after an image/video/audio is visible.
- You may pass a `mark` text. `mark="Tito"` will become `<mark>Tito</mark>`, it's case insensitive
- links contain `rel="noopener"`
- external links open in `_blank`
- `alt` and `title` contain the URL
- allow to use `children` as the input instead of the prop `children` (this is not recursive tho)
- open links always in new tabs by adding a number to `target="_blank0"`
- clean ",. from the end of links and embeds
- always open internal images and videos links on new tabs
- converts data urls to blob urls
- some images/videos/adios don't give any indication of what they are in the url, we do a HEAD request to try to figure it out.

## Caveats

- Look at the source code, there's a big RegExp and a big JSON for the emojis functionality.
- As this code is used mostly in chats, the matching is weak on purpose to give the best experience. Consider this link `https://media.tenor.com/videos/024630f433c58cba878a57a98b69337f/mp4` They don't use punctuation before the extension...

## TODO

As is, does the job on my sites. However, there some pending stuff

- an option to decode html entities. Some websites/apis(hi youtube) do a very poor job at escaping so they spit escaped data and code ends being escaped more than once.
- Give the option to format the text content of links, would be nice to replace domain for favicons in some situations
- remove from the typed emojis json the ones that users are not going to likely type, maybe idk
- add bold/italic/spoiler/quotes etc
- allow to extend the emoji with images, like `:tito:` to become something else
- allow mark to be an array
- may do children recursive
- allow to pass a proxy url for embeds, to not leak ips

Possibly new functionalities.

- custom formatters for special cases
- inspiration could be taken from https://linkify.js.org/

## Alternatives

?

## Author

- https://github.com/titoBouzout

## URL

- https://github.com/titoBouzout/solid-media-linkify
- https://www.npmjs.com/package/solid-media-linkify
