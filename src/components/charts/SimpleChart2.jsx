import {useSelector} from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export const SimpleChart2 = () => {
    const data = useSelector(state => state.data.data)

    return (
        <ResponsiveContainer width="100%" height={200}>
            <LineChart
                width={700}
                height={200}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatMonthYear} />
                <YAxis />
                <Tooltip labelFormatter={labelFormatter} />
                <Legend />
                <Line type='monotone' dataKey="accu_uah" stroke="#7E59EC" name='UAH' activeDot={{r: 8}} />
                <Line type="monotone" dataKey="accu_usd" stroke="#FF0200" name='USD' />
                <Line type="monotone" dataKey="accu_eur" stroke="#FF0200" name='EUR' />
            </LineChart>
        </ResponsiveContainer>
    );
}

const labelFormatter = (value) => {
    return new Date(value).toLocaleDateString()
};

const formatMonthYear = (date) => {
    const options = {year: 'numeric', month: 'numeric'};
    return new Date(date).toLocaleDateString('en-US', options);
};