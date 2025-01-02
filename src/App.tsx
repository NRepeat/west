import Container from "./components/ui/container"
import Navbar from "./components/ui/navbar"
import Wrapper from "./components/ui/wrapper"
import MainFilterBar from "./components/MainFilterbar/MainFilterbar"
import Breadcrumbs from "./components/ui/breadcrumbs"
import MainStoreGrid from "./components/MainStoreGrid/MainStoreGrid"

function App() {

  return (
    <Container className="font-IstokWebRegular">
      <Navbar />
      <Wrapper >
        <Breadcrumbs crumbs={[{ href: '/', slug: 'Home' }, { href: "/disks", slug: "Disks" }]} />
        <MainFilterBar />
        <MainStoreGrid />
      </Wrapper>
    </Container>
  )
}

export default App
