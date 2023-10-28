import { Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductIntroPanel from './ProductIntroPanel';
import ProductOptionPanel from './ProductOptionPanel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `product-tab-${index}`,
    'aria-controls': `product-tabpanel-${index}`,
  };
}

export default function ProductTab({ content, setContent }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabConfigs = [
    {
      value: 'intro',
      label: '상품 소개 관리',
      content: <ProductIntroPanel content={content} setContent={setContent} />,
    },
    {
      value: 'option',
      label: '상품 옵션 관리',
      content: <ProductOptionPanel />,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={{ mt: 7 }} value={value} onChange={handleChange} aria-label='basic tabs example'>
          {tabConfigs.map((t, i, arr) => {
            return (
              <Tab
                key={i}
                sx={{ fontSize: 20, fontWeight: 'bold' }}
                label={t.label}
                {...a11yProps(i)}
              />
            );
          })}
        </Tabs>
      </Box>
      {tabConfigs.map((t, i, arr) => {
        return (
          <TabPanel key={i} value={value} index={i}>
            {t.content}
          </TabPanel>
        );
      })}
    </Box>
  );
}
