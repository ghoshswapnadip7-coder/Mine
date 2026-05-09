import { memo } from 'react'

export default memo(function HeartsDivider() {
  return (
    <div className="hearts-divider">
      <i className="fas fa-heart h1"></i>
      <i className="fas fa-heart h2"></i>
      <i className="fas fa-heart h3"></i>
      <i className="fas fa-heart h4"></i>
      <i className="fas fa-heart h5"></i>
    </div>
  )
})
