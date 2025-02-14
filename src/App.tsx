import Wrapper from './components/ui/wrapper';
import MainFilterBar from './components/MainFilterbar/MainFilterbar';
import Breadcrumbs from './components/ui/breadcrumbs';
import MainStoreGrid from './components/MainStoreGrid/MainStoreGrid';

function App() {


    return (
        <div className='flex flex-col pt-1 '>
            <Breadcrumbs
                crumbs={[
                    { href: '/', slug: 'Home' },
                    { href: '/disks', slug: 'Disks' },
                ]}
            />
            <Wrapper className='bg-white w-full'>
                <MainFilterBar />
                <MainStoreGrid />
            </Wrapper>
        </div>
    );
}

export default App;
