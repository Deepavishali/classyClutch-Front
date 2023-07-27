import Button from '@mui/material/Button';
import {TextField, AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { API } from "./global.js"

const movieValidationSchema = yup.object({
    id: yup
       .string()
       .required("Why not fill this name😅")
       .min(1,"Minimum One numbers😒")
       .max(3,"Maximum Three numbers😊"),
    name: yup
        .string()
        .required("Why not fill this name😅")
        .min(1, "need a longer name🤔"),
    category: yup
        .string()
        .required("Why not fill this category😅")
        .min(3, "need a longer category🤔")
        .max(6, "Category is to longer"),
    image: yup
        .string()
        .required("Why not fill this image😅")
        .min(10, "need a longer image🤔"),
    description: yup
        .string()
        .required("Why not fill this description😅")
        .min(4, "need a longer description🤔")
    })
    export default function AddBags() {
   
    const { handleSubmit, values, handleChange, touched, handleBlur, errors } = useFormik({
        initialValues: {
            id:"",
            name: "",
            category: "",
            image: "",
            description: ""
        },
        validationSchema: movieValidationSchema,
        onSubmit: (newBagList) => {
            console.log('onSubmit', newBagList)
            addBags(newBagList)
        }
    })
        const addBags = (newBagList) => {
        fetch(`${API}/bags/menu`, {
            method: "POST",
            body: JSON.stringify(newBagList),
            headers: {
                "Content-Type": "application/json"
            },
        })
        // .then(() => navigate('/bags/menu'))
        .then(()=> console.log(newBagList))
            .catch((n) => console.log('error occurred' + n))
    };
    const navigate = useNavigate()
    return <>
      <AppBar className='navbar' position="static">
            <Toolbar>
                <Typography onClick={() => navigate('/bags/menu')} className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Classy<span className='logo-F'>clu</span>tches
                </Typography>
                <Button onClick={() => navigate('/bags/menu')} color="inherit">Back to Bags</Button>
            </Toolbar>
        </AppBar>
        <Box onSubmit={handleSubmit} className="form" component="form" sx={{
           display:"grid",
           minHeight:"100vh",
           gap: 2,
           placeContent:"center"
        }} >
          
            <TextField
               sx = {{width: "600px"}} 
                name="id"
                value={values.id}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.id && errors.id}
                helperText={touched.id && errors.id ? errors.id : null}
                label="id" variant="outlined" />
            <TextField
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : null}
                label="Name" variant="outlined" />


            <TextField
                name="category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.category && errors.category}
                helperText={touched.category && errors.category ? errors.category : null}
                label="category" variant="outlined" />
            <TextField
                name="image"
                value={values.image}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.image && errors.image}
                helperText={touched.image && errors.image ? errors.image : null}
                label="image" variant="outlined" />
            <TextField
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.description && errors.description}
                helperText={touched.description && errors.description ? errors.description : null}
                label="description" variant="outlined" />
            <Button type="Submit" variant="contained" color='success'>Add Bags</Button>
        </Box>
    </>;
}
