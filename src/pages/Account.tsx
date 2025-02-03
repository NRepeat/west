import { Button } from '@/components/ui/button'
import { useMutation, } from '@tanstack/react-query'

const Account = () => {
	const mutation = useMutation({
		mutationFn: () =>
			fetch('http://localhost:3000/auth/logout', {
				method: 'GET', // Use POST if needed
				credentials: 'include', // Include cookies in the request
			}),
	});
	const handleLogout = async () => {
		mutation.mutateAsync()

	}
	return (
		<div>
			<Button onClick={handleLogout}>
				Logout
			</Button>
		</div>
	)
}

export default Account