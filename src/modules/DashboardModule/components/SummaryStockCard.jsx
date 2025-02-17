import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';

export default function SummaryStockCard({
  title,
  tagColor,
  data,
  stockAvailable,
  predictedDays,
  prefix,
  isLoading = false,
}) {
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
        style={{ color: '#595959', fontSize: 13, minHeight: '106px', height: '100%' }}
      >
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3
            style={{
              color: '#22075e',
              fontSize: 'large',
              margin: '5px 0',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[3, 3]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                {prefix}
              </div>
            </Col>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <>
                  <Tooltip
                    title={`Stock Available: ${stockAvailable} | Predicted Days: ${predictedDays}`}
                    style={{
                      direction: 'ltr',
                    }}
                  >
                    <Tag
                      color={tagColor}
                      style={{
                        margin: '0 auto',
                        justifyContent: 'center',
                        maxWidth: '110px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        direction: 'ltr',
                      }}
                    >
                      {data}
                    </Tag>

                  </Tooltip>

                </>
              )}
            </Col>
          </Row>
          <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
          <Row gutter={[3, 3]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                {"Stock Available:"}
              </div>
            </Col>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <>
                  <Tooltip
                    title={`Stock Available: ${stockAvailable}`}
                    style={{
                      direction: 'ltr',
                    }}
                  >
                    <Tag
                      color={tagColor}
                      style={{
                        margin: '0 auto',
                        justifyContent: 'center',
                        maxWidth: '110px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        direction: 'ltr',
                      }}
                    >
                      {stockAvailable ? stockAvailable : 0 +" Bags"} 
                    </Tag>

                  </Tooltip>

                </>
              )}
            </Col>
          </Row>
          <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
          <Row gutter={[3, 3]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                {"predicted Days:"}
              </div>
            </Col>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <>
                  <Tooltip
                    title={`PredictedDays : ${predictedDays}`}
                    style={{
                      direction: 'ltr',
                    }}
                  >
                    <Tag
                      color={tagColor}
                      style={{
                        margin: '0 auto',
                        justifyContent: 'center',
                        maxWidth: '110px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        direction: 'ltr',
                      }}
                    >
                      {predictedDays ? predictedDays : 0 +" Days"} 
                    </Tag>

                  </Tooltip>

                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
}
