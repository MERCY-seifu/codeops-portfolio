'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const currency = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 0,
})

const dateLabel = (value) => new Intl.DateTimeFormat('en-ET', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
}).format(new Date(`${value}T00:00:00Z`))

export function RevenueChart({ data, ordersByDay }) {
  return (
    <div className="dashboard-charts">
      <section className="chart-card" aria-labelledby="revenue-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">June 2026 · ETB</p>
            <h2 id="revenue-title">Revenue by neighbourhood</h2>
          </div>
        </div>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 12, bottom: 4, left: 10 }}>
              <CartesianGrid stroke="#e8dfd2" vertical={false} />
              <XAxis dataKey="area" tick={{ fill: '#74675d', fontSize: 12 }} />
              <YAxis
                width={88}
                domain={[0, 'auto']}
                tickFormatter={(value) => currency.format(value)}
                tick={{ fill: '#74675d', fontSize: 11 }}
              />
              <Tooltip formatter={(value) => [currency.format(value), 'Revenue']} />
              <Bar dataKey="revenue" name="Revenue" fill="#a93e2c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <table className="chart-data">
          <caption>Revenue by neighbourhood, in ETB</caption>
          <thead>
            <tr><th scope="col">Neighbourhood</th><th scope="col">Revenue</th></tr>
          </thead>
          <tbody>
            {data.map(({ area, revenue }) => (
              <tr key={area}><th scope="row">{area}</th><td>{currency.format(revenue)}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="chart-card" aria-labelledby="orders-chart-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">June 1–14, 2026 · orders per day</p>
            <h2 id="orders-chart-title">Orders over time</h2>
          </div>
        </div>
        <div className="chart-frame">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ordersByDay} margin={{ top: 10, right: 14, bottom: 4, left: 4 }}>
              <CartesianGrid stroke="#e8dfd2" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={dateLabel}
                tick={{ fill: '#74675d', fontSize: 11 }}
                minTickGap={18}
              />
              <YAxis
                allowDecimals={false}
                width={34}
                tick={{ fill: '#74675d', fontSize: 11 }}
              />
              <Tooltip
                labelFormatter={(value) => dateLabel(value)}
                formatter={(value) => [value, 'Orders']}
              />
              <Line
                dataKey="orders"
                name="Orders"
                type="monotone"
                stroke="#687750"
                strokeWidth={3}
                dot={{ r: 3, fill: '#687750' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <table className="chart-data">
          <caption>Daily order count, June 1–14, 2026</caption>
          <thead>
            <tr><th scope="col">Date</th><th scope="col">Orders</th></tr>
          </thead>
          <tbody>
            {ordersByDay.map(({ date, orders }) => (
              <tr key={date}><th scope="row">{dateLabel(date)}</th><td>{orders}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
