import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { useStickyState } from '../helpers/useStickyState'
import Period from './Period'
import 'react-grid-layout/css/styles.css'
import './TimetableLayout.css'
import { Box, Button, HStack, layout } from '@chakra-ui/react'
import OptionsModal from '../options/OptionsModal'
import { useLayout } from '../store'
import { formatTime } from '../helpers/formatTime'

type Layout = any[]

const ReactGridLayout = WidthProvider(RGL)

const commonLayout = { maxW: 1 }

const labelLayout = { i: 'layout-label', x: 0, y: 0, w: 1, h: 1, static: true }

export default function TimetableLayout({ cols = 6, rowHeight = 150 }) {
  const { timeslots, days, label, periods } = useLayout()

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
        i: `period-${i}`,
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
      <HStack mb={4}>
        <OptionsModal />
      </HStack>
      <Box
        d="relative"
        border="solid 1px"
        borderRadius="md"
        borderColor="gray.300"
      >
        <ReactGridLayout
          className="layout"
          cols={cols}
          rowHeight={rowHeight}
          verticalCompact={false}
          layout={[
            ...timeslotLayout,
            ...periodLayout,
            ...dayLayout,
            labelLayout,
          ]}
          onLayoutChange={onLayoutChange}
        >
          <Period key="layout-label">{label}</Period>
          {timeslots.map((timeslot, i) => {
            return (
              <Period key={`timeslot-${i}`}>
                {formatTime(timeslot.from)} - {formatTime(timeslot.until)}
              </Period>
            )
          })}
          {days.map((day, i) => {
            return <Period key={`day-${i}`}>{day.label}</Period>
          })}
          {periods.map((period, i) => {
            return <Period key={`period-${i}`}>{period.type}</Period>
          })}
        </ReactGridLayout>
      </Box>
    </div>
  )
}
