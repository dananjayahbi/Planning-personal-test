import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleViewBikes = () => {
    navigate('/bike-ad');
  };

  const handleViewAnnexes = () => {
    navigate('/annex-ad');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
      <Card title="Bikes" style={{ width: 300 }}>
        <Button type="primary" onClick={handleViewBikes} block>
          View Bikes
        </Button>
      </Card>
      <Card title="Annexes" style={{ width: 300 }}>
        <Button type="primary" onClick={handleViewAnnexes} block>
          View Annexes
        </Button>
      </Card>
    </div>
  );
};

export default Home;
