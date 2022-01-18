import type { NextPage } from 'next'
import { Box, Heading } from "theme-ui";
import Layout from '../containers/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Box sx={{ textAlign: "center" }}>
        <Heading m={50} as='h1'>Share</Heading>
      </Box>
      </Layout>
  )
}

export default Home
