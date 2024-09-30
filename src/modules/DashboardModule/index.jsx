import { useEffect, useState } from 'react';
import { Row } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import CowMilkProductionPreviewCard from './components/CowMilkProductionPreviewCard';
import SummaryCard from './components/SummaryCard';
import Chart from 'react-apexcharts';

export default function DashboardModule() {
  const translate = useLanguage();
  const [isMobileView, setIsMobileView] = useState(false);

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

  // Weekly milk production data for the bar chart
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
    },
  };

  // Monthly milk production data for the line chart
  const dailyMilkData = cowMilkProductionResult?.chart?.dailyMilkProductionThisMonth || Array.from({ length: new Date().getDate() }, () => 0);
  const daysInMonth = Array.from({ length: new Date().getDate() }, (_, index) => index + 1);

  // Show only last 15 days for mobile view
  const lineChartDays = isMobileView ? daysInMonth.slice(-15) : daysInMonth;
  const lineChartData = isMobileView ? dailyMilkData.slice(-15) : dailyMilkData;

  const monthlyMilkProductionData = {
    series: [{
      name: 'Milk Production (Liters)',
      data: lineChartData,
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
        text: 'Montly Milk Production',
        align: 'left',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
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
          {/* Weekly bar chart */}
          <Chart
            options={milkProductionData.options}
            series={milkProductionData.series}
            type="bar"
            height={350}
          />
          {/* Monthly line chart */}
          <Chart
            options={monthlyMilkProductionData.options}
            series={monthlyMilkProductionData.series}
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
