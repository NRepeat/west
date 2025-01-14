import useCanvasDashboard from '@/hooks/canvas-dashboard';
import { Button } from '../ui/button';

const Dashboard = () => {
	const { vehicleControl, wheelControl, vehicle, wheels } = useCanvasDashboard();

	return (
		<div>
			<h3>Vehicle</h3>
			<p>Rotation: {vehicle.isRotate ? "On" : "Off"}</p>
			<p>Color: {vehicle.color}</p>
			<Button onClick={() => vehicleControl.handleRotateVehicle(!vehicle.isRotate)}>
				Toggle Vehicle Rotation
			</Button>
			<Button onClick={() => vehicleControl.handleChangeColorVehicle("red")}>
				Change Vehicle Color to Red
			</Button>

			<h3>Wheels</h3>
			<p>Rotation: {wheels.isRotate ? "On" : "Off"}</p>
			<p>Color: {wheels.color}</p>
			<Button onClick={() => wheelControl.handleRotateWheels(!wheels.isRotate)}>
				Toggle Wheels Rotation
			</Button>
			<button onClick={() => wheelControl.handleChangeColorWheels("blue")}>
				Change Wheels Color to Blue
			</button>
		</div>
	);
};

export default Dashboard;
