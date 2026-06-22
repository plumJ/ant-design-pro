import { Card, Col, Row } from 'antd';
import type { FC } from 'react';

interface AnnualCardProps {
  title: string;
  value: string;
}

const titleStyle: React.CSSProperties = {
  color: '#8c8c8c',
  fontSize: 14,
  marginBottom: 8,
};

const valueStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
};

const AnnualCard: FC<AnnualCardProps> = ({ title, value }) => (
  <Card variant="borderless">
    <div style={titleStyle}>{title}</div>
    <div style={valueStyle}>{value}</div>
  </Card>
);

const TopCards: FC = () => {
  return (
    <Row gutter={24} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <AnnualCard title="全年收入" value="￥2,360.00" />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <AnnualCard title="全年净销售净毛利" value="￥6,169.00" />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <AnnualCard title="全年净利润" value="￥1,122.00" />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <AnnualCard title="全年净利润率" value="15.0%" />
      </Col>
    </Row>
  );
};

export default TopCards;
