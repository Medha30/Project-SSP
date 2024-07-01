// ContactUs.jsx
import React from 'react';
import { Container, Typography, Grid, TextField, Button, Paper, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  contactInfo: {
    marginBottom: theme.spacing(3),
  },
  form: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function ContactUs() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.contactInfo}>
              Reach Out to Us
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
              Address: 1234 Market Street, Delhi, India
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
              Email: <Link href="mailto:support@shoppyshop.com">support@shoppyshop.com</Link>
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
              Support Number: <Link href="tel:+1234567890">+1 (234) 567-890</Link>
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
              Working Hours: Monday - Friday, 9:00 AM - 6:00 PM
            </Typography>
            <Typography variant="body1" className={classes.contactInfo}>
              Follow Us:
              <Link href="https://www.facebook.com/shoppyshop" target="_blank" rel="noopener" style={{ marginLeft: 8 }}>Facebook</Link>
              <Link href="https://www.twitter.com/shoppyshop" target="_blank" rel="noopener" style={{ marginLeft: 8 }}>Twitter</Link>
              <Link href="https://www.instagram.com/shoppyshop" target="_blank" rel="noopener" style={{ marginLeft: 8 }}>Instagram</Link>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.contactInfo}>
              Send Us a Message
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField fullWidth label="Name" variant="outlined" required />
              <TextField fullWidth label="Email" variant="outlined" required />
              <TextField fullWidth label="Subject" variant="outlined" required />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactUs;

