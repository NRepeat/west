import { CloseIcon } from '@/assets'
import ActiveFilterButton from '../ui/active-filter-button'
import Icon from '../ui/icon'
import { Carousel, CarouselApi, CarouselContent } from '../ui/carousel'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Button } from '../ui/button'
const FilterActiveBar = ({
  activeFilters,
}: {
  activeFilters: { slug: string }[]
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [carousel, setCarousel] = useState<boolean>(true)
  const ActiveButtons = () =>
    activeFilters.map(filter => (
      <ActiveFilterButton
        key={filter.slug}
        slug={filter.slug}
        isCarousel={true}
      />
    ))

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // useEffect(() => {
  // 	console.log('carousel', carousel)

  // 	if (!api) return
  // 	if (windowWidth < 900) {
  // 		console.log('carousel', carousel)

  // 		api.reInit({ active: true })
  // 		setCarousel(true)
  // 	} else if (windowWidth >= 910) {
  // 		api.reInit({ active: false })
  // 		setCarousel(false)
  // 	}
  // }, [])
  useEffect(() => {
    if (!api) return
    console.log('carousel', carousel)
    console.log('windowWidth', windowWidth)

    if (windowWidth < 900 && !carousel) {
      console.log('carousel', carousel)
      api.reInit({ active: true })
      setCarousel(true)
    } else if (carousel && windowWidth >= 910) {
      console.log('carousel', carousel)

      api.reInit({ active: false })
      setCarousel(false)
    }
  }, [windowWidth, api, carousel])

  return (
    <div className='flex justify-between items-center w-full gap-2   px-2.5 '>
      <div className='flex items-center gap-2 w-full'>
        <Carousel setApi={setApi} className={clsx({ 'w-full': carousel })}>
          <CarouselContent className=' w-full px-1 gap-2'>
            <ActiveButtons />
          </CarouselContent>
        </Carousel>
      </div>
      <Button variant={'ghost'} className='flex items-center p-1'>
        <Icon className='min-w-[25px]' src={CloseIcon} width='25' height='25' />
      </Button>
    </div>
  )
}

export default FilterActiveBar
