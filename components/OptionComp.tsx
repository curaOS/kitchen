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

		if(name === 'type'){
			props.setFormState({
				...props.formState,
				[selectedMenu]:{
					[name]: value
				}
			})
		}
		else{
			props.setFormState({
				...props.formState,
				[selectedMenu]:{
					...props.formState[selectedMenu],
					[name]: value
				}
			})
		}
  	}

	return(
		<Box
		  as="form" 
		  onSubmit={props.submitChanges}
          sx={{
            px:5,
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
            <Select name='type' id='type' value={props.formState[selectedMenu].type} onChange={(e)=> onChangeHandler(e, selectedMenu)}>
              <option value='line'>Line</option>
              <option value='text'>Text</option>
              <option value='ellipse'>Ellipse</option>
              <option value='rectangle'>Rectangle</option>
              <option value='point'>Point</option>
            </Select>
          </Box>

          <Grid columns={[null, 2]}>

          	{props.formState[selectedMenu].type == 'text' && 
	            <Box sx={{ mt:2 }}>
	              <Label htmlFor='text' sx={{ mb:2 }}>Text</Label>
	              <Input name='text' id='text' min={0} value={props.formState[selectedMenu].text} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
	            </Box>
        	}

            <Box sx={{ mt:2 }}>
              <Label htmlFor='color' sx={{ mb:2 }}>Color</Label>
              <Input name='color' id='color' type='text' value={props.formState[selectedMenu].color} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
            </Box>

            {(props.formState[selectedMenu].type == 'line' || props.formState[selectedMenu].type == 'ellipse' || props.formState[selectedMenu].type == 'rectangle') &&
	            <>
		            <Box sx={{ mt:2 }}>
		              <Label htmlFor='width' sx={{ mb:2 }}>Width</Label>
		              <Input name='width' id='width' min={0} type='number' value={props.formState[selectedMenu].width} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
		            </Box>

		            <Box sx={{ mt:2 }}>
		              <Label htmlFor='height' sx={{ mb:2 }}>Height</Label>
		              <Input name='height' id='height' min={0} type='number' value={props.formState[selectedMenu].height} onChange={(e)=> onChangeHandler(e, selectedMenu)} />
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