import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ArrowLeftFromLine, ArrowRightToLine, ChevronLeft, PowerOff } from 'lucide-react';
import { filterMenu } from '../lib/sidebar-menu';
import { ThemeToggle } from './theme/theme-toggle';

const Sidebar = ({ typeAcess }: { typeAcess: string }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menu = useMemo(() => filterMenu(typeAcess), [typeAcess]);

  return (
    <div className={`min-h-screen flex flex-col justify-between border-r shadow-[0_20px_50px_rgba(6,_10,_10,_0.2)] transition-width duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div>
        <div className="flex min-h-[120px] justify-center items-center border-b">
          <NavLink to="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: isCollapsed ? 40 : 100, height: isCollapsed ? 40 : 100 }}
            />
          </NavLink>
        </div>
        <div className={`transition-all duration-300 ${isCollapsed ? 'w-auto' : 'w-60'}`}>
          <ul className="list-none">
            {menu.map((item) => (
              <li key={item.id} title={item.label} className="group">
                {item.subMenu?.length === 0 ? (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-center py-4 gap-2 hover:bg-blue-800 hover:text-white-500 transition-colors duration-300 rounded-r-sm ${isCollapsed ? 'justify-center' : 'px-4'} ${isActive ? 'bg-blue-800 text-white-500' : ''}`
                    }
                    end
                  >
                    <item.icon className="cursor-pointer text-2xl" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </NavLink>
                ) : (
                  <button
                    onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                    className={`flex items-center w-full py-4 gap-2 hover:bg-blue-800 hover:text-white-500 transition-colors duration-200 rounded-r-sm ${isCollapsed ? 'justify-center' : 'px-4'} ${openMenu === item.id ? 'bg-blue-800 text-white-500' : ''}`}
                  >
                    <item.icon className="cursor-pointer text-2xl" />
                    {!isCollapsed && <span>{item.label}</span>}
                    {!isCollapsed && (
                      <ChevronLeft className={`ml-auto transition-transform ${openMenu === item.id ? 'rotate-90' : ''}`} />
                    )}
                  </button>
                )}

                {!isCollapsed && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenu === item.id ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="pl-10 mt-1 w-full">
                      {item.subMenu.map((subItem) => (
                        <li key={subItem.id}>
                          <NavLink
                            to={subItem.link}
                            className={({ isActive }) =>
                              `flex items-center py-4 gap-2 mt-1 w-full p-4 rounded-l-sm hover:bg-blue-800 hover:text-white-500 transition-colors duration-200 no-underline ${isActive ? 'bg-blue-800 text-white-500' : ''}`
                            }
                            end
                          >
                            <subItem.icon className="cursor-pointer text-2xl hover:text-white" />
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
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
