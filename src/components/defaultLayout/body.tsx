import React, { useEffect, useRef, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { menuItemHeader } from '.';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import { EThankYouBodyComponent } from '@/utils/type';

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
    if (isMd) {
      setActiveTab(1);
      sectionsRef.current[0]?.scrollIntoView({});
    }
  }, [isMd]);

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

        setTimeout(() => {
          sectionsRef.current[newIndex]?.scrollIntoView({});
          setActiveTab(menuItemHeader[newIndex].id);
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }, 300);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeTab, isScrolling, isMd]);

  return (
    <Flex w="auto" flexDirection="column">
      {menuItemHeader.map((item, index) => (
        <Flex
          transition="opacity 0.8s ease-in-out"
          key={item.id}
          paddingTop={item.id >= EThankYouBodyComponent ? '0' : '32px'}
          minHeight={
            item.id >= EThankYouBodyComponent ? '0' : isMd ? '100vh' : '100vh'
          }
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          //id={item.title}
          className="panel"
          opacity={
            !isMd ? 1 : activeTab === item.id || activeTab >= 7 ? 1 : 0.5
          }
          ref={(el) => {
            if (el) {
              sectionsRef.current[index] = el;
            }
          }}
        >
          {item.view}
        </Flex>
      ))}
    </Flex>
  );
};

export default BodyComponent;
