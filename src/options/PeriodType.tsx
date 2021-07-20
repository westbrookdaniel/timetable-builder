import { HStack, Icon, IconButton, Tag, TagLabel, Text } from '@chakra-ui/react'
import React from 'react'
import { XIcon } from '@heroicons/react/solid'

interface Props {
  onDelete: (label: string) => void
  label: string
  colour: string
}

const PeriodType: React.FC<Props> = ({ label, onDelete, colour }) => {
  return (
    <HStack spacing={4}>
      <Tag
        title={`${label}: ${colour}`}
        size="lg"
        borderRadius="full"
        bg={colour}
      >
        <TagLabel>{label}</TagLabel>
        <Icon
          cursor="pointer"
          onClick={() => onDelete(label)}
          as={XIcon}
          width={'15px'}
          ml={2}
        />
      </Tag>
    </HStack>
  )
}

export default PeriodType
