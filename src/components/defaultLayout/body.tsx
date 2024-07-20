import React, { useEffect, useRef } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { menuItemHeader } from '.';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
};

const BodyComponent: React.FC<TProps> = ({ activeTab, setActiveTab }) => {
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();

  return (
    <Flex scrollBehavior="smooth" w="auto" flexDirection="column">
      {menuItemHeader.map((item, index) => (
        <Flex
          key={index}
          paddingTop="32px"
          minHeight="100vh"
          bg={backgroundColor}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          //id={item.title}
          className="panel"
        >
          <Text color={isLight ? 'black' : 'white'}>{item.title}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default BodyComponent;
