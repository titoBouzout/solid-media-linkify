import { cleanLink } from './util'

import Link from './link.js'

export default function Video(props) {
	return (
		<Link url={props.url}>
			<video
				loop
				autoplay
				muted
				src={props.url.replace(cleanLink, '')}
				alt={props.url}
				title={props.url}
				oncanplay={props.scroll}
				crossorigin="crossorigin"
			>
				<source src={props.url.replace(cleanLink, '')} crossorigin="crossorigin" />
			</video>
		</Link>
	)
}
