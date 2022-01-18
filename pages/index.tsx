// @ts-nocheck
import type { NextPage } from 'next'
import { Box, Heading, AspectRatio } from "theme-ui";
import Layout from '../containers/Layout'
import { useNFTMethod } from '@cura/hooks'
import { utils } from 'near-api-js'
import { useEffect, useState } from 'react'

import OptionComp from '../components/OptionComp'

const CONTRACT = "demo.ashen99.testnet";
const CONTRACT_VIEW_GAS = utils.format.parseNearAmount(`0.00000000010`) // 100 Tgas
const defaultDecoder = [
   {
     type: "line",
     color: "#ffff00",
     height: 10,
     width: 10,
   },
   {
     type: "text",
     color: "#ffff00",
     text: "😀",
   },
   {
     type: "ellipse",
     color: "#ffff00",
     height: 10,
     width: 10,
   },
   {
     type: "rectangle",
     color: "#ffff00",
     height: 10,
     width: 10,
   },
   {
     type: "point",
     color: "#ffff00",
   },
];


const Home: NextPage = () => {

  const [creativeCode, setCretiveCode] = useState(``);
  const [decoder, setDecoder] = useState(defaultDecoder);
  const [formState, setFormState] = useState(defaultDecoder);

  const data = useNFTMethod(
        `${CONTRACT}`,
        `generate`,
        {},
        10000000000000,
        () => {}
  )

  const submitChanges=(e)=>{

    e.preventDefault();
    setDecoder(formState);
  }

  
  function generateDrawJs(i: number): string {
    let funcJs = "";
    let colorJs = "";
    if (decoder[i].type == "line") {
      funcJs = `line(x, y, x + ${decoder[i].width}, y + ${decoder[i].height})`;
    }
    if (decoder[i].type == "text") {
      funcJs = `text("${decoder[i].text}", x, y)`;
    }
    if (decoder[i].type == "ellipse") {
      funcJs = `ellipse(x, y, ${decoder[i].width}, ${decoder[i].height})`;
    }
    if (decoder[i].type == "rectangle") {
      funcJs = `rect(x, y, ${decoder[i].width}, ${decoder[i].height})`;
    }
    if (decoder[i].type == "point") {
      funcJs = `rect(x, y, ${decoder[i].width}, ${decoder[i].height})`;
    }
    colorJs = `fill("${decoder[i].color}")`;

    return `
      ${funcJs}
      ${colorJs}
    `;
  }

  useEffect(()=>{
    if(data?.data?.instructions){
      const arweaveHTML = 
          `<html>
            <head>
              <meta charset="utf-8" />
                <script>let jsonParams = '${JSON.stringify({
                    instructions: data.data.instructions.split(`,`),
                })}'
                </script>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>

                <script>
                  let params = JSON.parse(jsonParams)
                  const SIZE = 32
                  const instructions =  params.instructions;
          
                  let c = ''
          
                  const designDimension = window.innerHeight 

                  const canvasStep = [
                      designDimension / (SIZE * 1.1),
                      designDimension / (SIZE * 1.1),
                  ]

                  const canvasTextSize = designDimension / (SIZE * 1.7)

                  const canvasStart = [
                      (designDimension + (window.innerWidth - window.innerHeight) -  canvasStep[0] * (SIZE - 0.2)) / 2,
                      (designDimension - canvasStep[1] * (SIZE - 1.5)) / 2,
                  ]

                  function setup() {
                    createCanvas(windowWidth, windowHeight);
                    background(0)
                    noLoop()
                    if (instructions.length > 0) {
                        textSize(canvasTextSize)
                        for (let i = 0; i < SIZE; i++) {
                            for (let j = 0; j < SIZE; j++) {
                              drawInstruction(instructions[j + i * SIZE], canvasStart[0] + j * canvasStep[0], canvasStart[1] + i * canvasStep[1])
                            }
                        }
                    }
                  }
                  
                  function drawInstruction(ins, x, y) {
                    if (ins == 1) {
                      ${generateDrawJs(1)}
                    }
                    if (ins == 2) {
                      ${generateDrawJs(2)}
                    }
                    if (ins == 3) {
                      ${generateDrawJs(3)}
                    }
                    if (ins == 4) {
                      ${generateDrawJs(4)}
                    }
                    if (ins == 5) {
                      ${generateDrawJs(5)}
                    }
                  }
              </script>

              <style type="text/css">
                body {
                  margin: 0;
                  padding: 0;
                }
                canvas {
                  padding: 0;
                  margin: auto;
                  display: block;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                }
              </style>

            </head>
          </html>`
      

      setCretiveCode(arweaveHTML)
    }
  }, [data?.data?.instructions])
  

  return (
    <Layout>
      <Box sx={{ textAlign: "center" }}>
        <Heading m={50} as='h1'>Share</Heading>
        <Box
            sx={{
                display: ['block', 'block', 'block','inline-block'],
                width: ['100%', '70%', '70%', '50%'],
                mr: [0, 'auto', 'auto', 4],
                ml: [0, 'auto', 'auto', 0],
                mb: [4, 4, 0, 0],
                textAlign:'center',
            }}
        >
            <AspectRatio
                ratio={1}
                sx={{
                    bg: 'gray.3',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    width: ['100%', '100%', '100%', '70%'],
                    maxHeight: ['100%', '100%', '100%', '70%'],
                    marginLeft: 'auto',
                    marginRight:['auto', 'auto', 'auto', 'auto']
                }}
            >
                <iframe
                    srcDoc={creativeCode}
                    width={`100%`}
                    height={`100%`}
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </AspectRatio>
        </Box>

        <OptionComp 
          formState={formState}
          setFormState={setFormState}
          submitChanges={submitChanges}
        />

      </Box>
      </Layout>
  )
}

export default Home
