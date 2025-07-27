import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  dataKey?: string | string[];
  xAxisKey?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  animate?: boolean;
  loading?: boolean;
}

const defaultColors = [
  '#3B82F6', // blue-500
  '#8B5CF6', // purple-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#EC4899', // pink-500
  '#6366F1', // indigo-500
  '#14B8A6', // teal-500
];

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 400,
  title,
  subtitle,
  colors = defaultColors,
  showGrid = true,
  showLegend = true,
  animate = true,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className={`bg-gray-200 dark:bg-gray-700 rounded`} style={{ height }}></div>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    const axisPropsDark = {
      stroke: '#9CA3AF',
      style: { fontSize: 12 },
    };

    const gridPropsDark = {
      stroke: '#374151',
      strokeDasharray: '3 3',
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridPropsDark} />}
            <XAxis dataKey={xAxisKey} {...axisPropsDark} />
            <YAxis {...axisPropsDark} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            {showLegend && <Legend wrapperStyle={{ color: '#9CA3AF' }} />}
            {Array.isArray(dataKey) ? (
              dataKey.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ fill: colors[index % colors.length], r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={animate ? 1000 : 0}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ fill: colors[0], r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={animate ? 1000 : 0}
              />
            )}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridPropsDark} />}
            <XAxis dataKey={xAxisKey} {...axisPropsDark} />
            <YAxis {...axisPropsDark} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            {showLegend && <Legend wrapperStyle={{ color: '#9CA3AF' }} />}
            {Array.isArray(dataKey) ? (
              dataKey.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  animationDuration={animate ? 1000 : 0}
                  radius={[8, 8, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey={dataKey}
                fill={colors[0]}
                animationDuration={animate ? 1000 : 0}
                radius={[8, 8, 0, 0]}
              />
            )}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridPropsDark} />}
            <XAxis dataKey={xAxisKey} {...axisPropsDark} />
            <YAxis {...axisPropsDark} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            {showLegend && <Legend wrapperStyle={{ color: '#9CA3AF' }} />}
            {Array.isArray(dataKey) ? (
              dataKey.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  animationDuration={animate ? 1000 : 0}
                />
              ))
            ) : (
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.3}
                strokeWidth={2}
                animationDuration={animate ? 1000 : 0}
              />
            )}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
              }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                return (
                  <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius={120}
              fill="#8884d8"
              dataKey={dataKey as string}
              animationDuration={animate ? 1000 : 0}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            {showLegend && <Legend wrapperStyle={{ color: '#9CA3AF' }} />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        {renderChart() || <div />}
      </ResponsiveContainer>
    </motion.div>
  );
};