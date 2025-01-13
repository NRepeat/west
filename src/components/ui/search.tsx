import { FC } from 'react'
import { FromInput } from './form-input'
import { useForm } from '@rvf/react'
import RVForm from './form'
import { SearchIcon } from '../../assets'
import { withZod } from '@rvf/zod'
import { z } from 'zod'

interface SearchProps {
  label: string
  isLabelVisible?: boolean
  // form: FormApi<FieldValues>,
  // type: React.HTMLInputTypeAttribute
}

const Search: FC<SearchProps> = ({ isLabelVisible = false, ...props }) => {
  const validator = withZod(
    z.object({
      value: z.string().min(1),
    }),
  )
  const form = useForm({
    validator,
  })
  return (
    <RVForm form={form}>
      <div className='px-2.5 focus:outline-none'>
        <FromInput
          className='focus-visible:outline-none'
          scope={form.scope('value')}
          label={props.label}
          islabelvisible={isLabelVisible}
          icon={SearchIcon}
          iconSize='25'
          search
          placeholder='Search'
          name='search'
        />
      </div>
    </RVForm>
  )
}

export default Search
