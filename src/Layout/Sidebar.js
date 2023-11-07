import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../environment';
import { useNavigate} from 'react-router-dom';
import './Sidebar.css';


function Sidebar() {
    
  const [menuData, setMenuData] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const headers = {
    'Authorization': `Bearer ${authToken}`
  };
  const handleSubMenuClick = (controller) => {
    navigate(`/${controller}`);
  };
  useEffect(() => {
    axios
      .get(`${config.baseApiUrl}/api/RoleMenuController/GetMenusForRole`, {
        headers: headers,
      })
      .then((response) => {
        const organizedMenuData = organizeMenuData(response.data.result);
        setMenuData(organizedMenuData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const organizeMenuData = (menuItems) => {
    const menuMap = new Map();

    menuItems.forEach((menuItem) => {
      if (!menuMap.has(menuItem.parentMenuId)) {
        menuMap.set(menuItem.parentMenuId, []);
      }
      menuMap.get(menuItem.parentMenuId).push(menuItem);
    });

    const createMenuTree = (parentMenuId) => {
      const children = menuMap.get(parentMenuId) || [];
      if (children.length === 0) {
        return null;
      }

      return children.map((child) => ({
        ...child,
        children: createMenuTree(child.menuId),
      }));
    };

    return createMenuTree(0);
  };

  const handleMainMenuClick = (menu) => {
    setActiveMenu(menu.menuId === activeMenu ? null : menu.menuId);

    if(menu.children===null){
        handleSubMenuClick(menu.controller);
    }
  };

  const renderSubMenu = (menu) => {
    if (!menu.children) {
      return null;
    }

    return (
      <div className="sub-menu">
        {menu.children.map((child) => (
          <div key={child.menuId} className="menu-item" onClick={() => handleSubMenuClick(child.controller)}>
            {child.menuName}
            
          </div>
        ))}
      </div>
    )
  };

  const renderMenu = (menu) => (
  <div key={menu.menuId} className={`menu ${activeMenu === menu.menuId ? 'active' : ''}`}>
    <div
      onClick={() => handleMainMenuClick(menu)}
      style={{ cursor: 'pointer' }}
    >
      <div
        className={`menu-container ${activeMenu === menu.menuId ? 'active-menu' : ''}`}
      >
        <span style={{ marginRight: '10px' }}>{menu.menuName}</span>
        {menu.children && (
          <span className="toggle-icon" style={{ marginLeft: 'auto', fontSize: '14px' }}>
            {activeMenu === menu.menuId ? '▼' : '➤'}
          </span>
        )}
      </div>
    </div>
    {activeMenu === menu.menuId && renderSubMenu(menu)}
  </div>
);


  return (
    <div className="sidebar">
      {menuData ? menuData.map((menu) => renderMenu(menu)) : <p>Loading menu data...</p>}
    </div>
  );
}

export default Sidebar;
