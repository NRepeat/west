import useCanvasDashboard from '@/hooks/canvas-dashboard';
import { Button } from '../ui/button';
import { FC } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import clsx from 'clsx';
import { RotateCwIcon, SprayCanIcon, SunIcon, TreesIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Dashboard = () => {
	const { vehicleControl, wheelControl, vehicle, wheels } = useCanvasDashboard();

	return (
		<div className='flex h-full w-full gap-2.5 flex-wrap items-center justify-center'>
			<DashboardCard title="Vehicle" className='flex-1'>
				<DashboardButton onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)} type='rotate' active={vehicle.isRotate} />
				<DashboardButton onClick={() => vehicleControl.handleChangeColorVehicle("red")} type='pallet' active={vehicle.color !== vehicle.defaultColor} />
			</DashboardCard>
			<DashboardCard title="Wheels" className='flex-1'>
				<DashboardButton onClick={() => wheelControl.handleRotateWheels(!wheels.isRotate)} type='rotate' active={wheels.isRotate} />
				<Popover>
					<PopoverTrigger>
						<DashboardButton onClick={() => { }} type='pallet' active={wheels.color !== wheels.defaultColor} /></PopoverTrigger>
					<PopoverContent>Place content for the popover here.</PopoverContent>
				</Popover>

			</DashboardCard>
			<DashboardCard title="Environment" className='flex-1'>
				<DashboardButton onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)} type='rotate' active={vehicle.isRotate} />
				<DashboardButton onClick={() => vehicleControl.handleChangeColorVehicle("red")} type='pallet' active={vehicle.color !== vehicle.defaultColor} />
				<DashboardButton onClick={() => vehicleControl.handleChangeColorVehicle("red")} type='light' active={vehicle.color !== vehicle.defaultColor} />
			</DashboardCard>
			<DashboardCard title="Light" className='flex-1 '>
				<DashboardButton onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)} type='rotate' active={vehicle.isRotate} />
				<DashboardButton onClick={() => vehicleControl.handleChangeColorVehicle("red")} type='pallet' active={vehicle.color !== vehicle.defaultColor} />
				<DashboardButton onClick={() => vehicleControl.handleChangeColorVehicle("red")} type='light' active={vehicle.color !== vehicle.defaultColor} />
			</DashboardCard>
		</div>
	);
};

type DashboardCardProps = {
	children: React.ReactNode
	title: string
	className?: string
}
const DashboardCard: FC<DashboardCardProps> = ({ title, children, className }) => {
	return <Card className={clsx(className, 'flex flex-col gap-2.5 bg-[#454545] p-2.5 rounded-sm h-full')}>
		<CardTitle className='text-center w-full text-white text-2xl'>
			{title}
		</CardTitle>
		<Separator className='bg-[#5A5A5A]' />
		<CardContent className='flex gap-2.5 p-4'>
			{children}
		</CardContent>
	</Card>
}
type DashboardButtonType = 'rotate' | 'pallet' | 'light' | "environment"
export const DashboardButton: FC<{ onClick: () => void, type: DashboardButtonType, active: boolean }> = ({ onClick, type, active }) => {

	const getIcon = (type: DashboardButtonType) => {
		const icons = {
			rotate: <RotateCwIcon />,
			pallet: <SprayCanIcon />,
			light: <SunIcon />,
			environment: <TreesIcon />
		}
		return icons[type]
	}

	return <Button onClick={onClick} variant={'default'} className={clsx('border-[#99A3A3] border-2 p-6 h-14 ', { 'border-[#26A142]': active })}>
		{getIcon(type)}
	</Button>
}
export default Dashboard;
