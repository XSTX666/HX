import { useRef, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import { ALL_REACTIONS } from '../data/reactions'

export default function EnergyDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentReaction, progress } = useAppStore()
  const reaction = currentReaction ? ALL_REACTIONS[currentReaction] : null

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !reaction) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const plotWidth = width - padding.left - padding.right
    const plotHeight = height - padding.top - padding.bottom

    // 清除画布
    ctx.clearRect(0, 0, width, height)

    // 绘制背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fillRect(0, 0, width, height)

    // 获取能量数据
    const energyData = reaction.energyProfile
    if (!energyData || energyData.length === 0) return

    // 计算坐标范围
    const maxEnergy = Math.max(...energyData) + 10
    const minEnergy = Math.min(...energyData) - 10
    const energyRange = maxEnergy - minEnergy

    // 绘制网格线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (plotHeight * i) / 4
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // 绘制坐标轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // 绘制能量曲线
    const points: [number, number][] = energyData.map((energy, i) => {
      const x = padding.left + (i / (energyData.length - 1)) * plotWidth
      const y = padding.top + ((maxEnergy - energy) / energyRange) * plotHeight
      return [x, y]
    })

    // 绘制渐变填充
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, 'rgba(79, 172, 254, 0.3)')
    gradient.addColorStop(1, 'rgba(79, 172, 254, 0.05)')

    ctx.beginPath()
    ctx.moveTo(points[0][0], height - padding.bottom)
    points.forEach(p => ctx.lineTo(p[0], p[1]))
    ctx.lineTo(points[points.length - 1][0], height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // 绘制曲线
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx = (prev[0] + curr[0]) / 2
      ctx.quadraticCurveTo(prev[0], prev[1], cpx, (prev[1] + curr[1]) / 2)
      ctx.quadraticCurveTo(curr[0], curr[1], curr[0], curr[1])
    }
    ctx.strokeStyle = '#4facfe'
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制数据点
    points.forEach((p, i) => {
      ctx.beginPath()
      ctx.arc(p[0], p[1], 4, 0, Math.PI * 2)
      ctx.fillStyle = i === 0 ? '#00f2c3' : '#4facfe'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // 绘制当前进度指示器
    const progressIndex = (progress / 100) * (energyData.length - 1)
    const currentIndex = Math.floor(progressIndex)
    const fraction = progressIndex - currentIndex

    if (currentIndex < points.length - 1) {
      const currentPoint = points[currentIndex]
      const nextPoint = points[currentIndex + 1]
      const x = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * fraction
      const y = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * fraction

      // 绘制当前位置指示器
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#ff6b4a'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // 绘制垂直虚线
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = 'rgba(255, 107, 74, 0.5)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // 绘制标签
    ctx.fillStyle = '#6a7090'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('反应进程', width / 2, height - 5)

    ctx.save()
    ctx.translate(10, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('能量', 0, 0)
    ctx.restore()

    // 绘制ΔH标签
    const lastEnergy = energyData[energyData.length - 1]
    const firstEnergy = energyData[0]
    const deltaH = lastEnergy - firstEnergy
    const deltaHText = `ΔH = ${deltaH > 0 ? '+' : ''}${deltaH.toFixed(0)} kJ/mol`
    ctx.fillStyle = deltaH < 0 ? '#00f2c3' : '#ff6b4a'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(deltaHText, width - padding.right, padding.top - 5)

  }, [reaction, progress])

  return (
    <div className="rounded-xl overflow-hidden" style={{
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(79,172,254,0.12)',
    }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '140px', display: 'block' }}
      />
    </div>
  )
}
