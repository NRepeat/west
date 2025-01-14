import CarModelPickerBar from '@/components/CarModelPickerBar/CarModelPickerBar'
import ConfiguratorCanvas from '@/components/ConfiguratorCanva/ConfiguratorCanva'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import UiComponentContainer from '@/components/ui/ui-component-container'
import Wrapper from '@/components/ui/wrapper'

const Configurator = () => {
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
				<div className=" col-span-12  row-span-1  relative">
					<CarModelPickerBar />
				</div>
				<div className=" col-span-12 row-span-11  relative">
					<UiComponentContainer className="min-h-[210px] h-full">
						<ConfiguratorCanvas />
					</UiComponentContainer>
				</div>
			</Wrapper>
		</div>
	)
}

export default Configurator