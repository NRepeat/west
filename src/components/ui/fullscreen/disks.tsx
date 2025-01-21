import React from 'react';
import { ProductsCard } from '@/components/ConfiguratorCanva/Sidebar';
import { useBoxStore } from '@/store/disk-store';

const Disks = () => {
    const modles = useBoxStore((state) => state.disks);
    const product = modles.filter((m) => m.path);
    return (
        <div className="grid grid-cols-2 justify-start backdrop-blur-sm bg-[#454545]/40  p-4 w-full rounded-md gap-6 h-full  flex-wrap items-center md:flex-col lg:flex-row max-w-[400px] max-h-[500px] overflow-auto">
            <DiskItem>
                <ProductsCard product={product[0]} index={0} />
            </DiskItem>
            <DiskItem>
                <ProductsCard product={product[1]} index={1} />
            </DiskItem>
            <DiskItem>
                <ProductsCard product={product[1]} index={1} />
            </DiskItem>
            <DiskItem>
                <ProductsCard product={product[1]} index={1} />
            </DiskItem>
            <DiskItem>
                <ProductsCard product={product[1]} index={1} />
            </DiskItem>
        </div>
    );
};
const DiskItem = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-1 gap-2 ">{children}</div>;
};
export default Disks;
