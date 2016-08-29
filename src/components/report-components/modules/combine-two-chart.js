import dataURLtoBlob from 'blueimp-canvas-to-blob'
import { saveAs } from 'filesaver.js'

import { svg2img } from 'SRC/utils/utils'

export default function handleImageDownload(chart1, chart2, option = {
  save: true,
  filename: '未命名',
  width: '1200px',
  height: '800px'
}) {
  // 绘图
  const width = option.width
  const height = option.height
  const myCanvas = document.createElement('canvas')
  myCanvas.width = width
  myCanvas.height = height
  const myCanvasContext = myCanvas.getContext('2d')

  // Set the background color
  myCanvasContext.beginPath()
  myCanvasContext.rect(0, 0, width, height)
  myCanvasContext.fillStyle = 'white'
  myCanvasContext.fill()

  const svg1 = chart1.getSVG()
  const img1 = svg2img(svg1, { width: width / 2, height })
  const svg2 = chart2.getSVG()
  const img2 = svg2img(svg2, { width: width / 2, height })
  myCanvasContext.drawImage(img1, 0, 0)
  myCanvasContext.drawImage(img2, width / 2, 0)

  // 保存
  if (option.save) {
    return saveAs(dataURLtoBlob(myCanvas.toDataURL()), option.filename)
  }
  return myCanvas
}
