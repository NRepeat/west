import Form from '@/components/Checkout/Form';
import { useParams } from 'react-router';

const Checkout = () => {
    const { step } = useParams();
    return <Form param={step} />;
};

export default Checkout;
