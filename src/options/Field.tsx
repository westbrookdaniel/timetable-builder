import { Input, InputProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends InputProps {
  identifier: string
  label: string
}

export default function Field({ identifier, label, ...props }: Props) {
  return (
    <div>
      <Text htmlFor={identifier} as="label">
        {label}
      </Text>
      <Input id={identifier} mt={1} {...props} />
    </div>
  )
}
