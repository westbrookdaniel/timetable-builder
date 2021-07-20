import { Box } from '@chakra-ui/react'
import React from 'react'
import { usePeriodTypes } from '../store'

type Props = React.PropsWithChildren<
  {
    type: string
    key: string
  } & React.HTMLAttributes<HTMLDivElement>
>

const Period = React.forwardRef<HTMLDivElement, Props>(
  ({ children, type, ...props }, ref) => {
    const types = usePeriodTypes((s) => s.types)
    const colour = types.find((t) => t.label === type)?.colour
    return (
      <Box
        bg={colour}
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
