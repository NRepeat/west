import { Button } from '@/components/ui/button'
import { useSessionStore } from '@/store/user-store';
import { useMutation, } from '@tanstack/react-query'
import Cookie from 'js-cookie'
const Account = () => {
	const logout = useSessionStore(state => state.logout)
	const mutation = useMutation({
		mutationFn: () =>
			fetch('http://localhost:3000/auth/logout', {
				method: 'GET',
				credentials: 'include',
			}),
	});
	const handleLogout = async () => {
		await mutation.mutateAsync()
		Cookie.remove('user')
		logout()
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