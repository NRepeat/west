import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './Thumb'

// type SlideType<T> = {
// 	slide: T
// }

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  setPointerDown: (isDown: boolean) => void
}

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides, options, setPointerDown } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    loop: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )
  const setPointer = useCallback(
    (value: boolean) => {
      setPointerDown(value)
    },
    [setPointerDown],
  )
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    emblaMainApi.on('pointerDown', () => setPointer(true))
    emblaMainApi.on('pointerUp', () => setPointer(false))
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect, setPointer])

  return (
    <div className='embla w-full h-full flex flex-col justify-between'>
      <div
        className='embla__viewport flex items-center h-full'
        ref={emblaMainRef}
      >
        <div className='embla__container'>
          {slides.map((slide, index) => (
            <div className='embla__slide ' key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className='embla-thumbs flex items-center w-full justify-center'>
        <div className='embla-thumbs__viewport ' ref={emblaThumbsRef}>
          <div className='embla-thumbs__container '>
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                slide={slide}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
