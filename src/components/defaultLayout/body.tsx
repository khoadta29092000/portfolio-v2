import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import { menuItemHeader } from '.';

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
};

const BodyComponent: React.FC<TProps> = ({ activeTab, setActiveTab }) => {
  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();

  // State để lưu trữ id của tab đang active
  const [activeTabId, setActiveTabId] = useState('');

  // Effect để cập nhật activeTabId khi activeTab thay đổi
  useEffect(() => {
    const tab = menuItemHeader.find((item) => item.id === activeTab);
    if (tab) {
      setActiveTabId(`tab-${tab.id}`);
    }
  }, [activeTab]);

  useEffect(() => {
    const scrollToActiveTab = () => {
      if (!activeTabId) return;
      const activeTabElement = document.getElementById(activeTabId);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    };

    if (!isMd) {
      scrollToActiveTab();
    }
  }, [isMd, activeTabId]);

  return (
    <Fragment>
      {menuItemHeader.map((item, index) =>
        (isMd && activeTab === item.id) || !isMd ? (
          <Flex
            key={index}
            paddingTop="32px"
            h="100vh"
            bg={backgroundColor}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            id={`tab-${item.id}`}
          >
            <Text textColor={isLight ? 'black' : 'white'}>{item.title}</Text>
          </Flex>
        ) : null,
      )}
    </Fragment>
  );
};

export default BodyComponent;
