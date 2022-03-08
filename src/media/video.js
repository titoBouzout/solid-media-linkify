import Link from './link.js'

let clean = /[\.,"]$/

export default function Video(props) {
	return (
		<Link url={props.url}>
			<video
				loop
				autoplay
				muted
				src={props.url.replace(clean, '')}
				alt={props.url}
				title={props.url}
				oncanplay={props.scroll}
				crossorigin="crossorigin"
			>
				<source src={props.url.replace(clean, '')} crossorigin="crossorigin" />
			</video>
		</Link>
	)
}
