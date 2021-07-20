import { Box, Icon, useToast } from '@chakra-ui/react'
import { XIcon } from '@heroicons/react/solid'
import React from 'react'
import { useLayout, usePeriodTypes } from '../store'

interface Identifier {
  type: string
  id: string | number
}

type Props = React.PropsWithChildren<
  {
    identifier?: Identifier
    type?: string
    label: string
    key: string
  } & React.HTMLAttributes<HTMLDivElement>
>

const Period = React.forwardRef<HTMLDivElement, Props>(
  ({ children, identifier, type, label, ...props }, ref) => {
    const toast = useToast()
    const types = usePeriodTypes((s) => s.types)
    const colour = types.find((t) => t.label === type)?.colour
    const removePeriod = useLayout((s) => s.removePeriod)

    function handleDelete() {
      if (identifier) {
        removePeriod(identifier.id)
        toast({
          title: 'Successfully deleted',
          status: 'success',
        })
      } else {
        toast({
          title: 'Unable to delete',
          status: 'error',
        })
      }
    }

    return (
      <Box
        bg={colour}
        p={2}
        d="grid"
        placeItems="center"
        border="solid 1px "
        borderColor={colour ? colour : 'gray.300'}
        ref={ref}
        {...props}
      >
        {label}
        {identifier ? (
          <Icon
            position="absolute"
            top={0}
            left={0}
            cursor="pointer"
            onClick={handleDelete}
            as={XIcon}
            width={'15px'}
            m={2}
          />
        ) : null}
      </Box>
    )
  }
)

export default Period
