import React, { FC } from 'react'
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';

type ImageWrapperProps<T> = {
	src: string
	alt: string
	imgHeight?: string,
	imgWidth?: string,
	className?: string
	options: T
}

const ImageWrapper: FC<ImageWrapperProps<LazyLoadImageProps>> = ({ src, alt, className, imgHeight, imgWidth, options }) => {
	const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = '/placeholder.png'
		event.currentTarget.alt = 'Image not available'
	}

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<LazyLoadImage
				{...options}
				src={src}
				alt={alt}
				style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
				loading="lazy"
				onError={handleError}
				className="w-full h-full object-cover "
			/>
		</div>
	)
}

export default ImageWrapper
