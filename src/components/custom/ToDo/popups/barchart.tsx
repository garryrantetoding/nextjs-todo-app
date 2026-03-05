import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Loader2 } from 'lucide-react';
// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface UserData {
  userId: number;
  name: string;
  doneTasks: number;
  todoTasks: number;
}

interface BarChartProps {
  data: UserData[]; // Data passed to the chart component
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => a.userId - b.userId);
    const names = sortedData.map((item) => item.name);
    const doneTasks = sortedData.map((item) => item.doneTasks);
    const todoTasks = sortedData.map((item) => item.todoTasks);

    // Create the chart data structure
    setChartData({
      labels: names,
      datasets: [
        {
          label: 'Done Tasks',
          data: doneTasks,
          backgroundColor: 'rgba(173, 216, 230, 1)', /* Light Blue */
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Todo Tasks',
          data: todoTasks,
          backgroundColor: 'rgba(255, 99, 132, 1)', // Red
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  if (!chartData) {
    return (
    <div className="h-screen flex justify-center items-center bg-neutral-100">
      <Loader2 className="mr-2 h-12 w-12 animate-spin" />

      <div className="text-2xl text-gray-500">Loading chart...</div>
    </div>
  );
  }
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
