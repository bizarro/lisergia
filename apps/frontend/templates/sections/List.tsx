import { stegaClean } from '@sanity/client/stega'

import Button from '../components/Button'
import type { ListSection } from '../types'

export default function List({ section }: { section: ListSection }) {
  return (
    <div className="list">
      <div className="list__wrapper">
        <p className="list__label">{section.label}</p>

        <ul className="list__list">
          {section.list?.map((item, index) => (
            <li key={index} className="list__item">
              <a className="list__link" data-text={stegaClean(item.text)} href={stegaClean(item.url) ?? ''}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="list__button">
          <Button class="list__button__element" text={section.button?.text} url={section.button?.url} />
        </div>
      </div>
    </div>
  )
}
