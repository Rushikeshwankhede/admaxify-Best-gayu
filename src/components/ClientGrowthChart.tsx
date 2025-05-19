
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', clientGrowth: 40, industryAverage: 10 },
  { month: 'Feb', clientGrowth: 60, industryAverage: 20 },
  { month: 'Mar', clientGrowth: 80, industryAverage: 25 },
  { month: 'Apr', clientGrowth: 95, industryAverage: 30 },
  { month: 'May', clientGrowth: 125, industryAverage: 35 },
  { month: 'Jun', clientGrowth: 160, industryAverage: 40 },
  { month: 'Jul', clientGrowth: 210, industryAverage: 45 },
  { month: 'Aug', clientGrowth: 270, industryAverage: 50 },
  { month: 'Sep', clientGrowth: 330, industryAverage: 55 },
  { month: 'Oct', clientGrowth: 390, industryAverage: 60 },
  { month: 'Nov', clientGrowth: 450, industryAverage: 65 },
  { month: 'Dec', clientGrowth: 500, industryAverage: 70 },
];

const ClientGrowthChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#666"
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            stroke="#666" 
            tick={{ fill: '#666', fontSize: 12 }}
            domain={[0, 600]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', borderColor: '#ddd' }} 
          />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="clientGrowth"
            name="Our Clients' Growth"
            stroke="#9b87f5"
            strokeWidth={3}
            dot={{ r: 5, fill: "#9b87f5", stroke: "#9b87f5" }}
            activeDot={{ r: 8, stroke: "#9b87f5", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="industryAverage"
            name="Industry Average"
            stroke="#ccc"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ccc", stroke: "#ccc" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientGrowthChart;
