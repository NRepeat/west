import ProductSingleCard from '@/components/ProductSingleCard/ProductSingleCard';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import UiComponentContainer from '@/components/ui/ui-component-container';
import Wrapper from '@/components/ui/wrapper';
import { Suspense } from 'react';
import { useParams } from 'react-router';

const Product = () => {
	const { slug } = useParams();
	return (
		<div>
			<div className="p-2.5">
				<Breadcrumbs crumbs={[{ href: '/', slug: 'Home' }, { href: "/disks", slug: "Disks" }]} />
			</div>
			<Wrapper >
				<div className=" col-span-12  row-span-12  relative">
					<ProductSingleCard />
				</div>
				<div className=" col-span-12 row-span-1  relative">
					<UiComponentContainer className='min-h-[210px]'>
						<Suspense fallback={<Loading />}>
							<SimilarProducts />
						</Suspense>
					</UiComponentContainer>
				</div>
			</Wrapper>
		</div>
	)
}
function Loading() {
	return <h2>🌀 Loading...</h2>;
}
export default Product