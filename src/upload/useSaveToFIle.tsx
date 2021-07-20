import { useLayout, usePeriodTypes } from '../store'

export default function useSaveToFile(): () => void {
  const layout = useLayout()
  const periodTypes = usePeriodTypes()

  return () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({
        layout,
        periodTypes,
      })
    )}`
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', `${layout.label}.ttb`)
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
}
