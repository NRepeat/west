import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card, CardContent } from '../ui/card';
import ImageWrapper from '../ui/image-wrapper';
import { AudiImg } from '@/assets';
import { ProductT } from '../ui/product-card';
import CharacteristicsCard from '../ui/characteristics-card';
import { NavLink } from 'react-router';
import { useBoxStore } from '@/store/disk-store';
import { FC } from 'react';
import clsx from 'clsx';
import Search from '../ui/search';
import { DiskModel } from '@/context/Configurator';
import { useConfiguratorStore } from '@/store/configurator-store';

type SimilarProductsProps = {
    isVertical:boolean
    withSearch:boolean
    onClick?:(value: string | number,p?:any)=> void
    products:DiskModel[]
}

const SimilarProducts:FC<SimilarProductsProps> = ({isVertical,withSearch,onClick,products}) => {
            const cameraConfig = useConfiguratorStore(state => state.cameraConfig)
    const Cards = () => products.map((product,i) => <SimilarProductsCard product={product} onClick={()=> product.path ?onClick &&  onClick(i,
    cameraConfig.defaultCameraPosition

    ) : onClick && onClick(product.slug)}/>);
    return (
        <div className='flex gap-2 flex-col'>
           {withSearch && <Search label='' isLabelVisible={withSearch}/>} 
           <div className={clsx({"flex flex-wrap gap-2":!isVertical,'grid  grid-cols-2 overflow-auto ':isVertical})}>
            <Cards />
        </div>
        </div>
     
    );
};

export default SimilarProducts;

const SimilarProductsCard = ({ product ,onClick}: { product: ProductT ,onClick?:()=> void}) => {
  
    return (
        <>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <NavLink
                        to={`/product/${product.slug}`}
                        className={'flex-1'}
                        prefetch={'intent'}
                    >
                        <Card
                            onClick={() =>onClick && onClick()}
                            className="  hover:border-input border-2 border-white rounded-sm overflow-hidden p-2.5"
                        >
                            <CardContent className="flex flex-col items-center gap-2.5 ">
                                <ImageWrapper
                                    options={{
                                        delayTime: 100,
                                        effect: 'opacity',
                                        wrapperProps: {
                                            style: { transitionDelay: '100' },
                                        },
                                    }}
                                    src={AudiImg}
                                    alt="img"
                                    imgWidth="200"
                                    className=""
                                />
                                <p className="w-full text-lg text-center">{product.title}</p>
                            </CardContent>
                        </Card>
                    </NavLink>
                </HoverCardTrigger>
                <HoverCardContent className="w-[350px]">
                    <CharacteristicsCard isHorizontal={false} props={product.props} />
                </HoverCardContent>
            </HoverCard>
        </>
    );
};
