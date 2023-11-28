import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, IconButton, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {Formik, Form, getIn} from 'formik'


import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useDispatch, useSelector} from 'react-redux';
import {addNew, checkDate} from '../store/data-reducer';
import dayjs from 'dayjs';
import {toast} from 'react-toastify';

export const Home = () => {
    const dispatch = useDispatch()
    const {data, exchangeData} = useSelector(state => state.data)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = async (values) => {
        if (checkDate(data, values.date)) {
            toast.error('Вже є запис на цей місяць!', {
                position: "bottom-right",
                theme: "colored",
            });
        } else {
            dispatch(addNew(values))
            toast.success('Додано новий запис!', {
                position: "bottom-right",
                theme: "colored",
            });
            setOpen(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <p>
                Сторінка налаштування і введення данних. Сторінка на якій користувач вводить данні
                про звітний місяць, те скільки він заробив і
                скільки він витратив (витрати можна розбити на декілька категорій)
            </p> */}
            {
                exchangeData.length &&
                <Box mb={2}>
                    <Typography variant="h4" component='span' m={2} color='primary' >
                        {`Курс на зараз USD: ${exchangeData.find(el => el.cc === 'USD').rate}`}
                    </Typography>
                    <Typography variant="h4" component='span' color='primary'>
                        {`EUR: ${exchangeData.find(el => el.cc === 'EUR').rate}`}
                    </Typography>
                </Box>
            }
            <IconButton color='primary' size='large' onClick={handleClickOpen}>
                <AddIcon fontSize='large'/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Додати дані про звітний місяць</DialogTitle>
                <DialogContent>
                    <AddForm handleSubmit={handleSubmit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Скасувати</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


const AddForm = ({handleSubmit}) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Formik
                initialValues={{
                    profit: 100,
                    costs: 50,
                    date: new Date().toISOString(),
                }}
                onSubmit={async (values) => {
                    // await new Promise((r) => setTimeout(r, 500));
                    handleSubmit(values)
                }}
            >
                {({values, handleBlur, handleChange, setFieldValue, errors, touched}) => (
                    <Form noValidate>
                        <TextField
                            id="profit"
                            name="profit"
                            type="number"
                            label='Прибуток в ГРН'
                            // disabled={!values.selectiveSale}
                            // InputProps={{
                            //     inputProps: { min: 0, max: 100 },
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <PercentIcon />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            margin='normal'
                            fullWidth
                            value={values.profit}
                            onChange={handleChange}
                            error={touched.profit && Boolean(errors.profit)}
                        />
                        <TextField
                            id="costs"
                            name="costs"
                            type="number"
                            label="Витрати в ГРН"
                            // InputProps={{
                            //     inputProps: { min: 0, max: 100 },
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <PercentIcon />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            margin='normal'
                            fullWidth
                            value={values.costs}
                            onChange={handleChange}
                            error={touched.costs && Boolean(errors.costs)}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="date"
                                id="date"
                                label="Дата"
                                sx={{marginTop: '10px'}}
                                // format="dd/MM/yyyy"
                                // disabled={disabledForm}
                                onBlur={handleBlur}
                                autoOk={true}
                                // defaultValue={(new Date())}
                                // KeyboardButtonProps={{
                                //     'aria-label': 'change date',
                                // }}
                                value={dayjs(values.date)}
                                onChange={(e) => {
                                    let onlyDate = new Date(e.$d).toISOString()
                                    return setFieldValue('date', onlyDate)
                                }}
                                slotProps={{
                                    textField: {
                                        // size: "small",
                                        // error: false,
                                        required: true
                                    },
                                }}
                                selected={
                                    getIn(values, "date") || new Date()
                                } // ледве запустив цей пікер тут, це пиздець :D
                                error={Boolean(
                                    getIn(touched, "date") &&
                                    getIn(errors, "date")
                                )}
                                helperText={
                                    getIn(touched, "date") &&
                                    getIn(errors, "date")
                                }
                            // renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <Button
                            sx={{mt: 3, mb: 2}}
                            size='large'
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            Зберегти
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}