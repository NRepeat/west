import MainFilterBar from "@/components/MainFilterbar/MainFilterbar"
import MainStoreGrid from "@/components/MainStoreGrid/MainStoreGrid"
import Breadcrumbs from "@/components/ui/breadcrumbs"
import UiComponentContainer from "@/components/ui/ui-component-container"
import Wrapper from "@/components/ui/wrapper"


const Wishlist = () => {
	return (
		<div className="">
			<div className="p-2.5">
				<Breadcrumbs
					crumbs={[
						{ href: '/', slug: 'Home' },
						{ href: '/wish', slug: 'Wishlist' },
					]}
				/>
			</div>
			<Wrapper>
				<div className=" col-span-9 row-span-12  relative">
					<MainStoreGrid isWishCard />
				</div>
				<div className=" col-span-3  row-span-12 relative">
					<MainFilterBar />
				</div>

			</Wrapper>
		</div>
	)
}

export default Wishlist