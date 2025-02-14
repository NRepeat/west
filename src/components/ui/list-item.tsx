import { cn } from "@/lib/utils"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import React from "react"

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<div className="list-none flex border-b-[1px]">
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1  p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</div>
				</a>
			</NavigationMenuLink>
		</div>
	)
})
ListItem.displayName = "ListItem"

export { ListItem }