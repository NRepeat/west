import { Bitcoin, DepthEffect, Paypal } from '@/assets';
import UiComponentContainer from '../ui/ui-component-container';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '../ui/carousel/withchildren/Carousel';
import CharacteristicsCard from '../ui/characteristics-card';
import Icon from '../ui/icon';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Button } from '../ui/button';
import { lazy, startTransition, Suspense, useState } from 'react';
import clsx from 'clsx';
import DLoader from '../ui/skeletons/3d';
import ImageWrapper from '../ui/image-wrapper';
import { useNavigate } from 'react-router';
import { useSessionStore } from '@/store/user-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductT } from '@/shared/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const DView = lazy(() => import('../DView/DView'));
const ProductSingleCard = ({ product }: { product: ProductT }) => {

    const state = useSessionStore((state) => state);
    const [isPointerDown, setPointerDown] = useState<boolean>(false);
    const [isComponentVisible, setComponentVisible] = useState(false);
    const OPTIONS: EmblaOptionsType = { loop: true };
    const SLIDE_COUNT = product.images.length;
    const nav = useNavigate();
    const setCart = useSessionStore((state) => state.setCart);
    const addProductToCart = async () => {
        const response = await fetch('http://localhost:3000/cart/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartId: state.userSession?.cartId,
                productId: product.uuid,
                quantity: 1,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCart({ id: data.id, items: data.items });
        return data
    }
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addProductToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCart'] })
        },
    });

    const handelAddToCart = async () => {
        await mutation.mutateAsync();
    };
    const SLIDES = Array.from(
        Array(SLIDE_COUNT).fill(
            <div className="flex w-full justify-center items-center">
                <ImageWrapper
                    src={product.variants[0].thumbnail}
                    alt=""
                    options={{
                        delayTime: 100,
                        effect: 'opacity',
                        wrapperProps: {
                            style: { transitionDelay: '100' },
                        },
                    }}
                />
            </div>,
        ),
    );

    const handleShowComponent = () => {
        startTransition(() => {
            setComponentVisible((prev) => !prev);
        });
    };
    const handelBuy = () => {
        nav('/checkout');
    };

    return (
        <UiComponentContainer className={clsx('min-h-s', { 'select-none': isPointerDown })}>
            <div className="grid gap-4 grid-cols-12 grid-row-6 p-2.5">
                <div className="col-span-4 relative max-w-[650px] rounded-md overflow-hidden">
                    {
                        <Button
                            onClick={() => handleShowComponent()}
                            variant={'link'}
                            className="absolute right-0 p-0 z-50"
                        >
                            <Icon src={DepthEffect} width="40" height="40" />
                        </Button>
                    }
                    {isComponentVisible ? (
                        <Suspense fallback={<DLoader height={400} width={200} isResponsive />}>
                            <DView setPointerDown={setPointerDown} />
                        </Suspense>
                    ) : (
                        <LazyLoadComponent
                            onLoad={() => handleShowComponent()}
                            placeholder={<DLoader height={400} width={200} isResponsive />}
                        >
                            <EmblaCarousel
                                slides={SLIDES}
                                options={OPTIONS}
                                setPointerDown={setPointerDown}
                            />
                        </LazyLoadComponent>
                    )}
                </div>
                <div className="col-start-5 col-span-4 grid-flow-col min-w-[300px]">
                    <h2 className="font-bold text-2xl">{product.title}</h2>
                    <div className="pt-4 text-lg">
                        {product.description}
                    </div>
                </div>

                <div className="flex flex-col gap-10 col-start-9 col-span-4">
                    <h3 className="font-bold text-2xl">Characteristics</h3>
                    <div className="flex flex-col gap-2">
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList>
                                {product.variants.map((variant) => ((<TabsTrigger key={variant.uuid} value={variant.uuid}>{variant.diameter}</TabsTrigger>)))}
                            </TabsList>
                            {product.variants.map((variant) => (
                                <TabsContent key={variant.uuid} value={variant.uuid}>
                                    <CharacteristicsCard isHorizontal props={product} />
                                </TabsContent>
                            ))}
                        </Tabs>

                    </div>
                    <div className="inline-flex items-center p-2.5  justify-between w-full px-2.5">
                        <p className="font-bold text-2xl flex items-center h-full">{product.price}</p>
                        <div className="flex gap-1">
                            <Button variant={'link'} className="p-0">
                                <Icon src={Paypal} width="40" height="40" />
                            </Button>
                            <Button variant={'link'} className="p-0">
                                <Icon src={Bitcoin} width="40" height="40" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2 rounded-sm">
                        <Button variant={'ghost'} onClick={handelAddToCart} className="text-xl font-bold h-[50px]">
                            Add to cart
                        </Button>
                        <Button
                            onClick={handelBuy}
                            variant={'success'}
                            className="text-xl font-bold h-[50px]"
                        >
                            Buy
                        </Button>
                    </div>
                </div>
            </div>
        </UiComponentContainer>
    );
};

export default ProductSingleCard;
