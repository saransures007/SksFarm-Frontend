import React from 'react';
import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';

export default function MilkSummaryCard({ 
  title, 
  tagColor, 
  data = {}, // Default to an empty object
  isLoading = false 
}) {
  // Function to determine the color of the value tag
  const getValueColor = (key) => {
    switch (key) {
      case 'totalMilk':
        return 'green';
      case 'avgSnf':
        return 'blue';
      case 'avgFat':
        return 'purple';
      case 'ratePerLiter':
        return 'orange';
      default:
        return tagColor; // Use the default color if no match
    }
  };

  // Function to format the ratePerLiter value with the rupee symbol
  const formatRate = (ratePerLiter) => {
    return ratePerLiter !== undefined ? `₹ ${ratePerLiter}` : 'N/A';
  };

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
    >
      <div
        className="whiteBox shadow"
        style={{ 
          color: '#595959', 
          fontSize: 13, 
          minHeight: '160px', 
          height: '100%' 
        }}
      >
        <div 
          className="pad15 strong" 
          style={{ 
            textAlign: 'center', 
            justifyContent: 'center' 
          }}
        >
          <h3
            style={{
              color: '#0b5394',
              fontSize: 'large',
              margin: '5px 0',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }} />
        <div className="pad15">
          {isLoading ? (
            <Spin />
          ) : (
            <Row gutter={[8, 8]} justify="start">
              {Object.entries(data).map(([key, value]) => (
                <Col 
                  span={24} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 0',
                  }}
                  key={key}
                >
                  <span 
                    style={{
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  >
                   {key === 'ratePerLiter' ? 'AvgRate': key}
                  </span>
                  <Tooltip title={value ?? 'N/A'}>
                    <Tag
                      color={getValueColor(key)}
                      style={{
                        margin: 0,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '100px',
                      }}
                    >
                      {key === 'ratePerLiter' ? formatRate(value): value}
                    </Tag>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </Col>
  );
}
