import { ProductProps } from './product-card';
import { Pallet } from './color-palette';
import clsx from 'clsx';

const CharacteristicsCard = ({
    props,
    isHorizontal,
}: {
    isHorizontal: boolean;
    props: ProductProps;
}) => {
    const keys = Object.keys(props);
    const typedKeys = keys.map((key) => key as keyof typeof props);
    return (
        <>
            {typedKeys.map((key) => (
                <div
                    className={clsx(
                        'flex flex-col text-lg w-full gap-2.5 first-letter:uppercase justify-self-center',
                        { 'justify-center px-2.5': isHorizontal },
                    )}
                >
                    <div key={key} className={clsx('flex ', { 'justify-end': isHorizontal })}>
                        <div className="w-24 flex  items-center font-bold ">
                            <span className="first-letter:uppercase">{key}</span>
                        </div>
                        {key === 'color' && (
                            <div
                                className={clsx(
                                    { 'justify-end w-full text-end': !isHorizontal },
                                    'w-full flex justify-end',
                                )}
                            >
                                {' '}
                                <Pallet className="w-full max-w-[150px]" color={props[key]} />{' '}
                            </div>
                        )}
                        {key !== 'color' && (
                            <div
                                className={clsx('w-full text-end px-12', {
                                    'text-center': !isHorizontal,
                                })}
                            >
                                {' '}
                                {String(props[key])}{' '}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default CharacteristicsCard;
