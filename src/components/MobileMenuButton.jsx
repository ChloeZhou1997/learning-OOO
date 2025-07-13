import React from 'react'
import { Menu } from 'lucide-react'

const MobileMenuButton = ({ onClick }) => {
  return (
    <button 
      className="mobile-menu-button"
      onClick={onClick}
    >
      <Menu />
    </button>
  )
}

export default MobileMenuButton