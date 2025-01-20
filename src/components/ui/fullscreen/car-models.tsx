import React from 'react'
import { Button } from '../button'

const CarModels = () => {
		return (
				<div className='flex-col justify-start backdrop-blur-sm bg-[#454545]/40 flex p-4 w-full rounded-md gap-6 h-full  flex-wrap items-center md:flex-col lg:flex-row'>
					<CarItem>
						<Button variant={'success'}>
						Porch
						</Button>
					</CarItem>
					<CarItem>
					<Button>
						Audi
						</Button>
					</CarItem>
				</div>
		)
}
const CarItem = ({ children }: { children: React.ReactNode }) => {
	return (<div className='flex flex-1 gap-2 '>
		{children}
	</div>)
}
export default CarModels