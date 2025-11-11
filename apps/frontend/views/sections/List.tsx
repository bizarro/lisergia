import { Html } from "@elysiajs/html";
import { Button } from "../components/Button";

interface ListProps {
  label: string
  list: { text: string; url: string }[]
  button: {
    text: string
    url: string
  }
}

const List = ({ label, list, button }: ListProps) => {
  return (
    <div class="list">
      <div class="list__wrapper">
        {/* TODO: Implement medias. */}
        {/* <div class="list__medias">
          {list.map((item, index) => (
            <div class="list__medias__media" key={index.toString()}>
              <img
                alt={(getAsset(item.image.asset) as any)?.alt || ''}
                class="list__medias__media__image"
                data-src={getAsset(item.image.asset).url}
                height="100%"
                width="100%"
              />
            </div>
          ))}
        </div> */}

        <p class="list__label">
          {label}
        </p>

        <ul class="list__list">
          {list.map((item) => (
            <li class="list__item">
              <a class="list__link" data-text={item.text} href={item.url}>{item.text}</a>
            </li>
          ))}
        </ul>

        <div class="list__button">
          <Button class="list__button__element" text={button.text} url={button.url} />
        </div>
      </div>
    </div>
  )
}

export default List
