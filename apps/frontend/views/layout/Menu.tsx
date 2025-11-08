import { Html } from "@elysiajs/html";
import type { PageData } from "@utilities/data";

interface MenuProps {
  menu: PageData['menu'],
  settings: PageData['settings']
}

export const Menu = ({ menu, settings }: MenuProps) => {
  return (
    <nav class="menu">
      <div class="menu__box">
          <ul class="menu__list">
              {menu.list.map((item) => (
                  <li class="menu__list__item">
                      <a class="menu__list__link" data-index="0" href={item.url}>{item.text}</a>
                  </li>
              ))}
          </ul>

          <ul class="menu__footer">
              {menu.sublist.map((item) => (
                  <li class="menu__footer__item">
                      <a class="menu__footer__link" href={item.url}>{item.text}</a>
                  </li>
              ))}
          </ul>

          <ul class="menu__social">
              {settings.social.list.map((item) => (
                  <li class="menu__social__item">
                      <a class="menu__social__link" href={item.url}>
                          {item.text}

                          <svg class="menu__social__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <use xlinkHref={`#${item.text.toLowerCase()}`}></use>
                          </svg>
                      </a>
                  </li>
              ))}
          </ul>
      </div>
  </nav>
  )
}
