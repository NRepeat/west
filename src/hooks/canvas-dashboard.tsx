import useDashboardControlStore from '@/store/daschboard-control';

const useCanvasDashboard = () => {
    const {
        vehicle,
        wheels,
        setVehicleRotation,
        setVehicleColor,
        setWheelsRotation,
        setWheelsColor,
        setWheelsChange,
    } = useDashboardControlStore();
    const handleChangeWheels = (isRotate: boolean) => {
        setWheelsChange(isRotate);
    };
    const handleChangeColorWheels = (color: string) => {
        setWheelsColor(color);
    };

    const handleRotateWheels = (isRotate: boolean) => {
        setWheelsRotation(isRotate);
    };

    const handleRotateVehicle = (isRotate: boolean) => {
        setVehicleRotation(isRotate);
    };

    const handleChangeColorVehicle = (color: string) => {
        setVehicleColor(color);
    };

    const vehicleControl = { handleRotateVehicle, handleChangeColorVehicle };
    const wheelControl = { handleRotateWheels, handleChangeColorWheels, handleChangeWheels };

    return { vehicleControl, wheelControl, vehicle, wheels };
};

export default useCanvasDashboard;
