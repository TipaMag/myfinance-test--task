import {Box, Grid, Paper, Typography} from "@mui/material"
import FullFeaturedCrudGrid from "../components/DataGrid"
import {SimpleChart} from "../components/charts/SimpleChart"
import {useSelector} from "react-redux"
import {SimpleChart2} from "../components/charts/SimpleChart2"

export const Results = () => {
    const {total} = useSelector(state => state.data)
    return (
        <>
            {/* <p>-Сторінка результату. Сторінка на якій користувач бачить свою фін інформацію (статистику). Все повинно бути розбити по блокам:
                1) Наявні накопичення на зараз в UAH, USD, EUR
                2) Таблиця по місяцям (номер, місяць, прибуток, витрати, накопичення в гривні і накопичення в валюті)
                3) Інфо блок з переходом на сторінки (Інструкції, Інфо про розробника)
                +Повинна бути можливість оновити або видалити данні за певний звітний місяць, або додати інформацію за місяць по якому відсутня інформація.
            </p> */}

            <Grid container>
                <Grid container>
                    <Grid item xs={2}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h4" component='span' m={2} color='darkblue'>
                                {`UAH ${total.accu_uah}`}
                            </Typography>
                            <Typography variant="h4" component='span' color='#ccc'>
                                {`USD ${total.accu_usd}`}
                            </Typography>
                            <Typography variant="h4" component='span' color='#ccc'>
                                {`EUR ${total.accu_eur}`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <SimpleChart2 />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <SimpleChart />
                </Grid>
            </Grid>

            <FullFeaturedCrudGrid />
        </>
    )
}