import Container from "./components/ui/container"
import FilterBar from "./components/ui/filter-bar"
import Navbar from "./components/ui/navbar"


function App() {
  return (
    <Container>
      <Navbar></Navbar>

      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <FilterBar className=""/>
      </div>
    </Container>
  )
}

export default App
