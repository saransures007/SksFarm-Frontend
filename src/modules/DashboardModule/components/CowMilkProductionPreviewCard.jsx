import { useMemo } from 'react';
import { Progress, Spin } from 'antd';
import useLanguage from '@/locale/useLanguage';

const colours = {
  totalToday: '#1890ff',
  totalThisWeek: '#13c2c2',
  totalMorning: '#95de64',
  totalEvening: '#ffa940',
};

const defaultStatistics = [
  {
    tag: 'totalToday',
    totalMilk: 0,
    totalSilage: 0,
    expectedMilk: 100,
    expectedSilage: 100,
  },
  {
    tag: 'totalThisWeek',
    totalMilk: 0,
    totalSilage: 0,
    expectedMilk: 100,
    expectedSilage: 100,
  },
  {
    tag: 'totalMorning',
    totalMilk: 0,
    totalSilage: 0,
    expectedMilk: 100,
    expectedSilage: 100,
  },
  {
    tag: 'totalEvening',
    totalMilk: 0,
    totalSilage: 0,
    expectedMilk: 100,
    expectedSilage: 100,
  },
];

const PreviewState = ({ tag, color, totalMilk, totalSilage, expectedMilk, expectedSilage }) => {
  const translate = useLanguage();
  return (
    <div style={{ color: '#595959', marginBottom: 20, width:"300px", marginRight: '30px' }}>
      <div className="left alignLeft capitalize" style={{ color: color, fontWeight: 'bold' }}>{translate(tag)}</div>
      <div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Milk: <span style={{ fontWeight: 'bold' }}>{totalMilk} L / {expectedMilk} L</span> 
      </div>
      <Progress
        percent={(totalMilk / expectedMilk) * 100 || 0}
        showInfo={false}
        strokeColor={{
          '0%': color,
          '100%': color,
        }}
        style={{ flexGrow: 1, margin: '10px 0' }} // Adjust margin for spacing
      />
      <div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Silage: <span style={{ fontWeight: 'bold' }}>{totalSilage} Kg / {expectedSilage} Kg</span>
      </div>
      <Progress
        percent={(totalSilage / expectedSilage) * 100 || 0}
        showInfo={false}
        strokeColor={{
          '0%': color,
          '100%': color,
        }}
        style={{ flexGrow: 1, margin: '10px 0' }} // Adjust margin for spacing
      />
    </div>
  );
};

export default function CowMilkProductionPreviewCard({
  title = 'Preview',
  data = {},  // Default to an empty object
  isLoading = false,
}) {
  console.log("data CowMilkProductionPreviewCard", data);

  const statisticsMap = useMemo(() => {
    if (data && typeof data === 'object') {
      return Object.entries(data).map(([key, value]) => {
        const totalMilk = value?.totalMilk || 0;
        const totalSilage = value?.totalSilage || 0;
        const expectedMilk = value?.expectedMilk || 100; // Default expected values
        const expectedSilage = value?.expectedSilage || 100;

        return {
          tag: key,
          totalMilk,
          totalSilage,
          expectedMilk,
          expectedSilage,
        };
      });
    } else {
      return defaultStatistics;
    }
  }, [data]);

  const customSort = (a, b) => {
    const colorOrder = Object.values(colours);
    const indexA = colorOrder.indexOf(colours[a.tag]);
    const indexB = colorOrder.indexOf(colours[b.tag]);
    return indexA - indexB;
  };

  return (
    <div
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
    >
      <div className="pad20">
        <h3
          style={{
            color: '#22075e',
            fontSize: 'large',
            marginBottom: 40,
            marginTop: 0,
          }}
        >
          {title}
        </h3>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 'full' }}> {/* Flex container with wrapping */}
            {statisticsMap
              .map((status, index) => (
                <PreviewState
                  key={index}
                  tag={status.tag}
                  color={colours[status.tag]}
                  totalMilk={status.totalMilk}
                  totalSilage={status.totalSilage}
                  expectedMilk={status.expectedMilk}
                  expectedSilage={status.expectedSilage}
                />
              ))
              .sort(customSort)}
          </div>
        )}
      </div>
    </div>
  );
}
