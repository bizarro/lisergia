import { stegaClean } from '@sanity/client/stega'

import { lowercase } from '../helpers'
import type { Menu as MenuData, Settings } from '../types'

interface MenuProps {
  menu: MenuData
  settings: Settings
}

export default function Menu({ menu, settings }: MenuProps) {
  return (
    <nav className="menu">
      <div className="menu__box">
        <ul className="menu__list">
          {menu.list?.map((item, index) => (
            <li key={index} className="menu__list__item">
              <a className="menu__list__link" data-index="0" href={stegaClean(item.url)}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <ul className="menu__footer">
          {menu.sublist?.map((item, index) => (
            <li key={index} className="menu__footer__item">
              <a className="menu__footer__link" href={stegaClean(item.url)}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <ul className="menu__social">
          {settings.social?.list?.map((item, index) => (
            <li key={index} className="menu__social__item">
              <a className="menu__social__link" href={stegaClean(item.url)}>
                {item.text}

                <svg className="menu__social__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref={`#${lowercase(item.text)}`}></use>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
