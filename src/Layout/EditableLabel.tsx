import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'

interface Props {
  value: string
  onChange: (label: string) => void
}

export function EditableLabel({ value, onChange }: Props) {
  return (
    <Editable textAlign="center" value={value} onChange={onChange}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
