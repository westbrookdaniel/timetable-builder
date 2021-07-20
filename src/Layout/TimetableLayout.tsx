import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import Period from './Period'
import 'react-grid-layout/css/styles.css'
import './TimetableLayout.css'
import { Box, HStack } from '@chakra-ui/react'
import OptionsModal from '../options/OptionsModal'
import { useLayout } from '../store'
import AddPeriod from '../options/AddPeriod'

const ReactGridLayout = WidthProvider(RGL)

const commonLayout = { maxW: 1 }

const labelLayout = { i: 'layout-label', x: 0, y: 0, w: 1, h: 1, static: true }

export default function TimetableLayout({ cols = 6, rowHeight = 60 }) {
  const {
    timeslots,
    days,
    label,
    periods,
    updateTimeslot,
    setLabel,
    setPeriods,
  } = useLayout()
  const [layout, setLayout] = useState<RGL.Layout[] | undefined>(undefined)

  function onLayoutChange(
    internal: RGL.Layout[],
    layout: RGL.Layout[] | undefined
  ) {
    if (!layout) return

    const newPeriodLayout = internal.filter(
      (layout) => layout.i.substring(0, 'period-'.length) === 'period-'
    )

    const newPeriods = newPeriodLayout.map((layout) => {
      const period = periods.find(
        (p) => p.id === layout.i.substring('period-'.length, layout.i.length)
      )
      if (!period) throw new Error('Period not found')
      return { ...period, size: layout.h, day: layout.x, timeslot: layout.y }
    })

    console.log(newPeriods)

    setPeriods(newPeriods)
  }

  useEffect(() => {
    const timeslotLayout = timeslots.map((timeslot, i) => {
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
    const dayLayout = days.map((day, i) => {
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

    const periodLayout = periods.map((period, i) => {
      return {
        i: `period-${period.id}`,
        x: period.day,
        y: period.timeslot,
        w: 1,
        h: period.size,
        ...commonLayout,
      }
    })

    setLayout([...timeslotLayout, ...dayLayout, ...periodLayout, labelLayout])
  }, [])

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
          layout={layout}
          onLayoutChange={(internalLayout) =>
            onLayoutChange(internalLayout, layout)
          }
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
