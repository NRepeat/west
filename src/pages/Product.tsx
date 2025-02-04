import ProductSingleCard from '@/components/ProductSingleCard/ProductSingleCard';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import UiComponentContainer from '@/components/ui/ui-component-container';
import Wrapper from '@/components/ui/wrapper';
import { ProductT } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const Product = () => {
    const { slug } = useParams();
    const data = useQuery({
        queryKey: ['getProduct', slug],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/product/slug?slug=${slug}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json() as ProductT
            console.log('data', data)
            if (!data) {
                throw new Error('Product not found');
            }
            return data
        }
    })

    return (
        <div className="">
            <div className="p-2.5">
                <Breadcrumbs
                    crumbs={[
                        { href: '/', slug: 'Home' },
                        { href: '/disks', slug: 'Disks' },
                    ]}
                />
            </div>
            <Wrapper>
                <div className=" col-span-12  row-span-8  relative">
                    {data.isSuccess && <ProductSingleCard product={data.data} />}
                </div>
                <div className=" col-span-12 row-span-4  relative">
                    <UiComponentContainer className="min-h-[210px]">
                        <SimilarProducts isVertical={false} />
                    </UiComponentContainer>
                </div>
            </Wrapper>
        </div>
    );
};

export default Product;
