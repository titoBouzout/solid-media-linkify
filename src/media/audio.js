import { cleanLink } from './util'

export default function Audio(props) {
	return (
		<audio
			controls="true"
			src={props.url.replace(cleanLink, '')}
			alt={props.url}
			title={props.url}
			oncanplay={props.scroll}
			crossorigin
		>
			<source src={props.url.replace(cleanLink, '')} crossorigin />
		</audio>
	)
}
