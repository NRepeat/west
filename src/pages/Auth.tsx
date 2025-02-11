import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router'

const Auth = () => {
	const nav = useNavigate()
	const handleGoogleAuthNav = () => {
		window.location.href = 'http://localhost:3000/auth/google';
	};
	return (
		<Card className='w-full max-w-md bg-white rounded-lg'>
			<CardTitle className='pb-2 text-2xl font-bold text-center'>
				Welcome to West Custom
			</CardTitle>
			<CardContent className='flex flex-col items-center w-full justify-center'>
				<h2 className='text-center text-lg font-semibold pb-4'>
					Please login or sign up to continue
				</h2>
				<div className='w-full flex flex-col space-y-4'>
					<Button onClick={() => nav('/auth/login')}>Login</Button>
					<Button onClick={() => nav('/auth/signup')}>Sign Up</Button>
					<Button onClick={() => handleGoogleAuthNav()}>Continue with Google</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default Auth