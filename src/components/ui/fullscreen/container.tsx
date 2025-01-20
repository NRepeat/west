import React, { FC } from 'react'


type ContainerProps = {

} & React.HTMLAttributes<HTMLDivElement>

const Container: FC<ContainerProps> = () => {
	return (
		<div>Container</div>
	)
}

export default Container