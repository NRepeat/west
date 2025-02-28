import { FC, HTMLAttributes, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import ImageWrapper from './image-wrapper';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { Button } from './button';
import { X } from 'lucide-react';
import { ProductT } from '@/shared/types';
import CharacteristicsCard from './characteristics-card';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    isHorizontal: boolean;
    isWishCard?: boolean;
}


const ProductCard: FC<ProductCardProps & { product: ProductT }> = ({
    isHorizontal,
    isWishCard,
    product,
    ...props
}) => {
    console.log('product', product)

    const nav = useNavigate();
    const [selectedVariant] = useState(product);
    const handleNav = (slug: string) => {
        nav(`/product/${slug}/var/${selectedVariant.uuid}`);
    };
    return (
        <Card
            {...props}
            onClick={() => handleNav(product.products[0].product.slug)}
            className={clsx(
                'cursor-pointer   rounded-sm  overflow-hidden  hover:shadow-lg  border-white duration-200 p-0',
                {
                    'flex-row flex justify-start items-center w-full sm:col-span-2 md:col-span-2 xl:col-span-12 gap-8':
                        isHorizontal,
                },
            )}
        >
            <CardHeader
                className={clsx('p-2.5 flex flex-col w-full  justify-self-center z-0', {
                    'max-w-[300px]': isHorizontal,
                })}
            >
                <ImageWrapper
                    options={{
                        delayTime: 100,
                        effect: 'opacity',
                        wrapperProps: {
                            style: { transitionDelay: '100' },
                        },
                    }}
                    src={selectedVariant.thumbnail}
                    alt=""
                    className="min-w-full max-w-[300px] justify-center flex items-center z-0 w-full p-2.5"
                    imgHeight="190"
                    imgWidth="230"
                />
                {!isHorizontal && (
                    <CardTitle className="text-lg pt-3.5 w-full text-start ">
                        {product.products[0].product.slug}
                    </CardTitle>
                )}
                {product.products[0].product.description && <CardDescription>{product.products[0].product.description}</CardDescription>}
            </CardHeader>
            <CardContent
                className={clsx('mt-3.5 p-2.5 flex w-full', {
                    'flex-col min-w-12 p-2.5  justify-center items-start ': isHorizontal,
                })}
            >
                <div className={clsx('w-full', { ' max-w-[75%]': isHorizontal })}>
                    {isHorizontal && (
                        <CardTitle className="text-lg pb-2.5 px-2.5">{product.slug}</CardTitle>
                    )}
                    <div
                        className={clsx(
                            'flex flex-col text-lg w-full gap-2.5 first-letter:uppercase justify-self-center',
                            { 'justify-center px-2.5': isHorizontal },
                        )}
                    >
                        <div className={clsx('flex ', { 'justify-end': isHorizontal })}>
                            <div className="w-24 flex  items-center font-bold ">
                                <span className="first-letter:uppercase">  Diameter</span>
                            </div>
                            {(
                                <div
                                    className={clsx(
                                        { 'justify-end w-full text-end': !isHorizontal },
                                        'w-full flex justify-end',
                                    )}
                                >
                                    {/* <Pallet className="w-full max-w-[150px]" color={props[key]} /> */}
                                </div>
                            )}
                            {(
                                <div
                                    className={clsx('w-full text-end px-12', {
                                        'text-center': !isHorizontal,
                                    })}
                                >
                                    {selectedVariant.diameter}
                                </div>
                            )}
                        </div>
                    </div>
                    <CharacteristicsCard isHorizontal={isHorizontal} props={selectedVariant} />
                </div>
            </CardContent>
            {isWishCard && (
                <CardFooter
                    className={clsx(' p-0', { 'h-full': isHorizontal, 'w-full': !isHorizontal })}
                >
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Кнопка нажата');
                        }}
                        className="h-full rounded-none flex  items-center justify-center w-full p-2.5 "
                    >
                        <X />
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default ProductCard;
