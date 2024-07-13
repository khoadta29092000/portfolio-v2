export enum ECountry {
    VN = 'vn',
    EN = 'en',
  }

export const getIconFlag = (currency: string): string => {
    switch (currency) {
      case ECountry.VN:
        return '/icons/flagVietnamese.svg';
      case ECountry.EN:
        return '/icons/flagAmerica.svg';
  
      default:
        return '';
    }
  };