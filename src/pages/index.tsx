import { Center, Container, Flex, Heading } from '@chakra-ui/react'
import Select from 'components/select'

const IndexPage = () => (
  <Flex direction="column" alignItems="center" height="100vh" p="36">
    <Heading as="h1" size="xl">
      Select with Downshift
    </Heading>
    <Select id="select" />
  </Flex>
)

export default IndexPage
