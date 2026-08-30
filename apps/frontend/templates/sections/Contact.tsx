import { parseHTML } from '../helpers'
import type { ContactSection } from '../types'

export default function Contact({ section }: { section: ContactSection }) {
  return (
    <section className="contact">
      <div className="contact__wrapper">
        <div className="contact__box">
          {section.list?.map((item, index) => (
            <article key={index} className="contact__section">
              <h2 className="contact__section__title">{item.title}</h2>

              <div
                className="contact__section__description"
                dangerouslySetInnerHTML={{ __html: parseHTML(item.description) }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
