import { FC } from 'react'
import { FromInput } from './form-input'
import { FieldValues, FormApi, } from '@rvf/react';
import RVForm from './form';
import { SearchIcon } from '../../assets';


interface SearchProps {
	label: string
	isLabelVisible?: boolean
	form: FormApi<FieldValues>,
	type: React.HTMLInputTypeAttribute
}


const Search: FC<SearchProps> = ({ isLabelVisible = false, ...props }) => {

	return (
		<RVForm form={props.form} >
			<FromInput className='h-12  placeholder-italic' scope={props.form.scope(props.type)} label={props.label} islabelvisible={isLabelVisible} icon={SearchIcon} iconSize='25' search placeholder='Search' />
		</RVForm>
	)
}

export default Search