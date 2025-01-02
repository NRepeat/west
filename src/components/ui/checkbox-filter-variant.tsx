import React, { FC, HTMLAttributes } from 'react'
import { Checkbox } from './checkbox'
import clsx from 'clsx';
import Icon from './icon';

export type FilterVariant = {
	id: string;
	value: string,
	name: string,
	slug: string
	disabled: boolean
	icon?: string,
}
type CheckboxFilterVariant = HTMLAttributes<HTMLDivElement>
const CheckboxFilterVariant: FC<CheckboxFilterVariant & { variant: FilterVariant }> = ({ variant, ...props }) => {
	return (
		<div className='flex items-center'>
			<label
				htmlFor={variant.slug}
				className={clsx("flex items-center space-x-2 w-full justify-between border-[2px] border-backgroundComponentContainer hover:input-border-hover p-2.5", props.className)}
			>

				<div className='flex items-center gap-2'>
					<Checkbox id={variant.slug} disabled={variant.disabled} value={variant.value} />
					<span className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">
						{variant.name}
					</span>
				</div>
				{variant.icon && <Icon className={clsx({ 'opacity-60': variant.disabled })} src={variant.icon} width='40' height='40' />}

			</label>

		</div>
	)
}

export default CheckboxFilterVariant