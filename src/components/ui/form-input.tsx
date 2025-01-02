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
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";

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
	handleChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


type InputType = <Type extends string>(
	props: MyInputProps<Type>,
) => React.ReactNode;

const InputImpl = forwardRef<
	HTMLInputElement,
	MyInputProps<string>
>(({ handleChangeValue, className, iconSize, search, islabelvisible, label, scope, type, icon, ...rest }, ref) => {
	const field = useField(scope);
	const inputId = useId();
	const errorId = useId();


	const IconVariant: FC<{ type: 'search' | 'default' }> = ({ type }) => {

		const icons: { [key in 'search' | 'default']: React.ReactNode } = {
			search: <Button variant={'ghost'} className="w-full h-full">
				<Icon src={icon} height={iconSize} width={iconSize} alt="field-icon" />
			</Button>,
			default: <Icon src={icon} height={iconSize} width={iconSize} alt="field-icon" />
		};
		return icons[type]
	}
	return (
		<div autoFocus className={clsx(className, "inline-flex flex-col w-full relative  focus:outline-none focus-visible:outline-none gap-1")}>
			{islabelvisible && <Label className="text-lg" htmlFor={inputId}>{label}</Label>}

			<Input className={clsx("bg-backgroundContainer text-2xl w-full px-2.5 placeholder:text-lg  focus:outline-none focus-visible:outline-none   placeholder:text-[#999999] border-0", { "pr-8": search })}
				{...field.getInputProps({
					type,
					id: inputId,
					ref,
					onChange: (e) => handleChangeValue && handleChangeValue(e),
					"aria-describedby": errorId,
					"aria-invalid": !!field.error(),
					...rest,
				})} />
			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex pr-1">
				{icon && <IconVariant type={search ? 'search' : 'default'} />}
			</div>

			{!search && field.error() && <p id={errorId}>{field.error()}</p>}
		</div>
	);
});
InputImpl.displayName = "InputImpl";

export const FromInput = InputImpl as InputType;