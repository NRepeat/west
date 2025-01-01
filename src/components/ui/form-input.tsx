import {
	useField,
	FormScope,
	ValueOfInputType,
} from "@rvf/react";
import React, {
	ComponentPropsWithRef,
	FC,
	forwardRef,
	useId,
} from "react";
import Icon from "./icon";
import clsx from "clsx";
import Button from "./button";

// For our props, we'll take everything from the native input element except for `type`.
// You can make futher changes here to suite your needs.
type BaseInputProps = Omit<
	ComponentPropsWithRef<"input">,
	"type"
>;

interface MyInputProps<Type extends string>
	extends BaseInputProps {
	label: string;
	islabelvisible: boolean;
	type?: Type;
	scope: FormScope<ValueOfInputType<Type>>;
	icon?: string
	iconSize?: string
	search?: boolean
}


type InputType = <Type extends string>(
	props: MyInputProps<Type>,
) => React.ReactNode;

const InputImpl = forwardRef<
	HTMLInputElement,
	MyInputProps<string>
>(({ className, iconSize, search, islabelvisible, label, scope, type, icon, ...rest }, ref) => {
	const field = useField(scope);
	const inputId = useId();
	const errorId = useId();


	const IconVariant: FC<{ type: 'search' | 'default' }> = ({ type }) => {

		const icons: { [key in 'search' | 'default']: React.ReactNode } = {
			search: <Button className="w-full h-full">
				<Icon src={icon} height={iconSize} width={iconSize} alt="menu-icon" />
			</Button>,
			default: <Icon src={icon} height={iconSize} width={iconSize} alt="menu-icon" />
		};
		return icons[type]
	}
	return (
		<div autoFocus className={clsx(className, "inline-flex w-full relative  ")}>
			{islabelvisible && <label htmlFor={inputId}>{label}</label>}
			<input
				className=" w-full rounded-inputComponentRadius  pr-10 pl-2 focus:ring-1 focus:outline-1 placeholder:text-xl placeholder:text-[#999999]"
				{...field.getInputProps({
					type,
					id: inputId,
					ref,

					"aria-describedby": errorId,
					"aria-invalid": !!field.error(),
					...rest,
				})}
			/>

			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex pr-2">
				<IconVariant type={search ? 'search' : 'default'} />
			</div>

			{field.error() && <p id={errorId}>{field.error()}</p>}
		</div>
	);
});
InputImpl.displayName = "InputImpl";

export const FromInput = InputImpl as InputType;