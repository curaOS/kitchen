// @ts-nocheck
import { useEffect, useState } from 'react'
import { Box, Label, Select, Input, Grid, Button } from "theme-ui";

const styles = {
	menuBtn:{
		padding: '10px 0',
		cursor: 'pointer',
	}
}

const menuNo = [1,2,3,4,5]

export default function OptionComp(props){

	const [selectedMenu, setSelectedMenu] = useState(1);

	const changeMenu=(id)=>{
		setSelectedMenu(id)
	}

	const onChangeHandler=(e, id)=>{

		const { name, value } = e.target;
		id = id-1;

		let oldEntries = JSON.parse(JSON.stringify(props.formState));

		if(name === 'type'){
			if(value == 'line' || value == 'ellipse' || value == 'rectangle'){
				oldEntries.splice([id], 1, {
					[name]: value,
					color: '',
					height: 0,
					width: 0
				})
			} else if(value == 'text'){
				oldEntries.splice([id], 1, {
					[name]: value,
					color: '',
					text:'',
					size:''
				})
			} else {
				oldEntries.splice([id], 1, {
					[name]: value,
					color: '',
				})
			}
		} else {
			oldEntries[id][name] = value;
		}

		props.setFormState(oldEntries)
  	}

	return(
		<Box
		  as="form" 
		  onSubmit={props.submitChanges}
          sx={{
            px:[3, 5],
            mb: 5
          }}
        >

          <Grid columns={[3, 5]} gap={0} sx={{ mb: 4 }}>
          	{
          		menuNo.map((el)=>{
          			return(
          				<Box 
			            	onClick={()=> changeMenu(el)} 
			            	style={styles.menuBtn} 
			            	sx={{
			            		background: selectedMenu == el ? '#E5E5E5' : '#3C38ED', 
			            		color: selectedMenu == el ? '#000' : '#fff', 
			            	}} 
			            >
			            	0{el}
			            </Box>
          			)
          		})
          	}
          </Grid>

          <Box sx={{ mb: 3 }}>  
            <Label htmlFor='type' sx={{ mb:2 }}>Type</Label>
            <Select name='type' id='type' value={props.formState[selectedMenu-1].type} onChange={(e)=> onChangeHandler(e, selectedMenu)}>
              <option value='line'>Line</option>
              <option value='text'>Text</option>
              <option value='ellipse'>Ellipse</option>
              <option value='rectangle'>Rectangle</option>
              <option value='point'>Point</option>
            </Select>
          </Box>

          <Grid columns={[null, 2]}>

          	{props.formState[selectedMenu-1].type == 'text' && 
	            <Box sx={{ mt:2 }}>
	              <Label htmlFor='text' sx={{ mb:2 }}>Text</Label>
	              <Input name='text' id='text' value={props.formState[selectedMenu-1].text} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
	            </Box>
        		}

        		{props.formState[selectedMenu-1].type == 'text' && 
	            <Box sx={{ mt:2 }}>
	              <Label htmlFor='size' sx={{ mb:2 }}>Text Size</Label>
	              <Input name='size' id='size' type='number' min={0} value={props.formState[selectedMenu-1].size} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
	            </Box>
        		}

            <Box sx={{ mt:2 }}>
              <Label htmlFor='color' sx={{ mb:2 }}>Color</Label>
              <Input name='color' id='color' type='text' value={props.formState[selectedMenu-1].color} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
            </Box>

            {(props.formState[selectedMenu-1].type == 'line' || props.formState[selectedMenu-1].type == 'ellipse' || props.formState[selectedMenu-1].type == 'rectangle') &&
	            <>
		            <Box sx={{ mt:2 }}>
		              <Label htmlFor='width' sx={{ mb:2 }}>Width</Label>
		              <Input name='width' id='width' min={0} type='number' value={props.formState[selectedMenu-1].width} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
		            </Box>

		            <Box sx={{ mt:2 }}>
		              <Label htmlFor='height' sx={{ mb:2 }}>Height</Label>
		              <Input name='height' id='height' min={0} type='number' value={props.formState[selectedMenu-1].height} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
		            </Box>
	            </>
        	}
          </Grid>
          <Box
          	sx={{
          		mt:2,
          		textAlign:'right'
          	}}
          >
          	<Button>Submit Changes</Button>
          </Box>
        </Box>
	)
}