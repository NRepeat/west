import clsx from "clsx"
import UiComponentContainer from "./ui-component-container"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb"

const Breadcrumbs = ({ crumbs }: { crumbs: { slug: string, href: string }[] }) => {
	const Crumbs = () => crumbs.map((crumb) => <div key={crumb.slug} className="flex items-center gap-2">
		<BreadcrumbItem key={crumb.slug} className="font-bold">

			{crumbs[crumbs.length - 1].href === crumb.href ? <BreadcrumbPage >{crumb.slug}</BreadcrumbPage> : <BreadcrumbLink className="hover:underline" href={crumb.href}>{crumb.slug}</BreadcrumbLink>}
		</BreadcrumbItem>
		{crumbs[crumbs.length - 1].href !== crumb.href && <BreadcrumbSeparator />}

	</div>)
	return (
		<UiComponentContainer className={clsx('col-span-12 row-start-1 col-start-1 flex justify-start items-center px-5  max-h-12 box-content')}>
			<Breadcrumb>
				<BreadcrumbList>
					{crumbs && <Crumbs />}
				</BreadcrumbList>
			</Breadcrumb>
		</UiComponentContainer>
	)
}

export default Breadcrumbs