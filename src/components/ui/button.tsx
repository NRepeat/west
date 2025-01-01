import React, { ButtonHTMLAttributes, FC } from 'react'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode

}

const Button: FC<ButtonProps> = (props) => {
	return (
		<button type={props.type} {...props} className={`w-fit inline-flex items-center justify-center ${props.className}`}>
			{props.children}
		</button>
	)
}

export default Button