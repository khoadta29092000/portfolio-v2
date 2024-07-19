import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { FC } from 'react';

const contractLogo = [
  {
    src: '/icons/facebook-icon.svg',
    alt: 'Facebook',
    href: 'https://www.facebook.com/tiensidien1234/',
  },
  {
    src: '/icons/instagram-icon.svg',
    alt: 'Instagram',
    href: 'https://www.instagram.com/khoaanh2909/',
  },
];
const menuItem = [
  {
    title: 'myInfo',
    listItem: [
      { title: 'about', href: '' },
      { title: 'contract', href: '' },
    ],
  },
  {
    title: 'features',
    listItem: [
      { title: 'experiences', href: '' },
      { title: 'project', href: '' },
      { title: 'skills', href: '' },
    ],
  },
  {
    title: 'additional',
    listItem: [
      { title: 'certificate', href: '' },
      { title: 'education', href: '' },
    ],
  },
];

type TProps = {};

const Footer: FC<TProps> = () => {
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const { t } = useTranslation('common');
  return (
    <Box
      borderTop={isLight ? '1px solid #e0e0e0' : '1px solid #3e3e3e'}
      boxShadow={
        isLight
          ? '0px -4px 12px rgba(0, 0, 0, 0.1)'
          : '0px -4px 12px rgba(0, 0, 0, 0.1)'
      }
      bg={backgroundColor}
      padding={{ base: '12px  12px 64px 12px', ds: '12px 64px' }}
      transition="all 0.3s ease"
    >
      <Flex
        flexDirection={{ base: 'column', xl: 'row' }}
        justifyContent={{ base: 'flex-start', xl: 'space-between' }}
        gap={4}
      >
        <Flex
          w={{ base: '100%', md: '45%' }}
          marginRight={{ base: '0', md: '5%' }}
          maxW="624px"
          flexDirection="column"
          marginBottom="0px"
        >
          <Text
            color={isLight ? 'black' : 'white'}
            fontSize={{ base: '16px', md: '20px' }}
            fontWeight="700"
            fontFamily="ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
          >
            Do Tran Anh Khoa
          </Text>
          <Text
            fontFamily=" Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
            fontSize={{ base: '12px', md: '16px' }}
            color={isLight ? '65676B' : 'white'}
          >
            Front-End Developer
          </Text>
          <Flex
            padding="16px 0 12px 0"
            fontSize={{ base: '12px', md: '14px' }}
            alignItems="center"
          >
            <Image
              alt={'@c'}
              src={'/icons/Vector.svg'}
              width={13.33}
              height={13.33}
              style={{
                width: '13.33px',
                height: '13.33px',
              }}
            />
            <Text
              textColor={isLight ? '#65676B' : '#ADADAD'}
              fontSize="10px"
              marginLeft="4px"
            >
              2024 {t('copyRight')}
            </Text>
          </Flex>
          <Flex>
            {contractLogo.map((item, index) => {
              return (
                <Link
                  style={{ cursor: 'pointer' }}
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    alt={item.alt}
                    src={item.src}
                    width={32}
                    height={32}
                    style={{
                      width: '32px',
                      height: '32px',
                      marginLeft: '4px',
                      marginRight: '4px',
                    }}
                  />
                </Link>
              );
            })}
          </Flex>
        </Flex>
        <Grid
          marginTop={2}
          w={{ base: '100%', xl: '40%' }}
          templateColumns="repeat(3, 1fr)"
          gap="20px"
          display={{ base: 'none', ds: 'grid' }}
        >
          {menuItem.map((item, index) => {
            return (
              <GridItem fontSize="12px" key={index}>
                <Text
                  textTransform="uppercase"
                  fontWeight="700"
                  letterSpacing="1.2px"
                  lineHeight="12px"
                  marginBottom="6px"
                  textColor={isLight ? 'black' : 'white'}
                >
                  {t(item.title)}
                </Text>
                {item.listItem.map((link, index2) => {
                  return (
                    <Flex marginY="6px" key={index2}>
                      <Link href={link.href}>
                        <Text
                          textColor={isLight ? '#65676B' : '#E0E0E0'}
                          fontWeight="400"
                        >
                          {t(link.title)}
                        </Text>
                      </Link>
                    </Flex>
                  );
                })}
              </GridItem>
            );
          })}
        </Grid>
        <Accordion
          display={{ base: '', ds: 'none' }}
          defaultIndex={[0]}
          allowMultiple
        >
          {menuItem.map((item, index) => {
            return (
              <AccordionItem key={index} border="0px">
                <AccordionButton textColor={isLight ? 'black' : 'white'}>
                  <Box
                    textTransform="uppercase"
                    fontWeight="700"
                    fontSize="14px"
                    textColor={isLight ? 'black' : 'white'}
                    as="span"
                  >
                    {t(item.title)}
                  </Box>
                  <Flex marginLeft="auto">
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>

                {item.listItem.map((link, index2) => {
                  return (
                    <AccordionPanel fontSize="12px" key={index2} pb={4}>
                      <Link href={link.href}>
                        <Text
                          textColor={isLight ? '#65676B' : '#E0E0E0'}
                          fontWeight="400"
                        >
                          {t(link.title)}
                        </Text>
                      </Link>
                    </AccordionPanel>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Flex>
    </Box>
  );
};

export default Footer;

