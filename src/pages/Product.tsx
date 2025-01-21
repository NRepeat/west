import ProductSingleCard from '@/components/ProductSingleCard/ProductSingleCard';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import UiComponentContainer from '@/components/ui/ui-component-container';
import Wrapper from '@/components/ui/wrapper';

const Product = () => {
    // const { slug } = useParams();
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
                    <ProductSingleCard />
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
