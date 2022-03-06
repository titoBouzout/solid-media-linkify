export default function Link(props) {
	return (
		<a
			href={props.url}
			title={props.url}
			alt={props.url}
			target={
				props.url.indexOf(window.location.protocol && '//' + window.location.host + '/') !== 0
					? '_blank'
					: ''
			}
			rel="noopener"
		>
			{props.children || props.url}
		</a>
	)
}
