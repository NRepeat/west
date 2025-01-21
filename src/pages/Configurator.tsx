import CarModelPickerBar from '@/components/CarModelPickerBar/CarModelPickerBar';
import ConfiguratorCanvas from '@/components/ConfiguratorCanva/ConfiguratorCanva';
import Dashboard from '@/components/ConfiguratorCanva/Dashboard';
import Sidebar from '@/components/ConfiguratorCanva/Sidebar';
import ProductSingleCard from '@/components/ProductSingleCard/ProductSingleCard';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import UiComponentContainer from '@/components/ui/ui-component-container';
import Wrapper from '@/components/ui/wrapper';
import { useBoxStore } from '@/store/disk-store';

const Configurator = () => {
    const modles = useBoxStore((state) => state.disks);
    const product = modles.filter((m) => m.path);
    console.log('product', product);
    return (
        <div>
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
                <div className=" col-span-8 row-span-9 relative">
                    <UiComponentContainer className=" bg-[#1D1D1D]  overflow-hidden h-full">
                        <ConfiguratorCanvas />
                    </UiComponentContainer>
                </div>
                <div className=" col-span-4  row-span-9  relative  ">
                    <UiComponentContainer className=" overflow-auto h-full">
                        <UiComponentContainer className=" overflow-auto  ">
                            <Sidebar products={product} />
                        </UiComponentContainer>
                    </UiComponentContainer>
                </div>
                <div className=" col-span-8 row-span-4    relative">
                    <UiComponentContainer className="bg-[#1D1D1D] overflow-hidden h-full">
                        <Dashboard />
                    </UiComponentContainer>
                </div>
                <div className=" col-span-12     relative">
                    <UiComponentContainer className=" overflow-hidden h-full">
                        <ProductSingleCard></ProductSingleCard>
                    </UiComponentContainer>
                </div>
            </Wrapper>
        </div>
    );
};

export default Configurator;
