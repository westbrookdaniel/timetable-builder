import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { DownloadIcon, FolderOpenIcon } from '@heroicons/react/outline'
import { UploadIcon } from '@heroicons/react/solid'
import React, { useRef } from 'react'
import {
  LayoutState,
  PeriodTypesState,
  useLayout,
  usePeriodTypes,
} from '../store'
import useSaveToFile from './useSaveToFIle'

export default function UploadManger() {
  const toast = useToast()
  const saveToFile = useSaveToFile()
  const fileRef = useRef<HTMLInputElement>(null)
  const { setDays, setLabel, setPeriods, setTimeslots } = useLayout()
  const setTypes = usePeriodTypes((s) => s.setTypes)

  function handleChange(files: FileList | null) {
    if (files && files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result !== 'string') {
          return toast({
            title: 'Invalid file type',
            status: 'error',
          })
        }
        const contents = JSON.parse(reader.result)
        const fileLayout = contents.layout as LayoutState
        const filePeriodTypes = contents.periodTypes as PeriodTypesState
        if (!fileLayout && !filePeriodTypes) {
          return toast({
            title: 'Invalid file contents',
            status: 'error',
          })
        }
        setTypes(filePeriodTypes.types)
        setDays(fileLayout.days)
        setLabel(fileLayout.label)
        setPeriods(fileLayout.periods)
        setTimeslots(fileLayout.timeslots)
        return toast({
          title: 'Uploaded successfully',
          status: 'success',
        })
      })
      reader.readAsText(files[0])
    } else {
      toast({
        title: 'Unknown error occured',
        status: 'error',
      })
    }
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FolderOpenIcon width="20px" />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={saveToFile} icon={<DownloadIcon width="15px" />}>
          Save as
        </MenuItem>
        <MenuItem
          onClick={() => {
            fileRef.current?.click()
          }}
          icon={<UploadIcon width="15px" />}
        >
          Open file...
        </MenuItem>
        <input
          type="file"
          onChange={(e) => handleChange(e.target.files)}
          id="upload"
          ref={fileRef}
          hidden
        />
      </MenuList>
    </Menu>
  )
}
