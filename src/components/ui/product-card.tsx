import { FC, HTMLAttributes } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import ImageWrapper from './image-wrapper'
import { AudiImg } from '@/assets'
import { Color } from './color-palette'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import CharacteristicsCard from './characteristics-card'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  isHorizontal: boolean
}
export type ProductProps = {
  color: Color
  width: string
  weight: string
  diameter: string
  et: string
  pcd: string
}
export type ProductT = {
  title: string
  description?: string
  slug: string
  price?: number
  props: ProductProps
}
const ProductCard: FC<ProductCardProps & { product: ProductT }> = ({
  isHorizontal,
  product,
  ...props
}) => {
  const nav = useNavigate()
  const handleNav = (slug: string) => {
    nav(`/product/${slug}`)
  }
  return (
    <Card
      {...props}
      onClick={() => handleNav(product.slug)}
      className={clsx(
        'p-4  sm:col-span-12 md:col-span-6 xl:col-span-4 rounded-sm   hover:border-input hover:border-2 border-2 border-white duration-200',
        {
          'flex-row flex justify-start items-center w-full sm:col-span-12 md:col-span-12 xl:col-span-12 gap-8':
            isHorizontal,
        },
      )}
    >
      <CardHeader
        className={clsx('p-0 flex flex-col w-full  justify-self-center', {
          'max-w-[300px]': isHorizontal,
        })}
      >
        <ImageWrapper
          options={{
            delayTime: 100,
            effect: 'opacity',
            wrapperProps: {
              style: { transitionDelay: '100' },
            },
          }}
          src={AudiImg}
          alt='audi'
          className='min-w-full max-w-[300px] justify-center flex items-center w-full'
          imgHeight='190'
          imgWidth='230'
        />
        {!isHorizontal && (
          <CardTitle className='text-lg pt-3.5 w-full text-start'>
            {product.title}
          </CardTitle>
        )}
        {product.description && (
          <CardDescription>{product.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent
        className={clsx('mt-3.5 flex w-full', {
          'flex-col min-w-12  justify-center items-start ': isHorizontal,
        })}
      >
        <div className={clsx('w-full', { ' max-w-[75%]': isHorizontal })}>
          {isHorizontal && (
            <CardTitle className='text-lg pb-2.5 px-2.5'>
              {product.title}
            </CardTitle>
          )}

          <CharacteristicsCard
            isHorizontal={isHorizontal}
            props={product.props}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
