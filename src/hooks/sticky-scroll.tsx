import { useEffect } from 'react';

const useStickyScroll = ({ option, setScrolled }: { option: { scrollStart: number }, setScrolled: (value: boolean) => void }) => {

    useEffect(() => {
        window.onscroll = function () {
            if (window.scrollY > option.scrollStart) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
    }, [option.scrollStart, setScrolled]);

};

export default useStickyScroll;
