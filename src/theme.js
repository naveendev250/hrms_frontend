import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
      },
      sizes: {
        xs: {
          fontSize: '11px',
          px: 2,
          py: 1,
        },
        sm: {
          fontSize: '12px',
          px: 3,
          py: 1.5,
        },
      },
    },
    Table: {
      sizes: {
        sm: {
          th: {
            px: 3,
            py: 2,
            fontSize: '10px',
          },
          td: {
            px: 3,
            py: 2,
            fontSize: '11px',
          },
        },
      },
    },
  },
  fontSizes: {
    xs: '11px',
    sm: '12px',
    md: '13px',
    lg: '14px',
    xl: '16px',
  },
})

export default theme
