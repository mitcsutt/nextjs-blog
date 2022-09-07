import { GetStaticProps } from "next"
import encode from "utils/encode"

export default ({ encodedVal }: { encodedVal: string }) => {
	console.log('local')
	return (
		<>
			<h1>Check the encodedVal below</h1>
			<p>{encodedVal}</p>
		</>
	)
}

export const getStaticProps: GetStaticProps = async() => {
	console.log('server')
	const bearer = process.env.SECURE_ENV
	const encodedVal = await encode(bearer)

	return {
		props: {
			encodedVal
		}
	}
}