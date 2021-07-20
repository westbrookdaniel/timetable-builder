import { Box, Icon, useToast } from '@chakra-ui/react'
import { XIcon } from '@heroicons/react/solid'
import debounce from 'lodash/debounce'
import React, { useRef, useState } from 'react'
import { useLayout, usePeriodTypes } from '../store'
import { EditableLabel } from './EditableLabel'

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
    onEdit?: (label: string) => void
  } & React.HTMLAttributes<HTMLDivElement>
>

const Period = React.forwardRef<HTMLDivElement, Props>(
  ({ children, identifier, type, label, className, onEdit, ...props }, ref) => {
    const toast = useToast()
    const types = usePeriodTypes((s) => s.types)
    const colour = types.find((t) => t.label === type)?.colour
    const removePeriod = useLayout((s) => s.removePeriod)
    const [draftLabel, setDraftLabel] = useState(label)

    function handleDelete() {
      if (identifier) {
        removePeriod(identifier.id)
      } else {
        toast({
          title: 'Unable to delete',
          status: 'error',
        })
      }
    }

    const debounced = useRef(
      debounce((l: string) => {
        if (!onEdit) return
        onEdit(l)
        setDraftLabel(l)
      }, 800)
    ).current
    function onLabelChange(l: string) {
      setDraftLabel(l)
      debounced(l)
    }

    return (
      <Box
        className={`periodCell ${className}`}
        bg={colour}
        p={2}
        d="grid"
        placeItems="center"
        border="solid 1px "
        borderColor={colour ? colour : 'gray.300'}
        ref={ref}
        {...props}
      >
        {onEdit ? (
          <EditableLabel value={draftLabel} onChange={onLabelChange} />
        ) : (
          label
        )}
        {children}
        {identifier ? (
          <Icon
            className="hideOnPrint"
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
