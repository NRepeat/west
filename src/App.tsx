import Container from "./components/ui/container"
import Navbar from "./components/ui/navbar"
import Wrapper from "./components/ui/wrapper"
import MainFilterBar from "./components/MainFilterbar/MainFilterbar"
import Breadcrumbs from "./components/ui/breadcrumbs"
import MainStoreGrid from "./components/MainStoreGrid/MainStoreGrid"
import Footer from "./components/ui/footer"

function App() {

  return (

    <div>
      <Container className="font-IstokWebRegular">
        <Navbar />
        <div className="p-2.5">
          <Breadcrumbs crumbs={[{ href: '/', slug: 'Home' }, { href: "/disks", slug: "Disks" }]} />
        </div>
        <Wrapper >
          <div className=" col-span-3  row-span-12 relative">
            <MainFilterBar />
          </div>
          <div className=" col-span-9 row-span-12  relative">
            <MainStoreGrid />
          </div>
        </Wrapper>
      </Container>
      <Footer />
    </div>
  )
}

export default App
