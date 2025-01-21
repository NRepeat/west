import { Car, WheelCar } from '@/assets';
import { DashboardButton } from '@/components/ConfiguratorCanva/Dashboard';
import useCanvasDashboard from '@/hooks/canvas-dashboard';
import React from 'react';
import Icon from '../icon';
import { Separator } from '../separator';
import { SunIcon, TreesIcon } from 'lucide-react';

const Controls = () => {
    const { vehicleControl, wheelControl, vehicle, wheels } = useCanvasDashboard();
    return (
        <div className=" flex-col justify-start backdrop-blur-sm bg-[#454545]/40 flex p-4 w-full rounded-md gap-6 h-full  flex-wrap items-center md:flex-col lg:flex-row">
            <ControlsItem>
                <Icon src={Car} className="min-h-12 min-w-12 mr-2" />
                <DashboardButton
                    onClick={() => vehicleControl.handleChangeColorVehicle('red')}
                    type="pallet"
                    active={vehicle.color !== vehicle.defaultColor}
                />
                <DashboardButton
                    onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)}
                    type="rotate"
                    active={vehicle.isRotate}
                />
            </ControlsItem>
            {/* <Separator orientation="vertical" className='min-h-[55px]' /> */}
            <ControlsItem>
                <Icon src={WheelCar} className="min-h-12 min-w-12 mr-2" />
                <DashboardButton
                    onClick={() => wheelControl.handleChangeColorWheels('red')}
                    type="pallet"
                    active={wheels.color !== vehicle.defaultColor}
                />
                <DashboardButton
                    onClick={() => wheelControl.handleRotateWheels(!wheels.isRotate)}
                    type="rotate"
                    active={wheels.isRotate}
                />
            </ControlsItem>
            {/* <Separator orientation="vertical" className='min-h-[55px]' /> */}
            <ControlsItem>
                <TreesIcon className="min-h-12 min-w-12 mr-2" />
                <DashboardButton
                    onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)}
                    type="rotate"
                    active={vehicle.isRotate}
                />
                <DashboardButton
                    onClick={() => vehicleControl.handleChangeColorVehicle('red')}
                    type="pallet"
                    active={vehicle.color !== vehicle.defaultColor}
                />
                <DashboardButton
                    onClick={() => vehicleControl.handleChangeColorVehicle('red')}
                    type="light"
                    active={vehicle.color !== vehicle.defaultColor}
                />
            </ControlsItem>
            {/* <Separator orientation="vertical" className='min-h-[55px]' /> */}
            <ControlsItem>
                <SunIcon className="h-12 w-12 mr-2" />
                <DashboardButton
                    onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)}
                    type="rotate"
                    active={vehicle.isRotate}
                />
                <DashboardButton
                    onClick={() => vehicleControl.handleChangeColorVehicle('red')}
                    type="pallet"
                    active={vehicle.color !== vehicle.defaultColor}
                />
                <DashboardButton
                    onClick={() => vehicleControl.handleChangeColorVehicle('red')}
                    type="light"
                    active={vehicle.color !== vehicle.defaultColor}
                />
            </ControlsItem>
        </div>
    );
};
const ControlsItem = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-1 gap-2 ">{children}</div>;
};
export default Controls;
