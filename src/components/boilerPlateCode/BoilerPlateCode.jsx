import React, { useState } from 'react';
const xyz =() => {
    const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const temporary =() => {
         setErrorMessage('xyz');
         setSuccessMessage('xyz');
    }

    temporary();


    // const fetchFruitProduct = async ()=> {
    //   try {
    //     const response = await axios.get('http://localhost:8080/products/all/fruit/4');
    //     setFruitData(response.data);

    //   } catch (error) {
    //     alert(error.response.data);
    //   }
    // };

    // useEffect(()=>{
    //   fetchFruitProduct();
    // },[])

    return(
        <>
        <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          xyz Page
        </Typography>

        
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}


{/* add anything here */}



        </Box>
        </Container>
        </>
    );
}
export default xyz;