import { withZod } from "@rvf/zod"
import Container from "./components/ui/container"
import FilterBar from "./components/ui/filter-bar"
import Navbar from "./components/ui/navbar"
import Search from "./components/ui/search"
import Wrapper from "./components/ui/wrapper"
import { z } from "zod";
import { useForm } from "@rvf/react"

function App() {
  const validator = withZod(
    z.object({
      name: z.string().min(1),
      email: z.string().email().min(1),
    }),
  )
  const form = useForm({
    validator,
  });
  return (
    <Container>
      <Navbar />
      <Wrapper >
        <FilterBar className="col-start-1 row-start-2">
          <Search form={form} label="search" type="text" />
        </FilterBar>
      </Wrapper>
    </Container>
  )
}

export default App
