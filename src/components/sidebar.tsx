import { useState } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom for navigation
import Logo from '../assets/logo.svg';
import { ArrowLeftFromLine, ArrowRightToLine, ChevronLeft, PowerOff } from 'lucide-react';
import { filterMenu } from '../lib/sidebar-menu';
import { ThemeToggle } from './theme/theme-toggle';

const Sidebar = ({ typeAcess }: { typeAcess: string }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menu = filterMenu(typeAcess);
  const pathname = window.location.pathname;

  return (
    <div className="min-h-screen flex flex-col justify-between border-r shadow-[0_20px_50px_rgba(6,_10,_10,_0.2)]">
      <div>
        <Link to="/movimentation" className={`flex justify-center min-h-[120px] border-b `}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: isCollapsed ? 40 : 100, height: isCollapsed ? 40 : 100 }}
          />
        </Link>
        <div className={`${isCollapsed ? 'w-auto' : 'w-60'}`}>
          <ul className="list-none">
            {menu?.map((item) => (
              <li key={item.id} title={item.label} className="group">
                <Link
                  to={item.subMenu.length === 0 ? item.link : '#'}
                  onClick={() => {
                    if (item.subMenu.length > 0) {
                      setOpenMenu(openMenu === item.id ? null : item.id as null | string);
                    }
                  }}
                  className={`flex  items-center py-4 gap-2  transition-colors duration-200 no-underline hover:no-underline rounded-r-sm ${isCollapsed ? 'justify-center' : 'px-4'} ${pathname === item.link ? 'bg-blue-700 text-white-500' : ''}`}
                >
                  <item.icon className="cursor-pointer text-2xl hover:text-white" />
                  {!isCollapsed && <span>{item.label}</span>}
                  {item.subMenu.length > 0 && !isCollapsed && (
                    <ChevronLeft className={`ml-auto transition-transform justify-center ${openMenu === item.id ? 'rotate-90' : ''}`} />
                  )}
                </Link>
                {!isCollapsed && openMenu === item.id && (
                  <ul className="pl-10 mt-1">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.link}
                          className={`block mt-1  p-4 rounded-l-sm  transition-colors duration-200 no-underline hover:no-underline ${pathname === subItem.link ? 'bg-blue-700 text-white-500' : ''}`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${isCollapsed ? 'justify-center flex-col' : 'w-full justify-between'} flex items-center text-2xl p-4 border-t border-border gap-4`}>
        <ThemeToggle />
        <span title="Sair">
          <PowerOff className="cursor-pointer text-red-800" name="sign-out" aria-label="sign-out" onClick={() => console.log("quero sair")} />
        </span>
        <button name="toggleSidebar" onClick={() => setIsCollapsed((state) => !state)}>
          {isCollapsed ? (
            <span title="Expandir"><ArrowRightToLine aria-label="icon-double-right" /></span>
          ) : (
            <span title="Recuar"><ArrowLeftFromLine aria-label="icon-double-left" /></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
