import ProductSingleCard from '@/components/ProductSingleCard/ProductSingleCard';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import Wrapper from '@/components/ui/wrapper';
import { useParams } from 'react-router';

const Product = () => {
	const { slug } = useParams();
	return (
		<div>
			<div className="p-2.5">
				<Breadcrumbs crumbs={[{ href: '/', slug: 'Home' }, { href: "/disks", slug: "Disks" }]} />
			</div>
			<Wrapper >

				<div className=" col-span-12 row-span-12  relative">
					<ProductSingleCard />
				</div>
			</Wrapper>
		</div>
	)
}

export default Product