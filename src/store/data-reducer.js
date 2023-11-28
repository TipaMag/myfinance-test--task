import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    data: [
        // {id: 1, date: '2011-10-05T14:48:00.000Z', profit: 135.20, costs: 35, accu_uah: 800, accu_usd: 200},
        // {id: 2, date: '2011-10-05T14:48:00.000Z', profit: 100.20, costs: 25, accu_uah: 900, accu_usd: 210},
        // {id: 3, date: '2011-10-05T14:48:00.000Z', profit: 50.20, costs: 15, accu_uah: 1000, accu_usd: 220},
    ],
    exchangeData: [],
    total: {
        accu_uah: 0,
        accu_usd: 0,
        accu_eur: 0
    }
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        checkLocalData: (state, action) => {
            const data = localStorage.getItem("data");
            if (data) {
                state.data = JSON.parse(data)
                state.total = recalculationBalance(JSON.parse(data))
            }
        },
        setRecalculatedData: (state, action) => {
            state.data = action.payload
            localStorage.setItem('data', JSON.stringify(state.data))
            state.total = recalculationBalance(action.payload)
        },
        setExchangeData: (state, action) => {
            state.exchangeData = action.payload
        },
        setNewRow: (state, action) => {
            state.data.push(action.payload)
        },
        updateRow: (state, action) => {
            state.data = state.data.map((row) => (row.id === action.payload.id ? action.payload : row))
        },
        deleteRow: (state, action) => { // id
            state.data = state.data.filter((row) => (row.id !== action.payload))
        }
    },
});
export const {checkLocalData, setRecalculatedData, setNewRow, updateRow, deleteRow, setExchangeData} = dataSlice.actions;


export const addNew = (values) => async (dispatch, getState) => {
    const {data, exchangeData} = getState().data

    const id = data.length ? data.reduce((max, obj) => obj.id > max ? obj.id : max, data[0].id) + 1 : 1

    const {accuUAH, accuUSD, accuEUR} = calculateRowData(data, exchangeData, values)
    const newRow = {
        id: id,
        date: values.date,
        profit: values.profit,
        costs: values.costs,
        accu_uah: accuUAH,
        accu_usd: accuUSD,
        accu_eur: accuEUR
    }
    dispatch(setNewRow(newRow))

    dispatch(recalculateAllData())
}
export const updateOne = (updatedRow) => async (dispatch) => {
    dispatch(updateRow(updatedRow))
    dispatch(recalculateAllData())
}
export const deleteOne = (id) => async (dispatch) => {
    dispatch(deleteRow(id))
    dispatch(recalculateAllData())
}

export const getExchangeData = () => async (dispatch) => { // USD & EUR
    try {
        const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = response.data.filter(el => el.cc === 'USD' || el.cc === 'EUR')
        dispatch(setExchangeData(data))
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const calculateRowData = (data, exchangeData, values) => {
    const totalProfit = data.length ? data.reduce((accum, currRow) => accum + currRow.profit, 0) + values.profit : values.profit
    const totalCosts = data.length ? data.reduce((accum, currRow) => accum + currRow.costs, 0) + values.costs : values.costs
    const accuUAH = totalProfit - totalCosts
    const accuUSD = parseFloat((accuUAH / exchangeData[0].rate).toFixed(2))
    const accuEUR = parseFloat((accuUAH / exchangeData[1].rate).toFixed(2))

    return {accuUAH, accuUSD, accuEUR}
}

const recalculateAllData = () => async (dispatch, getState) => {
    const {data, exchangeData} = getState().data
    let sortedData = JSON.parse(JSON.stringify(data))
    let accu_UAH = 0

    sortedData.sort((a, b) => a.date.localeCompare(b.date));
    sortedData.forEach((item) => {
        item.accu_uah = (item.profit - item.costs) + accu_UAH
        item.accu_usd = parseFloat((item.accu_uah / exchangeData[0].rate).toFixed(2))
        item.accu_eur = parseFloat((item.accu_uah / exchangeData[1].rate).toFixed(2))

        accu_UAH = item.accu_uah
    });

    dispatch(setRecalculatedData(sortedData))
}

const recalculationBalance = (data) => {
    const latest = data.reduce((latest, current) => (
        new Date(current.date) > new Date(latest.date) ? current : latest
    ), data[0])
    return {accu_uah: latest.accu_uah, accu_usd: latest.accu_usd, accu_eur: latest.accu_eur}
}


export const checkDate = (data, date) => { // просто перевірка чи є запис з таким місяцем
    const isMonthExists = data.some(item => {
        const existingDate = new Date(item.date);
        return existingDate.getMonth() === new Date(date).getMonth();
    })
    return isMonthExists
}


export default dataSlice.reducer
