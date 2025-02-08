// 生成随机颜色的工具函数
export const getRandomGradualColor = () => {
  const gradients = [
    { from: '#FF6B6B', to: '#FF8E8E' },
    { from: '#4ECDC4', to: '#45B7D1' },
    { from: '#96CEB4', to: '#FFEEAD' },
    { from: '#9B59B6', to: '#3498DB' },
    { from: '#1ABC9C', to: '#3498DB' },
    { from: '#F1C40F', to: '#FF9F43' },
    { from: '#6C5CE7', to: '#a363d9' },
    { from: '#00B4DB', to: '#0083B0' },
    { from: '#FF416C', to: '#FF4B2B' },
    { from: '#56CCF2', to: '#2F80ED' },
    { from: '#E100FF', to: '#7F00FF' },
    { from: '#43C6AC', to: '#191654' },
    { from: '#FFE000', to: '#799F0C' },
    { from: '#00C6FF', to: '#0072FF' },
    { from: '#F857A6', to: '#FF5858' },
    { from: '#16A085', to: '#F4D03F' },
    { from: '#7F7FD5', to: '#86A8E7' },
    { from: '#FDC830', to: '#F37335' },
    { from: '#11998E', to: '#38EF7D' },
    { from: '#FC466B', to: '#3F5EFB' }
  ]
  const gradient = gradients[Math.floor(Math.random() * gradients.length)]
  return `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
}
