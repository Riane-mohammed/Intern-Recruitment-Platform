import { Box, Button, Checkbox, Typography } from '@mui/material'
import React from 'react'

function Conditions({ checked, handleCheckboxChange, handleNextButton }){
  return (
    <Box 
      sx={{
            minHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}
    >
        <Box>
          <Typography variant='h5' align='center' fontFamily='poppins, Sora' fontWeight='bold' >
              CONDITIONS GÉNÉRALES
          </Typography>
          <Typography variant="subtitle1" component="h2" color="textSecondary" align='center'>
              Vos droits et responsabilités
          </Typography>
        </Box>
        <Typography mx='150px' fontFamily='poppins, Sora' >
          Veuillez lire et accepter les Mentions Légales et Conditions Générales avant de commencer l'examen.
          En accédant à notre plateforme et en passant l'examen, vous acceptez de respecter les conditions et règles suivantes :
          <br/>
          <br />
          <Box sx={{ml: 4}}>
            <li>
              Toute tentative de tricherie ou de fraude entraînera une disqualification immédiate.
            </li>
            <li>
              Vous certifiez que les informations fournies sont exactes.
              Toute fausse déclaration peut entraîner des sanctions, y compris l'invalidation de votre candidature.
              Vos données seront protégées et utilisées uniquement pour ce recrutement, conformément à notre politique de confidentialité.
            </li>
            <li>
              Nous nous réservons le droit de modifier ces conditions à tout moment.
              Il est de votre responsabilité de vous tenir informé des mises à jour.
            </li>
          </Box>
          <br/>
          Pour toute question ou assistance, veuillez nous contacter à <span style={{color: 'blue'}}>support@portnet.ma</span>.
          En acceptant ces conditions, vous confirmez avoir lu et compris toutes les règles et directives applicables à cet examen.

        </Typography>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: '10px'
                }}
            >
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <Typography fontFamily='poppins, Sora' >J'accepte</Typography>
            </Box>
          <Button variant="contained" sx={{ width: '400px', fontFamily: 'poppins, Sora' }} disabled={!checked} onClick={handleNextButton}>Suivant</Button>
        </Box>
    </Box>
  )
}

export default Conditions
