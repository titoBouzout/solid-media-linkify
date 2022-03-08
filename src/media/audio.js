let clean = /[\.,"]$/

export default function Audio(props) {
	return (
		<audio
			controls="true"
			src={props.url.replace(clean, '')}
			alt={props.url}
			title={props.url}
			oncanplay={props.scroll}
			crossorigin="crossorigin"
		>
			<source src={props.url.replace(clean, '')} crossorigin="crossorigin" />
		</audio>
	)
}
