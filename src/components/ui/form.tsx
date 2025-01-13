import { FormApi } from '@rvf/react'
import { FC, HTMLAttributes } from 'react'
interface RVFormProps extends HTMLAttributes<HTMLFormElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormApi<any>
}
const RVForm: FC<RVFormProps> = ({ form, ...props }) => {
  return (
    <form {...props} {...form.getFormProps()}>
      {props.children}
    </form>
  )
}

export default RVForm
