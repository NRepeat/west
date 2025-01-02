import { CloseIcon } from "@/assets"
import { Button } from "./button"
import Icon from "./icon"
import { CarouselItem } from "./carousel"
import clsx from "clsx"

const ActiveFilterButton = ({ slug, isCarousel }: { slug: string, isCarousel: boolean }) => {
	return (
		<CarouselItem className={clsx({ "basis-1/3": isCarousel }, " basis-[20%] pl-1")}>
			<Button variant={'ghost'} className="capitalize rounded-sm items-center flex gap-4 hover:input-border-hover border-[2px] border-white px-2.5 py-2 ">
				<span className="text-[1rem]">
					{slug}
				</span>
				<Icon src={CloseIcon} width="15" height="14" />
			</Button>
		</CarouselItem>

	)
}

export default ActiveFilterButton