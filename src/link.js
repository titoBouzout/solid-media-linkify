let clean = /[\.,"]$/
let num = 0

export default function Link(props) {
	return (
		<a
			href={props.url.replace(clean, '')}
			title={props.url}
			alt={props.url}
			target={
				props.url.indexOf(window.location.protocol + '//' + window.location.host + '/') !== 0
					? '_blank' + num++
					: ''
			}
			rel="noopener"
		>
			{props.children || props.url}
		</a>
	)
}
