import CarModelPickerBar from '@/components/CarModelPickerBar/CarModelPickerBar'
import ConfiguratorCanvas, { TierButtonsProps } from '@/components/ConfiguratorCanva/ConfiguratorCanva'
import Dashboard from '@/components/ConfiguratorCanva/Dashboard'
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import UiComponentContainer from '@/components/ui/ui-component-container'
import Wrapper from '@/components/ui/wrapper'
import { useConfiguratorStore } from '@/store/configurator-store'
import { useBoxStore } from '@/store/disk-store'
import { Vector3 } from 'three'

const Configurator = () => {
		const setSelectedIndex = useConfiguratorStore(state => state.setSelectedIndex)
		const cameraConfig = useConfiguratorStore(state => state.cameraConfig)
const handleChangePosition = ({ position, defaultAnimation }: TierButtonsProps) => {
		cameraConfig.setCameraPosition(new Vector3(...position))
		cameraConfig.setIsDefaultAnimation(defaultAnimation)
	}
	const handleClick = (index: number, position: Vector3) => {
		handleChangePosition({ defaultAnimation: false, position })
		setSelectedIndex(index)
	}
	const modles = useBoxStore(state => state.disks)
 const product = modles.filter(m => m.path)
	return (
		<div >
			<div className="p-2.5">
				<Breadcrumbs
					crumbs={[
						{ href: '/', slug: 'Home' },
						{ href: '/configuration', slug: 'Сonfiguration' },
					]}
				/>
			</div>
			<Wrapper>
				<div className=" col-span-12  row-span-1 relative">
					<CarModelPickerBar />
				</div>
				<div className=" col-span-8 row-span-6 relative">
					<UiComponentContainer className=" bg-[#1D1D1D] max-h-[500px] overflow-hidden h-full">
						<ConfiguratorCanvas />
					</UiComponentContainer>
				</div>
				<div className=" col-span-4  row-span-6  relative  ">
					<UiComponentContainer className=" overflow-auto max-h-[500px]">
					<SimilarProducts isVertical withSearch onClick={()=>handleClick} products={product}/>
					</UiComponentContainer>
				</div>
				<div className=" col-span-12 row-span-4    relative">
				<UiComponentContainer className="bg-[#1D1D1D] overflow-hidden ">
					<Dashboard />
				</UiComponentContainer>
				</div>
			</Wrapper>
		</div>
	)
}

export default Configurator