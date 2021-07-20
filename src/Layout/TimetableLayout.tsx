import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import Period from './Period'
import 'react-grid-layout/css/styles.css'
import './TimetableLayout.css'
import { Box, HStack } from '@chakra-ui/react'
import OptionsModal from '../options/OptionsModal'
import { useLayout } from '../store'
import AddPeriod from '../options/AddPeriod'

type Layout = any[]

const ReactGridLayout = WidthProvider(RGL)

const commonLayout = { maxW: 1 }

const labelLayout = { i: 'layout-label', x: 0, y: 0, w: 1, h: 1, static: true }

export default function TimetableLayout({ cols = 6, rowHeight = 60 }) {
  const { timeslots, days, label, periods, updateTimeslot, setLabel } =
    useLayout()

  function onLayoutChange(newLayout: Layout) {}

  const timeslotLayout = React.useMemo(() => {
    return timeslots.map((timeslot, i) => {
      return {
        i: `timeslot-${i}`,
        x: 0,
        y: i + 1,
        w: 1,
        h: 1,
        static: true,
        ...commonLayout,
      }
    })
  }, [periods])

  const dayLayout = React.useMemo(() => {
    return days.map((day, i) => {
      return {
        i: `day-${i}`,
        x: i + 1,
        y: 0,
        w: 1,
        h: 1,
        static: true,
        ...commonLayout,
      }
    })
  }, [periods])

  const periodLayout = React.useMemo(() => {
    return periods.map((period, i) => {
      return {
        i: `period-${period.id}`,
        x: period.day,
        y: period.timeslot,
        w: 1,
        h: 1,
        ...commonLayout,
      }
    })
  }, [periods])

  return (
    <div>
      <HStack className="hideOnPrint" mb={4} justify="space-between">
        <Box mr={4}>
          <OptionsModal />
        </Box>
        <HStack>
          <AddPeriod />
        </HStack>
      </HStack>
      <Box
        d="relative"
        border="solid 1px"
        borderRadius="md"
        borderColor="gray.300"
        overflow="hidden"
      >
        <ReactGridLayout
          className="layout"
          cols={cols}
          rowHeight={rowHeight}
          verticalCompact={false}
          margin={[-1, -1]}
          layout={[
            ...timeslotLayout,
            ...periodLayout,
            ...dayLayout,
            labelLayout,
          ]}
          onLayoutChange={onLayoutChange}
        >
          <Period
            key="layout-label"
            onEdit={(l) => {
              setLabel(l)
            }}
            label={label}
          />
          {timeslots.map((timeslot, i) => {
            return (
              <Period
                onEdit={(l) => {
                  updateTimeslot({ id: timeslot.id, label: l })
                }}
                key={`timeslot-${i}`}
                label={timeslot.label}
              />
            )
          })}
          {days.map((day, i) => {
            return <Period key={`day-${i}`} label={day.label} />
          })}
          {periods.map((period, i) => {
            return (
              <Period
                type={period.type}
                identifier={{ type: 'period', id: period.id }}
                key={`period-${period.id}`}
                label={period.type}
              />
            )
          })}
        </ReactGridLayout>
      </Box>
    </div>
  )
}
