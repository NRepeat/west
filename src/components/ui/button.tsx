import React, { FC, HtmlHTMLAttributes } from 'react'


interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode

}

const Button: FC<ButtonProps> = (props) => {
	return (
		<button {...props} className={`w-fit inline-flex items-center justify-center ${props.className}`}>
			{props.children}
		</button>
	)
}

export default Button