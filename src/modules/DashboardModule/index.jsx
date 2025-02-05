import { useEffect, useState } from 'react';
import { Col, Row, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import CowMilkProductionPreviewCard from './components/CowMilkProductionPreviewCard';
import SummaryCard from './components/SummaryCard';
import Chart from 'react-apexcharts';
import MilkSummaryCard from './components/MilkSummaryCard';
import ReactECharts from 'echarts-for-react'; // ECharts wrapper for React

import { LuMilk } from 'react-icons/lu';  // For the "Milk" icon
import { FaChartBar } from 'react-icons/fa';  // For the "Analytics" icon
import { GiCow, GiMilkCarton } from 'react-icons/gi';  // For the "Cow" icon
import { FaFeatherAlt } from 'react-icons/fa'; // For "Feed" related icon
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { SiHappycow } from "react-icons/si";
import { FaLeaf } from "react-icons/fa";
export default function DashboardModule() {
  const translate = useLanguage();
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('today'); // Default frequency
  const [chartData, setChartData] = useState([]);
  const colorMapping = {
    revenue: 'rgb(0, 188, 212)', // Cyan for revenue
    profit: 'rgb(76, 175, 80)', // Green for profit
    cowExpense: 'rgb(141, 110, 99)', // Brown for cow-related expenses
    farmExpense: 'rgb(255, 152, 0)', // Orange for farm expenses
    feedExpense: 'rgb(255, 215, 0)', // Gold/yellow for feed expenses
    totalExpense: 'rgb(255, 77, 77)', // Light red for total expenses
    overallProfit: 'rgb(0, 128, 0)', // Dark green for overall profit
    overallTotalExpense: 'rgb(255, 102, 102)', // Slightly different light red for overall total expenses
  };
  

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

  const {
    result: feedStocklevelResult,
    isLoading: feedStocklevelResultLoading,
    onFetch: fetchfeedStocklevelStats,
  } = useOnFetch();

  const {
    result: totalMilkProductionResult,
    isLoading: totalMilkProductionLoading,
    onFetch: fetchtotalMilkProductionStats,
  } = useOnFetch();

  const {
    result:farmExpenseResult,
    isLoading: farmExpenseLoading,
    onFetch: fetchFarmExpenseStats,
  } = useOnFetch();

  console.log("farmExpenseResult", farmExpenseResult);
  useEffect(() => {
    fetchcowsStats(getStatsData({ entity: 'cow' }));
    fetchcowMilkProductionStats(getStatsData({ entity: 'cowMilkProduction' }));
    fetchfeedStocklevelStats(getStatsData({ entity: 'feedStockLevels' }));
    fetchtotalMilkProductionStats(getStatsData({ entity: 'totalMilkProduction' }));
    fetchFarmExpenseStats(getStatsData({ entity: 'farmExpense' }));

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
      title: translate('Cow Milk Production Bar'),
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
    console.log("cowMilkProductionResult",cowMilkProductionResult)
    const updatedChartData = cowMilkProductionResult?.chart?.milkProductionByCow?.map(cow => ({
      id: cow.name ?  cow.name+' - ' + cow.id : 'Cow - '+cow.id,
      totalMilk: cow.milkProduction[selectedFrequency],
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
      text: 'Daily Week Milk Production In Farm',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#1890ff'], // Light blue for milk production
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
      text: 'Monthly Milk Production In Farm',
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
      text: 'Monthly Silage Usage in Farm',
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


// Monthly and daily milk production charts
const monthByMonthThisYearData = {
  series: [{
    name: 'Milk Production (Liters)',
    data: totalMilkProductionResult?.monthByMonthThisYear.map(item => item.totalMilk) || [0],
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: totalMilkProductionResult?.monthByMonthThisYear.map(item => `Month ${item._id.month}`) || [],
    },
    title: {
      text: 'Monthly Milk Production This Year',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    colors: ['#1890ff'], // Light blue for milk production
  },
};

const dayByDayThisMonthData = {
  series: [
    {
      name: 'Milk Production (Liters)',
      data: totalMilkProductionResult?.dayByDayThisMonth.map(item => item.totalMilk) || [0],
      color: '#1890ff', // Light blue
    },
    {
      name: 'Avg SNF',
      data: totalMilkProductionResult?.dayByDayThisMonth.map(item => item.avgSnf) || [0],
      color: '#52c41a', // Green
    },
    {
      name: 'Avg Fat',
      data: totalMilkProductionResult?.dayByDayThisMonth.map(item => item.avgFat) || [0],
      color: '#faad14', // Yellow
    },
    {
      name: 'Rate Per Liter',
      data: totalMilkProductionResult?.dayByDayThisMonth.map(item => item.ratePerLiter) || [0],
      color: '#f5222d', // Red
    }
  ],
  options: {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: totalMilkProductionResult?.dayByDayThisMonth.map(item => ` ${item.date}`) || [],
    },
    title: {
      text: 'Daily Milk Production & Quality This Month',
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#1890ff', '#52c41a', '#faad14', '#f5222d'], // Matching series colors
    markers: {
      size: 4,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  },
};


const Monthlyprofit = parseFloat(totalMilkProductionResult?.thisMonth?.income) - parseFloat(farmExpenseResult?.totalExpense?.monthly); 
const overallProfit =  parseFloat(totalMilkProductionResult?.overall?.income) - parseFloat(farmExpenseResult?.totalExpense?.overall); 
const MonthlyRevenueFarmData = [
  { name: 'Monthly Revenue', value: totalMilkProductionResult?.thisMonth?.income, color: colorMapping.revenue },
  { name: 'Cow Expense monthly', value: farmExpenseResult?.cowExpense?.monthly, color: colorMapping.cowExpense },
  { name: 'Farm Expense monthly', value: farmExpenseResult?.farmExpense?.monthly, color: colorMapping.farmExpense },
  { name: 'Feed Expense monthly', value: farmExpenseResult?.feedInventoryExpense?.monthly, color: colorMapping.feedExpense },
];

const MonthlyIncomeFarmData = [
  { name: 'Monthly Profit', value: Monthlyprofit, color: colorMapping.profit },
  { name: 'Total Expense monthly', value: farmExpenseResult?.totalExpense?.monthly, color: colorMapping.totalExpense },
];

const OverallRevenueFarmData = [
  { name: 'Overall Revenue', value: totalMilkProductionResult?.overall?.income, color: colorMapping.revenue },
  { name: 'Cow Expense overall', value: farmExpenseResult?.cowExpense?.overall, color: colorMapping.cowExpense },
  { name: 'Farm Expense overall', value: farmExpenseResult?.farmExpense?.overall, color: colorMapping.farmExpense },
  { name: 'Feed Expense overall', value: farmExpenseResult?.feedInventoryExpense?.overall, color: colorMapping.feedExpense },
];

const OverallIncomeFarmData = [
  { name: 'Overall Profit', value: overallProfit, color: colorMapping.overallProfit },
  { name: 'Total Expense overall', value: farmExpenseResult?.totalExpense?.overall, color: colorMapping.overallTotalExpense },
];


// MonthlyFarmData Pie chart configuration
const MonthlyFarmPieData = MonthlyIncomeFarmData.map(item => ({
  value: item.value,
  name: item.name,
  itemStyle: { color: item.color },
}));
;

const OverallFarmPieData = OverallRevenueFarmData.map(item => ({
  value: item.value,
  name: item.name,
  itemStyle: { color: item.color },
}));
;





const MonthlyFarmPieChartOption = {
  title: {
    text: 'Monthly Profit Vs Expense ',
    subtext: 'Profit, Revenue',
    left: 'top',
    top: 'top',
    textStyle: {
      color:  'rgb(65, 52, 255)',  // Add your desired color here
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: [
    {
      name: 'Monthly Farm Data',
      type: 'pie',
      radius: '60%',
      data: MonthlyFarmPieData,
      label: {
        formatter: '{b}: {d}%',
      },
    },
  ],
};

// Overall Income Pie Chart
const OverallIncomePieChartOption = {
  title: { 
    subtext: 'Profit, Revenue',
    text: 'Overall Profit Vs Expense', left: 'top' ,
    textStyle: {
      color:  'rgb(65, 52, 255)',  // Add your desired color here
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: OverallIncomeFarmData.map(item => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color },
      })),
      label: {
        formatter: '{b}: {d}%',
      },
    },
  ],
};

// Bar Chart for MonthlyFarmData:

const MonthlyFarmBarChartOption = {
  title: {
    text: 'Monthly Expense Vs Revenue ',
    left: 'top',
    textStyle: {
      color:  'rgb(224, 64, 233)',  // Add your desired color here
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  xAxis: {
    type: 'category',
    data: MonthlyRevenueFarmData.map(item => item.name),
    axisLabel: { rotate: 15 },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: MonthlyRevenueFarmData.map(item => ({
        value: item.value,
        itemStyle: { color: item.color },
      })),
    },
  ],
};


// Overall Revenue Bar Chart
const OverallRevenueBarChartOption = {
  title: {
    text: 'Overall Revenue Vs Expense',
    left: 'top',
    textStyle: {
      color:  'rgb(224, 64, 233)',  // Add your desired color here
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: OverallRevenueFarmData.map(item => item.name), axisLabel: { rotate: 15 } },
  yAxis: { type: 'value' },
  series: [
    {
      type: 'bar',
      data: OverallRevenueFarmData.map(item => ({
        value: item.value,
        itemStyle: { color: item.color },
      })),
    },
  ],
};


  return (
    <>
        <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} >
                <div style={{ width: '100%', height: '400px',  }}>
                  <ReactECharts  option={MonthlyFarmPieChartOption} />
                </div>
              </Col>

              <Col xs={24} sm={12}>
                <div style={{ width: '100%', height: '400px' }}>
                  <ReactECharts option={MonthlyFarmBarChartOption} />
                </div>
              </Col>
              <SummaryCard
                title={translate('Monthly Profit')}
                tagColor={colorMapping.profit}
                prefix={translate('Monthly profit')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + Monthlyprofit}
              />
                    <SummaryCard
                title={translate('Total Expense')}
                tagColor={colorMapping.totalExpense}
                prefix={translate(' Monthly Total Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.totalExpense?.monthly}
              />
              <SummaryCard
                title={translate('Monthly Revenue')}
                tagColor={colorMapping.revenue}
                prefix={translate('Monthly Revenue')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + totalMilkProductionResult?.thisMonth?.income}
              />

              <SummaryCard
                title={translate('Cow Expense')}
                tagColor={colorMapping.cowExpense}
                prefix={translate('Monthly Cow Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.cowExpense?.monthly}
              />
              <SummaryCard
                title={translate('Farm Expense')}
                tagColor={colorMapping.farmExpense}
                prefix={translate('Monthly Farm Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.farmExpense?.monthly}
              />
              <SummaryCard
                title={translate('Feed Expense')}
                tagColor={colorMapping.feedExpense}
                prefix={translate('Monthly Feed')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.feedInventoryExpense?.monthly}
              />

      </Row>
  <div className="space70"></div>
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={12}>
                <div style={{ width: '100%', height: '400px' }}>
                  <ReactECharts option={OverallIncomePieChartOption} />
                </div>
                </Col>
                  {/* Overall Revenue Bar Chart & Overall Income Pie Chart */}
                <Col xs={24} sm={12}>
                  <div style={{ width: '100%', height: '400px' }}>
                    <ReactECharts option={OverallRevenueBarChartOption} />
                  </div>
                </Col>

          </Row>
    <div className="space70"></div>
      <Row gutter={[32, 32]}>

            <SummaryCard
                title={translate('Overall Profit')}
                tagColor={colorMapping.overallProfit}
                prefix={translate('Overall profit')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + overallProfit}
              />
                    <SummaryCard
                title={translate('Total Expense')}
                tagColor={colorMapping.totalExpense}
                prefix={translate(' Overall Total Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.totalExpense?.overall}
              />
              <SummaryCard
                title={translate('Overall Revenue')}
                tagColor={colorMapping.revenue}
                prefix={translate('Overall Revenue')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + totalMilkProductionResult?.overall?.income}
              />

              <SummaryCard
                title={translate('Cow Expense')}
                tagColor={colorMapping.cowExpense}
                prefix={translate('Overall Cow Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.cowExpense?.overall}
              />
              <SummaryCard
                title={translate('Farm Expense')}
                tagColor={colorMapping.farmExpense}
                prefix={translate('Overall Farm Expense')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.farmExpense?.overall}
              />
              <SummaryCard
                title={translate('Feed Expense')}
                tagColor={colorMapping.feedExpense}
                prefix={translate('Overall Feed')}
                isLoading={totalMilkProductionLoading}
                data={'₹' + farmExpenseResult?.feedInventoryExpense?.overall}
              />

        </Row>
      <div className="space70"></div>

          <h3
                style={{
                  color: 'rgb(0, 89, 255)',
                  fontSize: 'large',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(126, 119, 119, 0.73)',
                }}
              >
                <SiHappycow size={30} style={{ marginRight: '10px', }} />
                {"Cow Details"}
              </h3>
              <div className="space2"></div>
              <Row gutter={[32, 32]}>
              <SummaryCard
                  title={translate('Total Cow')}
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
          </Row>


    
      <div className="space30"></div>
        <h3
                style={{
                  color: 'rgb(35, 181, 83)',
                  fontSize: 'large',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(223, 223, 223, 0.73)',
                }}
              >
                <FaLeaf size={30} style={{ marginRight: '10px', }} />
                {"Stock Details"}
        </h3>
      <div className="space2"></div>
        <Row gutter={[32, 32]}>
            <SummaryCard
              title={translate('Silage Stock')}
              tagColor={'green'}
              prefix={translate('Silage')}
              isLoading={feedStocklevelResultLoading}
              data={feedStocklevelResult?.totalSilageStock+ ' Kg'}
            />

            <SummaryCard
              title={translate('TMR Stock')}
              tagColor={'cyan'}
              prefix={translate('TMR')}
              isLoading={feedStocklevelResultLoading}
              data={feedStocklevelResult?.totalTMRFeedStock}
            />

            <SummaryCard
              title={translate('Pellets Stock')}
              tagColor={'cyan'}
              prefix={translate('Pellets')}
              isLoading={feedStocklevelResultLoading}
              data={feedStocklevelResult?.totalPelletFeedStock}
            />
        </Row>
 

      <div className="space30"></div>
      <Row gutter={[32, 32]}>
      <h3
                style={{
                  color: 'rgb(51, 161, 246)',
                  fontSize: 'large',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(223, 223, 223, 0.73)',
                }}
              >
                <LuMilk size={30} style={{ marginRight: '10px', }} />
                {"Total Milk Production Details"}
              </h3>
              <div className="space2"></div>
          <MilkSummaryCard
                      title={translate('Today Milk production')}
                      tagColor={'green'}
                      prefix={translate('Milk production')}
                      isLoading={totalMilkProductionLoading}
                      data={totalMilkProductionResult?.today}
            />
          <MilkSummaryCard
                      title={translate('This Week Milk production')}
                      tagColor={'green'}
                      prefix={translate('Milk production')}
                      isLoading={totalMilkProductionLoading}
                      data={totalMilkProductionResult?.thisWeek}
            />
          <MilkSummaryCard
                      title={translate('This Month Milk production')}
                      tagColor={'green'}
                      prefix={translate('Milk production')}
                      isLoading={totalMilkProductionLoading}
                      data={totalMilkProductionResult?.thisMonth}
            />
          <MilkSummaryCard
                      title={translate('This Year Milk production')}
                      tagColor={'green'}
                      prefix={translate('Milk production')}
                      isLoading={totalMilkProductionLoading}
                      data={totalMilkProductionResult?.thisYear}
            />
          <MilkSummaryCard
                      title={translate('Overall Milk production')}
                      tagColor={'green'}
                      prefix={translate('Milk production')}
                      isLoading={totalMilkProductionLoading}
                      data={totalMilkProductionResult?.overall}
            />
      </Row>
      

      <div className="space30"></div>
      
      <Row gutter={[32, 32]}>
        
        <div className="whiteBox shadow" style={{ padding: '20px', height: '100%' }}>
          {statisticCards}
        </div>
        
        <div className="whiteBox shadow" style={{ padding: '20px', height: '100%' }}>
          <h3
            style={{
              color: 'rgb(44, 128, 255)',
              fontSize: 'large',
              marginBottom: 40,
              marginTop: 0,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(207, 179, 179, 0.5)',
            }}
          >
            <FaChartBar size={30} style={{ marginRight: '10px' }} />
            {"Total Milk Production Analysis"}
          </h3>
          <Chart
            options={monthByMonthThisYearData.options}
            series={monthByMonthThisYearData.series}
            type="bar"
            height={350}
          />
          <Chart
            options={dayByDayThisMonthData.options}
            series={dayByDayThisMonthData.series}
            type="line"
            height={350}
          />
        </div>

        <div className="whiteBox shadow" style={{ padding: '20px', height: '100%' }}>
          <h3
            style={{
              color: 'rgb(5, 25, 208)',
              fontSize: 'large',
              marginBottom: 40,
              marginTop: 0,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(207, 179, 179, 0.5)',
            }}
          >
            <GiCow size={30} style={{ marginRight: '10px', marginTop: '0px' }} />
            {"Each Cow Milk Production Data"}
          </h3>
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
          <Chart
            options={milkProductionChartData.options}
            series={milkProductionChartData.series}
            type="line"
            height={350}
          />
        </div>

        <div className="whiteBox shadow" style={{ padding: '20px', height: '100%' }}>
          <h3
            style={{
              color: 'rgb(5, 208, 15)',
              fontSize: 'large',
              marginBottom: 40,
              marginTop: 0,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(207, 179, 179, 0.5)',
            }}
          >
            <FaFeatherAlt size={30} style={{ marginRight: '10px' }} />
            {"Farm Milk and Feed Analysis"}
          </h3>
          <Chart
            options={milkProductionData.options}
            series={milkProductionData.series}
            type="bar"
            height={350}
          />
          <Chart
            options={monthlyMilkProductionData.options}
            series={monthlyMilkProductionData.series}
            type="line"
            height={350}
            style={{ marginTop: '20px' }}
          />
          <Chart
            options={monthlySilageUsageData.options}
            series={monthlySilageUsageData.series}
            type="line"
            height={350}
            style={{ marginTop: '20px' }}
          />
        </div>
      </Row>
      <div className="space30"></div>


    </>
  );
}
