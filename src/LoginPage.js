import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';


const theme = createTheme();

function LoginPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    signIn_email: false,
    signIn_password: false,
    signUp_firstName: false,
    signUp_lastName: false,
    signUp_email: false,
    signUp_password: false,
    // Add additional fields here
  });
  const [pwdHplertextColor, setPwdHplertextColor] = useState({
    span_1: { color: 'grey' },
    span_2: { color: 'grey' },
    span_3: { color: 'grey' }
  });
  const [isEmail, setIsEmail] = useState(false);

  const handleSginIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = data.entries();
    let getFormErrorData = {};
    let isTrim = false;

    for (const [name, value] of entries) {
      if (value.trim() === '') {
        getFormErrorData[`signIn_${name}`] = true;
        isTrim = true;
      } else {
        getFormErrorData[`signIn_${name}`] = false;
      }
    }
    CheckFormErrorStatus(getFormErrorData, 'check');

    if (isTrim) {
      return;
    }
    // console.log('sign innnnnn');

    CheckLoadingButtonStatus(isTrim);
    

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = data.entries();
    let getFormErrorData = {};
    let isTrim = false;

    for (const [name, value] of entries) {
      // console.log(value.trim()+",=empty");
      if (value.trim() === '') {
        // errors[`signUp_${name}`] = true;
        getFormErrorData[`signUp_${name}`] = true;
        isTrim = true;
        // console.log(`signUp_${name}:`+formErrors[`signUp_${name}`]);
      } else {
        getFormErrorData[`signUp_${name}`] = false;
        // errors[`signUp_${name}`] = false;
      }

      // setFormErrors(errors);
      // console.log(`signUp_${name}:`+formErrors[`signUp_${name}`]);
    }
    CheckFormErrorStatus(getFormErrorData, 'check');
    // console.log(`isEmail=${isEmail}`)
    // console.log('value=='+isAllValuesEqual(pwdHplertextColor))
    if (!isEmail || !isAllValuesEqual(pwdHplertextColor)) {
      return;
    }
    console.log('eeee');
    CheckLoadingButtonStatus(isTrim);
    // setIsLoading(true);
  };
  const isAllValuesEqual = (obj) => {
    const values = Object.values(obj);
    // console.log(obj)
    // console.log(values);
    // values.forEach(val=>console.log(val));
    return values.every(val => val.color === 'green' && val.color === values[0].color);
  }

  const [isSignIn, setIsSignIn] = useState(true);
  const [variant, setVariant] = useState({
    signin: 'contained',
    signup: 'outlined'
  });
  const SignInClick = () => {
    if (isLoading) {
      return;
    }
    console.log("sign in ");
    setIsSignIn(true);
    setVariant({
      signin: 'contained',
      signup: 'outlined'
    });
    CheckFormErrorStatus({}, 'init');
    CheckLoadingButtonStatus(true);
    setIsEmail(false)
  }
  const SignUpClick = () => {
    if (isLoading) {
      return;
    }
    console.log("sign up ");
    setIsSignIn(false);
    setVariant({
      signup: 'contained',
      signin: 'outlined'
    });
    CheckFormErrorStatus({}, 'init');
    CheckLoadingButtonStatus(true);
    setIsEmail(false)
  }
  const handleFormErrorChange = (event) => {
    // console.log(event.target);
    // event.target.value.length === 1  ?  CheckFormErrorStatus({},'oneCheck') : undefined;
    if ((event.target.value.length) === 1) {
      CheckFormErrorStatus(event.target.name, 'oneCheck')
    }
    // (event.target.value.length) === 1 ? undefined : undefined;
  }
  const CheckFormErrorStatus = (props, status) => {
    const fields = { ...formErrors }//["signIn_email", "signIn_password", "signUp_firstName","signUp_lastName","signUp_email","signUp_password"];
    const newObj = { ...pwdHplertextColor };
    let errors = {};
    let textcolor = {};
    switch (status) {
      case "check":
        setFormErrors(props);
        break;
      case 'oneCheck':
        const filteredKeys = Object.keys(fields).filter(key => key.includes(props));
        errors = { ...fields };
        errors[filteredKeys] = false;
        setFormErrors(errors);
        break;
      default:
        // 执行当expression不等于任何一个case时的代码块
        console.log(fields);
        Object.entries(fields).map(([key, value]) => {
          // 对每个属性名进行操作
          errors[key] = false
        });
        setFormErrors(errors);

        Object.entries(newObj).map(([key, value]) => {
          // 对每个属性名进行操作
          textcolor[key] = { color: 'grey' }
        });
        setPwdHplertextColor(textcolor);
        break;
    }

    // if(status==="check"){
    //   setFormErrors(props);
    // }else if(){

    // }{
    //   console.log(fields);
    //   Object.entries(fields).map(([key, value]) => {
    //     // 对每个属性名进行操作
    //     errors[key]=false
    //   });
    //   setFormErrors(errors);
    // }
  }
  const CheckLoadingButtonStatus = (props) => {

    props ? setIsLoading(false) : setIsLoading(true)
  }
  const handleFormPwdChange = (event) => {
    let regex = /\d+/; // 匹配一個或多個數字
    let regexA = /(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[a-z])/; // 匹配任何一個英文字母
    let str = event.target.value;
    const newObj = { ...pwdHplertextColor };
    if (str.length > 30) {
      return;
    }

    (str.length >= 8) ? newObj['span_1'] = { color: 'green' } : newObj['span_1'] = { color: 'grey' };
    (regex.test(str)) ? newObj['span_2'] = { color: 'green' } : newObj['span_2'] = { color: 'grey' };
    (regexA.test(str)) ? newObj['span_3'] = { color: 'green' } : newObj['span_3'] = { color: 'grey' };

    setPwdHplertextColor(newObj);
    handleFormErrorChange(event);
  }
  const handleEmailChange = (event) => {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let str = event.target.value;
    (emailRegex.test(str)) ? setIsEmail(true) : setIsEmail(false);
    handleFormErrorChange(event);
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          justifyContent: 'center',
          // border: 1
        }}
      >
        <Button variant={variant.signin} size="large" onClick={SignInClick}>Sign in</Button>
        <Button variant={variant.signup} size="large" onClick={SignUpClick}>Sign up</Button>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // border: 1
          }}
        >
          {isSignIn ?
            <div>
              <Box component="form" onSubmit={handleSginIn} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={formErrors.signIn_email}
                  helperText={formErrors.signIn_email ? 'Space cannot be blank' : ''}
                  onChange={handleEmailChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={formErrors.signIn_password}
                  helperText={formErrors.signIn_password ? 'Space cannot be blank' : ''}
                  onChange={handleFormErrorChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </div> :
            <div>
              <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={formErrors.signUp_firstName}
                      helperText={formErrors.signUp_firstName ? 'Space cannot be blank' : ''}
                      onChange={handleFormErrorChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      error={formErrors.signUp_lastName}
                      helperText={formErrors.signUp_lastName ? 'Space cannot be blank' : ''}
                      onChange={handleFormErrorChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={formErrors.signUp_email}
                      helperText={formErrors.signUp_email ? 'Space cannot be blank' : ''}
                      onChange={handleEmailChange}
                      InputProps={{
                        endAdornment: (
                          <FormControlLabel
                            control={<Checkbox checked={isEmail} />}
                          // label="Remember me"
                          />
                        )
                      }}
                    />

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      maxLength={30}
                      autoComplete="new-password"
                      error={formErrors.signUp_password}
                      helperText={
                        formErrors.signUp_password ? 'Space cannot be blank' :
                          <Typography variant="caption">
                            <span style={pwdHplertextColor.span_1}>至少8個字元</span>
                            <br />
                            <span style={pwdHplertextColor.span_2}>須包含數字</span>
                            <br />
                            <span style={pwdHplertextColor.span_3}>須包含英文大小寫</span>
                          </Typography>
                      }
                      //{formErrors.signUp_password ? 'Space cannot be blank' : '至少8個字元\n 須包含數字\n須包含英文大小寫'}
                      // FormHelperTextProps={
                      //   formErrors.signUp_password ?{}: {style: { color: 'grey' },}
                      // }
                      onChange={handleFormPwdChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>

                <LoadingButton
                  loading={isLoading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  SAVE
                </LoadingButton>

              </Box>
            </div>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default LoginPage;
