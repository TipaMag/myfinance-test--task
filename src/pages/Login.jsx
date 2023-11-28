import {Box, Button, TextField} from "@mui/material"
import {Formik, Form} from 'formik'
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {setLoggedIn} from "../store/auth-reducer"
import {toast} from "react-toastify"

export const Login = () => {
    let navigate = useNavigate();

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            return navigate("/");
        }
    }, [isLoggedIn, navigate]);

    if (isLoggedIn) return null
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>Sign to MyFinance</h1>
                <Formik
                    initialValues={{
                        login: 'testLogin22',
                        password: 's#dDA23@44#Ds',
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        // alert(JSON.stringify(values, null, 2));
                        if (values.login === 'testLogin22' && values.password === 's#dDA23@44#Ds') {
                            dispatch(setLoggedIn())
                        } else {
                            toast.error('Невірні дані для входу', {
                                position: "bottom-right",
                                theme: "colored",
                            });
                        }
                    }}
                >
                    {({values, handleBlur, handleChange, errors, touched}) => (
                        <Form noValidate>
                            <TextField
                                id="login"
                                name="login"
                                placeholder={'Login'}
                                value={values.login}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.login && Boolean(errors.login)}
                                helperText={touched.login && errors.login}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="password"
                                name="password"
                                placeholder={'Password'}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                sx={{mt: 3, mb: 2}}
                                size='large'
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Sign In
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(45deg, hsla(255, 80%, 52%, 1) 0%, hsla(310, 90%, 88%, 1) 100%)',
                }}
            >
                {/* тут типу блок reviews - відгуки */}
            </Box>
        </Box>
    )
}