import {useState} from 'preact/hooks'
import styled, {css} from 'styled-components';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const IS_DEV = false

const Text = styled.img.attrs(() => ({src: '/assets/contact_us/text1.png'}))`
    top: 21.8%;
    left: 65.4%;
    height: 64.8%;
    width: 18.5%;

    position: absolute;

    ${() => IS_DEV && css`border: red 1px solid;`}
`

const Form = styled.form.attrs(() => ({noValidate: true, autoComplete:"off"}))`
    top: 24.8%;
    left: 14.6%;
    position: absolute;
    width: 41.5%;

    ${() => IS_DEV && css`border: yellow 1px solid;`}
`

const InputField = styled.input`
    background: transparent;
    color: white;
    height: 2.8vw;
    text-indent: 2.5vw;
    border: 0px;
    display: block;
    width: 100%;

    &::placeholder{
        // color: yellow;
        font-size: 1.2em;
        vertical-align: middle;
    }
    
    &:focus {
        outline: none;
        border-bottom: 1px solid #bc3648;
    }
`

const InputName = styled(InputField)`
    margin-bottom: 2vw;
`

const InputEmail = styled(InputField)`
    margin-bottom: 4vw;
`

const InputMsg = styled(InputField)`
    height: 14vw;
    margin-bottom: 3.1vw;

    &::placeholder{
        font-size: 1.2em;
        vertical-align: text-top;
    }
`

const SubmitBtn = styled.div`
    display: flex;
    justify-content: center;
    align-itme: center;
    background-color: #bc3648;
    width: 2vw;
    color: white;
    padding: 0.7vw 2.2vw;
    border-radius: 0.5vw;
`
const CssTextField = withStyles({
    input: {
        color: 'white'
    },
    root: {
        '& label.Mui-focused': {
        color: '#bc3648',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: '#bc3648',
        },
        '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#bc3648',
        },
        },
    },
})(TextField);

const useTextFieldStyles = makeStyles(() => ({
    root: {
        '& label.Mui-focused': {
            color: '#bc3648',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#bc3648',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#bc3648',
            },
        },
    },
}))

const useBtnStyles = makeStyles(() => ({
    root: {
        color: 'white',
        backgroundColor: '#bc3648',
        '&:hover': {
            color: '#bc3648',
            backgroundColor: 'white'
        }
    }
}));

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const ContactUsSection = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [open, setOpen] = useState(false)

    const handleOnChange = (e) => {
        e.preventDefault();
        setData(prev => ({
            ...prev,
            [`${e.target.name}`]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    const handleClose = () => (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const btnClass = useBtnStyles()
    const textFieldClass = useTextFieldStyles()
    
    return(
        <ThemeProvider theme={darkTheme}>
            <Form>
                <div style={{marginBottom: '4%'}}>
                    <CssTextField 
                        label="Your Name" 
                        name="name"
                        fullWidth 
                        onChange={handleOnChange}
                        classes={textFieldClass.root} />

                </div>
                <div style={{marginBottom: '10.6%'}}>
                    <CssTextField 
                        label="Your Email" 
                        name="email"
                        fullWidth 
                        onChange={handleOnChange}
                        classes={textFieldClass.root} />
                </div>
                <div style={{marginBottom: '27%'}}>
                    <CssTextField
                        label="Message"
                        name="message"
                        fullWidth
                        onChange={handleOnChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        classes={textFieldClass.root} />
                </div>
                <Button variant="contained" classes={btnClass} onClick={handleOnSubmit}>Send</Button>
            </Form>
            <Text />
            {/* <div style={{color: 'white', fontSize: '3em'}}>{JSON.stringify(open)}</div> */}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={() => setOpen(false)} severity="success">
                    {JSON.stringify(data)}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    )
}

export default ContactUsSection