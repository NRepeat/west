import { withZod } from "@rvf/zod"
import Container from "./components/ui/container"
import FilterBar from "./components/ui/filter-bar"
import Navbar from "./components/ui/navbar"
import Search from "./components/ui/search"
import Wrapper from "./components/ui/wrapper"
import { z } from "zod";
import { useForm } from "@rvf/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import ColorPalette from "./components/ui/color-palette"
import UiComponentContainer from "./components/ui/ui-component-container"
import clsx from "clsx"

function App() {
  const validator = withZod(
    z.object({
      value: z.string().min(1),
    }),
  )
  const form = useForm({
    validator,
  });
  return (
    <Container className="font-IstokWebRegular ">
      <Navbar />
      <Wrapper >
        <UiComponentContainer className={clsx('col-start-1 row-start-1 col-span-2  max-h-12')}> asd</UiComponentContainer>
        <FilterBar className="col-start-1 row-start-2 gap-5">
          <Search form={form} label="search" type="value" />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="px-2.5">
              <AccordionTrigger>Color</AccordionTrigger>
              <AccordionContent>
                <ColorPalette colors={[{ code: '999999', name: "Gray", slug: "gray" }, { code: 'FFD966', name: "Yellow", slug: "yellow" }, { code: '000000', name: "Black", slug: "black" }]} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-2.5">
              <AccordionTrigger>Material</AccordionTrigger>
              <AccordionContent>
                <ColorPalette colors={[{ code: '43464B', name: "Gray", slug: "gray" }, { code: 'FFD966', name: "Yellow", slug: "yellow" }, { code: '000000', name: "Black", slug: "black" }]} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </FilterBar>
      </Wrapper>
    </Container>
  )
}

export default App
