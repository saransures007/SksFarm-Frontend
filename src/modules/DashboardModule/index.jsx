import { useEffect } from 'react';
import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import CowMilkProductionPreviewCard from './components/CowMilkProductionPreviewCard';
import SummaryCard from './components/SummaryCard';

export default function DashboardModule() {
  const translate = useLanguage();

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
        data={result}
      />
    );
  });

  return (
    <>
      <Row gutter={[32, 32]}>
        <SummaryCard
          title={translate('cows')}
          tagColor={'cyan'}
          prefix={translate('Total Cow')}
          isLoading={cowLoading}
          data={cowResult?.totalCows}
        />
        <SummaryCard
          title={translate('Total Milk Production')}
          tagColor={'purple'}
          prefix={translate('Today')}
          isLoading={cowMilkProductionLoading}
          data={cowMilkProductionResult?.totalToday?.totalMilk}
        />
        <SummaryCard
          title={translate('Total Silage Used')}
          tagColor={'green'}
          prefix={translate('Today')}
          isLoading={cowMilkProductionLoading}
          data={cowMilkProductionResult?.totalToday?.totalSilage}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
          <div className="whiteBox shadow" style={{ padding: '20px', height: '100%'  }}>
              {statisticCards}
          </div>
      </Row>
      <div className="space30"></div>
    </>
  );
}
