import { createSignal } from 'solid-js'

export default function PromisedComponent(promise, fallback) {
	const [message, setMessage] = createSignal(promise.fallback || fallback || '')
	;(promise.promise || promise).then(r => r !== undefined && setMessage(r))
	return message
}
