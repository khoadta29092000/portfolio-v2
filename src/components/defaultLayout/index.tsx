import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import Menu from './menu';
import Header from './header';
import Footer from './footer';
import { usePortfolioIsLight } from '@/redux/home/selectors';
import BodyComponent from './body';
import AboutMeTabView from '../tabView/aboutMe';
import ExperiencesTabView from '../tabView/experiences';
import ProjectsTabView from '../tabView/projects';
import SkillsTabView from '../tabView/skills';
import EducationTabView from '../tabView/education';
import ContractTabView from '../tabView/contract';
import ThankTabView from '../tabView/thank';

type TProps = {
  isPy?: boolean;
  bg?: boolean;
};

export const menuItemHeader = [
  { id: 1, title: 'about', href: '#about', view: <AboutMeTabView /> },
  {
    id: 2,
    title: 'experiences',
    href: '#experiences',
    view: <ExperiencesTabView />,
  },
  { id: 3, title: 'project', href: '#project', view: <ProjectsTabView /> },
  { id: 4, title: 'skills', href: '#skills', view: <SkillsTabView /> },
  //{ id: 5, title: 'certificate', href: '#certificate', view: 'pink' },
  { id: 5, title: 'education', href: '#education', view: <EducationTabView /> },
  { id: 6, title: 'contract', href: '#contract', view: <ContractTabView /> },
  { id: 7, title: '', href: '', view: <ThankTabView /> },
  { id: 8, title: '', href: '', view: '' },
];

const DefaultLayout: FC<TProps> = () => {
  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });
  const isLight = usePortfolioIsLight();
  const [activeTab, setActiveTab] = useState(menuItemHeader[0].id);
  const handleScrollToPanel = (index: number) => {
    const element = document.getElementById(menuItemHeader[index].title);
    if (element) {
      element.scrollIntoView();
    }
  };
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative"
      overflowY={'hidden'}
      bg="#16191f"
    >
      <Header
        handleScrollToPanel={handleScrollToPanel}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* <Menu activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      <Flex
        overflowY="scroll"
        w="auto"
        direction="column"
        flex={1}
        bg={isLight ? '#f0f2f5' : '#26282d'}
        transition="all 0.3s ease"
      >
        <BodyComponent
          isMd={isMd}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Footer />
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;

