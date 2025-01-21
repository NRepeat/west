import { useChain, useSpring, useSpringRef } from '@react-spring/core';

type UseWheelFullRotationType = {
    toggle?: boolean;
    isNew?: boolean;
};

const useWheelFullRotation = ({ toggle, isNew }: UseWheelFullRotationType) => {
    const rotationRefApi = useSpringRef();

    const { rotate } = useSpring({
        from: { rotate: 0 },
        to: { rotate: toggle ? -360 : 0 }, // Toggle between rotating and stopping
        loop: toggle ? true : false, // Loop when rotating
        reverse: false,
        config: { duration: 30500 }, // Set rotation duration
        ref: rotationRefApi,
    });
    useChain(toggle ? [rotationRefApi] : [rotationRefApi], [0, 1], toggle ? 1500 : 1000);

    return { rotate };
};

export default useWheelFullRotation;
