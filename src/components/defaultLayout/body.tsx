import React, { useEffect, useRef, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { menuItemHeader } from '.';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
  isMd: boolean | undefined;
};

const BodyComponent: React.FC<TProps> = ({ activeTab, setActiveTab, isMd }) => {
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!isMd) return;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (isScrolling) return;

      const currentIndex = menuItemHeader.findIndex(
        (item) => item.id === activeTab,
      );
      let newIndex = currentIndex;

      if (event.deltaY > 0) {
        newIndex = Math.min(menuItemHeader.length - 1, currentIndex + 1);
      } else {
        newIndex = Math.max(0, currentIndex - 1);
      }

      if (newIndex !== currentIndex) {
        setIsScrolling(true);
        setActiveTab(menuItemHeader[newIndex].id);

        setTimeout(() => {
          sectionsRef.current[newIndex]?.scrollIntoView({});

          setTimeout(() => {
            setIsScrolling(false);
          }, 500);
        }, 300);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeTab, isScrolling, isMd]);
  console.log('activeTab', activeTab);

  return (
    <Flex scrollBehavior="smooth" w="auto" flexDirection="column">
      {menuItemHeader.map((item, index) => (
        <Flex
          transition="opacity 0.8s ease-in-out"
          key={item.id}
          paddingTop="32px"
          minHeight="100vh"
          bg={item.bg}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          id={item.title}
          className="panel"
          opacity={!isMd ? 1 : activeTab === item.id ? 1 : 0.5}
          ref={(el) => {
            if (el) {
              sectionsRef.current[index] = el;
            }
          }}
        >
          <Text color={isLight ? 'black' : 'white'}>{item.title}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default BodyComponent;

