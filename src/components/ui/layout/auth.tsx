import { Outlet } from 'react-router'

const AuthLayout = () => {

	return (
		<div className='flex justify-center items-center mt-20'>
			<div className='w-full max-w-md p-4 bg-white rounded-lg shadow-lg  '>
				<Outlet />
			</div>
		</div>
	)
}

export default AuthLayout