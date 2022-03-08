import Link from './link.js'

let clean = /[\.,"]$/

export default function Image(props) {
	return (
		<Link url={props.url}>
			<img
				src={props.url.replace(clean, '')}
				alt={props.url}
				title={props.url}
				onload={props.scroll}
				crossorigin="crossorigin"
			/>
		</Link>
	)
}
