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
		<div className={clsx("flex items-center space-x-2 w-full justify-between border-[2px] border-backgroundComponentContainer hover:input-border-hover p-2.5", props.className)}>
			<div className='flex items-center gap-2'>
				{variant.icon && <Icon src={variant.icon} width='40' height='40' />}
				<label
					htmlFor={variant.id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{variant.name}
				</label>
			</div>

			<Checkbox id={variant.id} disabled={variant.disabled} value={variant.value} />

		</div>
	)
}

export default CheckboxFilterVariant