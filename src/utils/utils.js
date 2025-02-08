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
    { from: '#56CCF2', to: '#2F80ED' }
  ]
  const gradient = gradients[Math.floor(Math.random() * gradients.length)]
  return `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
}
