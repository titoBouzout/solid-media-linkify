import Link from './link.js'

export default function Video(props) {
	return (
		<Link url={props.url}>
			<video
				loop
				autoPlay
				muted
				src={props.url}
				alt={props.url}
				title={props.url}
				oncanplay={props.scroll}
				crossorigin="crossorigin"
			>
				<source src={props.url} crossorigin="crossorigin" />
			</video>
		</Link>
	)
}
