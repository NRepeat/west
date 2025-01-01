import { FC } from 'react'
import {
	Card,
	CardContent,

} from "./card"
import Icon from './icon'
import { InfoIcon } from '@/assets'

type Color = { code: string, slug: string, name: string }

interface ColorPaletteProps {
	colors: Color[]
}
const Palet = ({ color }: { color: Color }) => {
	console.log('color', color)
	return <div className='flex flex-col gap-2.5 border-[2px] border-backgroundComponentContainer hover:input-border-hover p-2.5'>
		<div style={{ backgroundColor: "#" + color.code }} className='min-w-12 min-h-10 rounded-lg'></div>
		<div className='inline-flex  items-center justify-between w-full'>
			<span className='text-lg'>{color.name ? color.name : color.slug.toUpperCase()}</span>
			<Icon src={InfoIcon} width='25' height='25' />
		</div>
	</div>
}
const ColorPalette: FC<ColorPaletteProps> = ({ colors }) => {
	const Palets = colors.map(color => <Palet key={color.code} color={color} />)
	return (
		<Card>
			<CardContent className='grid grid-cols-2 gap-4'>
				{colors && Palets}
			</CardContent>
		</Card>
	)
}




export default ColorPalette