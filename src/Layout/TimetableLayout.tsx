import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { useStickyState } from '../helpers/useStickyState'
import Period from '../Period'
import 'react-grid-layout/css/styles.css'
import './TimetableLayout.css'

type Layout = any[]

const ReactGridLayout = WidthProvider(RGL)
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default function TimetableLayout({
  className = 'layout',
  cols = 12,
  rowHeight = 150,
}) {
  const [layout, setLayout] = useStickyState<Layout>([], 'layout')

  function resetLayout() {
    setLayout([])
  }

  function onLayoutChange(newLayout: Layout) {
    setLayout(newLayout)
  }

  return (
    <div>
      <button onClick={resetLayout}>Reset Layout</button>
      <div className="relative">
        <ReactGridLayout
          className="layout"
          cols={cols}
          rowHeight={rowHeight}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          <Period key="1" grid={{ w: 2, h: 3, x: 0, y: 0 }}>
            1
          </Period>
          <Period key="2" grid={{ w: 2, h: 3, x: 2, y: 0 }}>
            2
          </Period>
          <Period key="3" grid={{ w: 2, h: 3, x: 4, y: 0 }}>
            3
          </Period>
          <Period key="4" grid={{ w: 2, h: 3, x: 6, y: 0 }}>
            4
          </Period>
          <Period key="5" grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            5
          </Period>
        </ReactGridLayout>
      </div>
    </div>
  )
}
