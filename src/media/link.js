import { cleanLink } from './util'

let num = 0

export default function Link(props) {
	return (
		<a
			href={props.url.replace(cleanLink, '')}
			title={props.url}
			alt={props.url}
			target={
				props.blank ||
				props.url.indexOf(window.location.protocol + '//' + window.location.host + '/') !== 0
					? '_blank' + num++
					: null
			}
			rel="noopener"
		>
			{props.children || props.url}
		</a>
	)
}
