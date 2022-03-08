# Solid Media Linkify

Given a string it returns links, images, videos, audio as tags and also emojis like `:duck:` as 🦆.

A Solid component. See https://www.solidjs.com/

## Usage

```jsx
import Linkify from 'solid-media-linkify'

export default function YourComponent() {
	return (
		<Linkify
			text={`
				 becomes a link tag https://example.net/
				 becomes an image tag https://example.net/image.(png|apng|jpg|jpeg|gif|svg|webp),
				 becomes an audio tag https://example.net/audio.(wav|mp3|m4a|ogg|oga|opus)"
				 becomes an video tag https://example.net/video.(webm|mp4|mpg|ogv).
				 :duck: becomes 🦆 QUACK!
			`}
			scroll={() => {
				console.log(`
					if you need to scroll something
					after a image/audio/video loads
					you can use this
				`)
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

Splits the text in white-spaces and then checks for http or https to create the Tags. There's no injection, these are real tags without any risky innerHTML.

## Functionality

- Emojis are wrapped in as `<span class="emoji-native">🦆</span>` in case you want to display them bigger.
- You may pass a `scroll` prop function, to be able to scroll(a chat?) after an image/video/audio finishes loading.
- You may pass a `mark` text. `mark={["Tito"]}` will become `<mark>Tito</mark>`, it's case insensitive
- srcs contain `crossorigin="crossorigin"`
- links contain `rel="noopener"`
- external links open in `_blank`
- `alt` and `title` contain the URL

## Caveats

- Look at the source code, there's a big RegExp and a big JSON for the emojis functionality.
- As this code is used mostly in chats, the matching is weak on purpose to give the best experience. Consider this link `https://media.tenor.com/videos/024630f433c58cba878a57a98b69337f/mp4` They don't use punctuation before the extension...

## DONE

- allow to use `children` as the input instead of the prop `text`
- clean ",. from the end of links and embeds
- open links always in new tabs by adding a number to `target="_blank0"`
- always open internal images and videos links on new tabs
- target should be null not an empty string when not in use

## TODO

As is, does the job on my sites. However, there some pending stuff

- There's a hacky portion of code to be able to display data: as blob:, I will have to figure out how to solve this.
- some images don't give any indication that these are images(apply to videos, audio, whatever), we need to look into the content type of the links, we have to do a request.
- an option to decode html entities. Some websites/apis(hi youtube) do a very poor job at escaping so they spit escaped data and code ends being escaped more than once.
- Give the option to format the text content of links, would be nice to replace domain for favicons in some situations, etc
- remove from the typed emojis json the ones that users are not going to likely type, maybe idk
- add bold/italic/spoiler etc
- allow to extend the emoji with images, like `:tito:`
- allow mark to be an array

Possibly new functionalities.

- custom formatters for special cases
- inspiration could be taken from https://linkify.js.org/

## Alternatives

?

## Author

- https://github.com/titoBouzout

## URL

- https://github.com/titoBouzout/solid-media-linkify
