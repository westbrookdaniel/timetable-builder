import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = React.PropsWithChildren<
  {
    key: string
  } & React.HTMLAttributes<HTMLDivElement>
>

const Period = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        p={2}
        d="grid"
        placeItems="center"
        border="solid 1px"
        borderRadius="md"
        borderColor="gray.300"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

export default Period
