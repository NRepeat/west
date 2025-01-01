import { FieldValues, FormApi } from "@rvf/react";
import { FC, HTMLAttributes } from "react";
interface RVFormProps extends HTMLAttributes<HTMLFormElement> {
	form: FormApi<FieldValues>
}
const RVForm: FC<RVFormProps> = ({ form, ...props }) => {

	return (
		<form  {...props} {...form.getFormProps()}>
			{props.children}
		</form>
	);
}

export default RVForm 