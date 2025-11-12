import { Html } from "@elysiajs/html"
import { PageData } from "@utilities/data"

interface ContactProps {
  list: {
    title: string
    description: any
  }[]
  parseHTML: PageData['parseHTML']
}

const Contact = ({ list, parseHTML }: ContactProps) => {
  return (
    <section class="contact">
      <div class="contact__wrapper">
        <div class="contact__box">
          {list.map((item) => (
            <article class="contact__section">
              <h2 class="contact__section__title">{item.title}</h2>

              <div class="contact__section__description">
                {parseHTML(item.description)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
