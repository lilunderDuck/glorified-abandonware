import { scrollbar, scrollbar__invs, scrollbar__vertical } from "../../components"
import { css } from "../../libs/dumb_html5str_renderer"
import { HomeHeader } from "../components"

const page__root = css`
  user-select: none;
  overflow-y: auto;
`

const page__mainContent = css`
  width: 100%;
  padding-inline: 10rem;
  padding-top: 5px;
  padding-bottom: 15rem;
  & p, & code, & li {
    font-size: 1.5rem;
  }

  & h2 {
    font-size: 2.3rem;
  }

  & h1 {
    font-size: 2.375rem;
  }

  & p:not(:last-child) {
    margin-bottom: 20px;
  }
`

const ABOUT_DESCRIPTION = `
# Uhhh-
This is a 1-week hacked-together project for [Introduction to CSS3](https://www.coursera.org/learn/introcss) - a required course that I have to do.

# How can you even write all of this?
Magic.

Yeah, magic, honestly.

I wrote a [JSX](https://en.wikipedia.org/wiki/JSX_(programming)) to HTML5 renderer for myself, it was very fun to write the code to handle edge cases. To make it more suspicious, I named the libary: \`haxjsx2html5\`.

![jsx rendering code](./assets/jsx_rendering_code.png)

Of course, disclaimer, it's **not production ready**, maybe I might find a crazy arbitrary code execution in the code handles the HTML rendering that can steal your bank account. (Uhhh- maybe not?)

# Project appear to be... disabled?
If you're reading the description on the header at the top... yeah, **just a prototype**. Most of the project listed in the page is simply "disabled".

![Preview of the home page](./assets/app_preview.png)

I still consider to move it onto a seperate repo, maybe soon?

(I really love \`@view-transition\`, but firefox currently does not support that).

# You still want to check this black magic?
Everything is in [\`glorified-abandonware\` repo](https://github.com/lilunderDuck/glorified-abandonware), you can spy on what kind of ritual I am doing in the... commit messages :)

For this one, it's in:
- Output html: [\`docs/04-duck-project-index\`](https://github.com/lilunderDuck/glorified-abandonware/tree/main/docs/04-duck-project-index)
- Code for this page: [\`scripts/04-duck-project-index\`](https://github.com/lilunderDuck/glorified-abandonware/tree/main/scripts/04-duck-project-index)
`

export default function AboutPage(props: { buildDate: string }) {
  return (
    <div id="root" class={`${page__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
      <HomeHeader buildDate={props.buildDate} />
      <main class={page__mainContent} id="main_content_jump_to_here">
        {Bun.markdown.react(ABOUT_DESCRIPTION, {
          a(props) {
            return <a href={props.href} target="_blank">{props.children}</a>
          },
        })}
      </main>
    </div>
  )
}