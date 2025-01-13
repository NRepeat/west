import React, { FC } from 'react'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import clsx from 'clsx'
type SHEET_SIDES = "top" | "right" | "bottom" | "left"

type MenuProps = {
	trigger: React.ReactNode
	header: React.ReactNode
	children: React.ReactNode
	footer?: React.ReactNode
	side: SHEET_SIDES
	className?: string
}
const SheetMenu: FC<MenuProps> = ({ trigger, header, children, footer, side, className }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{trigger}
			</SheetTrigger>
			<SheetContent side={side} className={clsx(className)}>
				<SheetHeader>
					<SheetTitle className='w-full flex justify-center text-2xl'>{header}</SheetTitle>
				</SheetHeader>
				<div className='w-full flex flex-col gap-2 pt-5 '>
					{children}
				</div>
				<SheetFooter className='w-full pt-5'>
					<SheetClose asChild>
						{footer}
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default SheetMenu