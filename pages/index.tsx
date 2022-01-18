import type { NextPage } from 'next'
import { Box, Heading } from "theme-ui";

const Home: NextPage = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Heading m={50} as='h1'>Share</Heading>
    </Box>
  )
}

export default Home
