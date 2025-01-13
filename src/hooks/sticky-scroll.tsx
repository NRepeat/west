import { useEffect, useState } from 'react'

const useStickyScroll = ({ option }: { option: { scrollStart: number } }): [boolean] => {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		window.onscroll = function () {
			if (window.scrollY > option.scrollStart) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
	}, [option]);
	return [scrolled]
}

export default useStickyScroll