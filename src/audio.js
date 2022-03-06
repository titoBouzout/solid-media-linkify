
export default function Audio(props) {
	return (
		<audio
			controls="true"
			src={props.url}
			alt={props.url}
			title={props.url}
			oncanplay={props.scroll}
			crossorigin="crossorigin"
		>
			<source src={props.url} crossorigin="crossorigin" />
		</audio>
	)
}
