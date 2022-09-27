import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div>
			<ErrorMessage />
			<p style={{ 'textAlign': 'center' }}>Page doesn`t exist</p>
			<Link to="/" style={{ 'textAlign': 'center', 'display': 'block', 'fontSize': '24px', 'marginTop': '30px' }}>Back to main page</Link>
		</div>
	)
}

export default Page404;