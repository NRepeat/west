import Container from "./components/ui/container"
import Navbar from "./components/ui/navbar"
import Wrapper from "./components/ui/wrapper"

import UiComponentContainer from "./components/ui/ui-component-container"
import clsx from "clsx"
import MainFilterBar from "./components/MainFilterbar/MainFilterbar"

function App() {

  return (
    <Container className="font-IstokWebRegular ">
      <Navbar />
      <Wrapper >
        <UiComponentContainer className={clsx('col-start-1 row-start-1 col-span-2  max-h-12')}> asd</UiComponentContainer>
        <MainFilterBar />
      </Wrapper>
    </Container>
  )
}

export default App
