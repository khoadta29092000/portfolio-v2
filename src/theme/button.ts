const button = {
  baseStyle: {
    borderRadius: '5px',
    color: 'white',
  },
  sizes: {
    sm: {},
    md: {},
    lg: {},
    xl: {},
  },
  variants: {
    solid: {},
    primary: {
      bg: 'primary.600',
      '&:hover': {
        bg: 'primary.700',
      },
    },
    secondary: {
      bg: 'secondary.500',
      '&:hover': {
        bg: 'secondary.600',
      },
    },
    warning: {
      bg: 'warning.500',
      '&:hover': {
        bg: 'warning.600',
      },
      color: '#4E0000',
    },
    negative: {
      bg: 'negative.500',
      '&:hover': {
        bg: 'negative.600',
      },
    },
    positive: {
      bg: 'positive.500',
      '&:hover': {
        bg: 'positive.600',
      },
    },
    info: {
      bg: 'info.500',
      '&:hover': {
        bg: 'info.600',
      },
    },
  },

  defaultProps: {
    size: 'md',
    variant: 'warning',
  },
};

export default button;
