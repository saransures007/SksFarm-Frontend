import { useEffect, useState } from 'react';
import { Row, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import CowMilkProductionPreviewCard from './components/CowMilkProductionPreviewCard';
import SummaryCard from './components/SummaryCard';
import Chart from 'react-apexcharts';

export default function DashboardModule() {
  const translate = useLanguage();
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('today'); // Default frequency
  const [chartData, setChartData] = useState([]);

  const getStatsData = async ({ entity }) => {
    return await request.summary({
      entity,
    });
  };

  const {
    result: cowResult,
    isLoading: cowLoading,
    onFetch: fetchcowsStats,
  } = useOnFetch();

  const {
    result: cowMilkProductionResult,
    isLoading: cowMilkProductionLoading,
    onFetch: fetchcowMilkProductionStats,
  } = useOnFetch();

  useEffect(() => {
    fetchcowsStats(getStatsData({ entity: 'cow' }));
    fetchcowMilkProductionStats(getStatsData({ entity: 'cowMilkProduction' }));

    // Detect mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768); // Set mobile view if width is 768px or less
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);

    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const entityData = [
    {
      result: cowMilkProductionResult,
      isLoading: cowMilkProductionLoading,
      entity: 'cowMilkProduction',
      title: translate('cowMilkProduction'),
    },
  ];

  const statisticCards = entityData.map((data, index) => {
    const { result, isLoading, title } = data;

    return (
      <CowMilkProductionPreviewCard
        key={index}
        title={title}
        isLoading={isLoading}
        entity={data.entity}
        data={result?.bar}
      />
    );
  });

   // Update chart data based on selected frequency
  useEffect(() => {
    const updatedChartData = cowMilkProductionResult?.chart?.totalMilkProductionByCow?.map(cow => ({
      id: cow.id,
      totalMilk: cow.totalMilk[selectedFrequency],
    }));
    setChartData(updatedChartData);
  }, [cowMilkProductionResult,selectedFrequency]);

  // Data for monthly milk production line chart
  const dailyMilkData = cowMilkProductionResult?.chart?.dailyMilkProductionThisMonth.map(item => item.totalMilk) || Array.from({ length: new Date().getDate() }, () => 0);
  const dailySilageData = cowMilkProductionResult?.chart?.dailyMilkProductionThisMonth.map(item => item.totalSilage) || Array.from({ length: new Date().getDate() }, () => 0);


const daysInCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, index) => index + 1);

const lineChartDays = isMobileView ? daysInMonth.slice(-15) : daysInMonth;
  const lineChartMilkData = isMobileView ? dailyMilkData.slice(-15) : dailyMilkData;
  const lineChartSilageData = isMobileView ? dailySilageData.slice(-15) : dailySilageData;

// Data for weekly milk production bar chart
const milkProductionData = {
  series: [{
    name: 'Milk Production (Liters)',
    data: cowMilkProductionResult?.chart?.dailyMilkProduction || [0, 0, 0, 0, 0, 0, 0],
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    title: {
      text: 'Daily Milk Production This Week',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#1890ff'], // Light blue for milk production
  },
};

const SilageUsageData = {
  series: [{
    name: 'Silage Usage (Kg)',
    data: cowMilkProductionResult?.chart?.dailySilageUsage || [0, 0, 0, 0, 0, 0, 0],
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    title: {
      text: 'Daily Silage Usage This Week',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#95de64'], // Green for silage usage
  },
};
// Chart config for milk production by cow
  const milkProductionChartData = {
    series: [{
      name: 'Total Milk Production (Liters)',
      data: chartData?.map(cow => cow.totalMilk),
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: chartData?.map(cow => cow.id),
      },
      title: {
        text: 'Total Milk Production by Cow',
        align: 'left',
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
      curve: 'smooth',
    },
      colors: ['#1890ff'], // Light blue for milk production
    },
  };

// Milk production line chart config
const monthlyMilkProductionData = {
  series: [{
    name: 'Milk Production (Liters)',
    data: lineChartMilkData,
  }],
  options: {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: lineChartDays,
    },
    title: {
      text: 'Monthly Milk Production',
      align: 'left',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#1890ff'], // Light blue for milk production
  },
};

// Silage usage line chart config
const monthlySilageUsageData = {
  series: [{
    name: 'Silage Usage (Kg)',
    data: lineChartSilageData,
  }],
  options: {
    chart: {
      type: 'line',
      height: 350,
    },
   xaxis: {
      categories: lineChartDays,
      tickAmount: lineChartDays.length, // Ensure the labels are evenly spaced
      labels: {
        show: true, // Ensure x-axis labels are always visible
      },
    },
    title: {
      text: 'Monthly Silage Usage',
      align: 'left',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#95de64'], // Green for silage usage
  },
};




  return (
    <>
      <Row gutter={[32, 32]}>
        {/* Summary cards */}
        <SummaryCard
          title={translate('cows')}
          tagColor={'cyan'}
          prefix={translate('Total Cow')}
          isLoading={cowLoading}
          data={cowResult?.totalCows}
        />
        <SummaryCard
          title={translate('Milking Cow')}
          tagColor={'green'}
          prefix={translate('Total Cow')}
          isLoading={cowLoading}
          data={cowResult?.currentlyMilking}
        />
        <SummaryCard
          title={translate('Not milking Cow')}
          tagColor={'red'}
          prefix={translate('Total Cow')}
          isLoading={cowLoading}
          data={cowResult?.notMilking}
        />
        <SummaryCard
          title={translate('Total Milk Production')}
          tagColor={'purple'}
          prefix={translate('Today')}
          isLoading={cowMilkProductionLoading}
          data={cowMilkProductionResult?.bar?.totalToday?.totalMilk + ' Liter'}
        />
        <SummaryCard
          title={translate('Total Silage Used')}
          tagColor={'green'}
          prefix={translate('Today')}
          isLoading={cowMilkProductionLoading}
          data={cowMilkProductionResult?.bar?.totalToday?.totalSilage + ' Kg'}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <div className="whiteBox shadow" style={{ padding: '20px', height: '100%' }}>
          {statisticCards}
          {/* Weekly milk production bar chart */}
          <Chart
            options={milkProductionData.options}
            series={milkProductionData.series}
            type="bar"
            height={350}
          />
           {/* Weekly milk production bar chart */}
          <Chart
            options={SilageUsageData.options}
            series={SilageUsageData.series}
            type="bar"
            height={350}
          />
          {/* Monthly milk production line chart */}
          <Chart
            options={monthlyMilkProductionData.options}
            series={monthlyMilkProductionData.series}
            type="line"
            height={350}
            style={{ marginTop: '20px' }}
          />
          {/* Monthly silage usage line chart */}
          <Chart
            options={monthlySilageUsageData.options}
            series={monthlySilageUsageData.series}
            type="line"
            height={350}
            style={{ marginTop: '20px' }}
          />

        {/* Add a select dropdown for frequency */}
        <Select 
          defaultValue={selectedFrequency} 
          style={{ width: 200, marginBottom: '20px' }} 
          onChange={(value) => setSelectedFrequency(value)}
        >
          <Option value="today">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="year">This Year</Option>
          <Option value="total">Total</Option>
        </Select>
      
        {/* Milk production chart for each cow */}
        <Chart
          options={milkProductionChartData.options}
          series={milkProductionChartData.series}
          type="line"
          height={350}
        />
      
        </div>
      </Row>
      <div className="space30"></div>
    </>
  );
}
