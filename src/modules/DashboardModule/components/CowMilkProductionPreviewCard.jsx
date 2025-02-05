import { useMemo } from 'react';
import { Progress, Spin } from 'antd';
import useLanguage from '@/locale/useLanguage';

const colours = {
  totalToday: '#1890ff', // Light blue
  totalThisWeek: '#13c2c2', // Teal
  TotalThisMonth: '#722ed1', // Purple (New color for TotalThisMonth)
  totalMorning: '#73d13d', // Green for morning milk
  totalEvening: '#ffa940', // Orange for evening milk
  tmr: '#FF4D00', // Default green for silage
  pellets: '#FDA172', // Default green for silage
  silage: '#95de64', // Default green for silage
  milk: '#1890ff', // Default blue for milk
};

const defaultStatistics = [
  {
    tag: 'totalToday',
    totalMilk: 0,
    totalSilage: 0,
    totaltmr:0,
    totalpellets:0,
    expectedMilk: 100,
    expectedSilage: 100,
    expectedTmr:100,
    expectedPellets:100,
  },
  {
    tag: 'totalThisWeek',
    totalMilk: 0,
    totalSilage: 0,
    totaltmr:0,
    totalpellets:0,
    expectedMilk: 100,
    expectedSilage: 100,
    expectedTmr:100,
    expectedPellets:100,
  },
  {
    tag: 'TotalThisMonth',
    totalMilk: 0,
    totalSilage: 0,
    totaltmr:0,
    totalpellets:0,
    expectedMilk: 100,
    expectedSilage: 100,
    expectedTmr:100,
    expectedPellets:100,
  },
  {
    tag: 'totalMorning',
    totalMilk: 0,
    totalSilage: 0,
    totaltmr:0,
    totalpellets:0,
    expectedMilk: 100,
    expectedSilage: 100,
    expectedTmr:100,
    expectedPellets:100,
  },
  {
    tag: 'totalEvening',
    totalMilk: 0,
    totalSilage: 0,
    totaltmr:0,
    totalpellets:0,
    expectedMilk: 100,
    expectedSilage: 100,
    expectedTmr:100,
    expectedPellets:100,
  },
];

const PreviewState = ({ tag, color, totalMilk, totalSilage,totalpellets, totalTmr, expectedMilk, expectedSilage,expectedTmr,expectedPellets }) => {
  const translate = useLanguage();
  return (
    
    <div style={{ color: '#595959', marginBottom: 20, width: "300px", marginRight: '30px' }}>
      <div className="left alignLeft capitalize" style={{ color: color, fontWeight: 'bold' }}>
        {translate(tag)}
      </div>
      
      <div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Milk: <span style={{ fontWeight: 'bold' }}>{totalMilk} L / {expectedMilk} L</span>
      </div>
      {/* Milk Progress Bar */}
      <Progress
        percent={(totalMilk / expectedMilk) * 100 || 0}
        showInfo={false}
        strokeColor={colours.milkss} // Use respective color for milk
        style={{ flexGrow: 1, margin: '10px 0' }}
      />
      <div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Silage: <span style={{ fontWeight: 'bold' }}>{totalSilage} Kg / {expectedSilage} Kg</span>
      </div>
      {/* Silage Progress Bar */}
      <Progress
        percent={(totalSilage / expectedSilage) * 100 || 0}
        showInfo={false}
        strokeColor={colours.silage} // Use default silage color
        style={{ flexGrow: 1, margin: '10px 0' }}
      />
      <div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Tmr: <span style={{ fontWeight: 'bold' }}>{totalTmr} Kg / {expectedTmr} Kg</span>
      </div>
    {/* Tmr Progress Bar */}
      <Progress
        percent={(totalTmr / expectedTmr) * 100 || 0}
        showInfo={false}
        strokeColor={colours.tmr} // Use default silage color
        style={{ flexGrow: 1, margin: '10px 0' }}
      />

<div className="right alignRight" style={{ fontWeight: 'bold' }}>
        Pellets: <span style={{ fontWeight: 'bold' }}>{totalpellets} Kg / {expectedPellets} Kg</span>
      </div>
            {/* Silage Progress Bar */}
            <Progress
        percent={(totalpellets / expectedPellets) * 100 || 0}
        showInfo={false}
        strokeColor={colours.pellets} // Use default silage color
        style={{ flexGrow: 1, margin: '10px 0' }}
      />
    </div>
  );
};

export default function CowMilkProductionPreviewCard({
  title = 'Preview',
  data = {},
  isLoading = false,
}) {
  console.log("data CowMilkProductionPreviewCard", data);

  const statisticsMap = useMemo(() => {
    if (data && typeof data === 'object') {
      return Object.entries(data).map(([key, value]) => {
        const totalMilk = value?.totalMilk || 0;
        const totalSilage = value?.totalSilage || 0;
        const totalTmr= value?.totalSilage || 0;
        const totalpellets= value?.totalpellets || 0;
        const expectedMilk = value?.expectedMilk || 100;
        const expectedSilage = value?.expectedSilage || 100;
        const expectedTmr = value?.expectedTmr || 100;
        const expectedPellets = value?.expectedPellets || 100;

        return {
          tag: key,
          totalMilk,
          totalSilage,
          totalTmr,
          totalpellets,
          expectedMilk,
          expectedSilage,
          expectedTmr,
          expectedPellets,
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
            color: 'rgba(116, 42, 0, 0.5)', // Black color for title
            fontSize: 'large',
            marginBottom: 40,
            marginTop: 0,
            fontWeight: 'bold', // Bold title
            textShadow: '2px 2px 4px rgba(143, 134, 134, 0.5)', // Black shadow for title
          }}
        >
          {title}
        </h3>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 'full' }}>
            {statisticsMap
              .map((status, index) => (
                
                <PreviewState
                  key={index}
                  tag={status.tag}
                  color={colours[status.tag]}
                  totalMilk={status.totalMilk}
                  totalSilage={status.totalSilage}
                  totalTmr={status.totalTmr}
                  totalpellets={status.totalpellets}
                  expectedMilk={status.expectedMilk}
                  expectedSilage={status.expectedSilage}
                  expectedTmr={status.expectedTmr}
                  expectedPellets={status.expectedPellets}
                />
              ))
              .sort(customSort)}
          </div>
        )}
      </div>
    </div>
  );
}
