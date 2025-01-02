import React, { FC } from 'react'

type ImageWrapperProps = {
	src: string
	alt: string
	imgHeight?: string,
	imgWidth?: string,
	className?: string
}

const ImageWrapper: FC<ImageWrapperProps> = ({ src, alt, className, imgHeight, imgWidth }) => {
	const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = '/placeholder.png'
		event.currentTarget.alt = 'Image not available'
	}

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<img
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
