import { Kbd, scrollbar, scrollbar__invs, scrollbar__vertical, Tag } from "./components"
import { css, dumpCssThenClearCache, IRenderHtmlOption, renderHtmlTo } from "./libs/dumb_html5str_renderer"

const dateFormatter = new Intl.DateTimeFormat("default", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})

const buildDate = dateFormatter.format(new Date())

interface IProjectStat {
  type: "private" | "public"
  status: "active" | "paused" | "completed" | "stopped"
  title: string
  projectNameId: string
  projectRepoUrl?: string
  description: string
  longDescription: string
  coverImages: string[]
  totalCommits: number
  licence?: {
    name: string
    url: string
    why?: string
  }[]
}

const PROJECT_REGISTRY: IProjectStat[] = [
  {
    title: "BigChadGuys+ decompilation",
    projectNameId: "bcg-decomp",
    description: "Decompilation of a minecraft modpack called: BigChadGuys+ (Non Cobblemon!) by jflec (with additional 95 more mods = 396 mods) for fabric 1.20.1",
    projectRepoUrl: "https://github.com/lilunderDuck/this-generic-playlist",
    totalCommits: 41,
    type: "private",
    longDescription: "This is an attempt to optimize my modified BCG+ NC modpack for my forever world and the launch time, while also adding some unfixable mods that just crash when opening the world (create big cannon for example).\n\nEvery mods are going to be decompiled to identify any memory leaks, or optimize any resource intensive part of the code.",
    coverImages: [],
    status: "active",
  },
  {
    title: "This generic playlist",
    projectNameId: "toast-playlist",
    description: "A totally normal playlist player with no twist whatsoever, also completely running in a browser tab.",
    projectRepoUrl: "https://github.com/lilunderDuck/this-generic-playlist",
    totalCommits: 41,
    type: "public",
    longDescription: "",
    coverImages: [],
    status: "active",
    licence: [{
      name: "MIT",
      url: "https://opensource.org/license/mit"
    }]
  },
  {
    title: "Unnamed spinning cube",
    projectNameId: "unnamed-spinning-cube",
    description: "Ominous spinning cube... or is it really a spinning cube?",
    projectRepoUrl: "https://github.com/lilunderDuck/unnamed-spinning-cube",
    totalCommits: 41,
    type: "public",
    longDescription: "",
    coverImages: [],
    status: "active",
    licence: [{
      name: "MIT",
      url: "https://opensource.org/license/mit"
    }, {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/deed.en",
      why: "for all of the 3D models used in the project"
    }]
  },
  {
    title: "Glorified abandonware",
    projectNameId: "glorified-abandonware",
    description: "Repo for some required course I need to take (oh well).",
    projectRepoUrl: "https://github.com/lilunderDuck/glorified-abandonware",
    totalCommits: 18,
    type: "public",
    longDescription: "",
    coverImages: [],
    status: "active",
    licence: [{
      name: "MIT",
      url: "https://opensource.org/license/mit"
    }]
  },
  {
    title: "Progress tracker",
    projectNameId: "toast-progress-tracker",
    description: "My own progress tracking list, running directly on my browser tab.",
    longDescription: "",
    coverImages: [],
    projectRepoUrl: "https://github.com/lilunderDuck/progress-tracker",
    status: "paused",
    totalCommits: 17,
    type: "public"
  },
  {
    title: "smol map",
    projectNameId: "smol-map",
    description: "Experimenting with terminal UI by making an app for searching yarn v1 .tiny mapping.",
    projectRepoUrl: "https://github.com/lilunderDuck/smol-map",
    totalCommits: 9,
    type: "public",
    longDescription: "",
    coverImages: [],
    status: "paused",
  },
]

const PROJECT_STATUS_REGISTRY: Record<IProjectStat["status"], string> = {
  active: "var(--green)",
  paused: "var(--yellow)",
  completed: "var(--sapphire)",
  stopped: "var(--red)"
}

const PROJECT_TYPE_COLOR_MAPPING: Record<IProjectStat["type"], string> = {
  private: "var(--mauve)",
  public: "var(--flamingo)"
}

const item__root = css`
  list-style: none;
  padding-inline: 10px;
  padding-block: 5px;
  margin-bottom: 10px;
`

const item__titleWrap = css`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`

function ProjectItem(props: IProjectStat) {
  return (
    <li class={item__root}>
      <div class={item__titleWrap}>
        <h2>
          <a href={`./${props.projectNameId}.html`}>
            {props.title}
          </a>
        </h2>
        <Tag bgColor={PROJECT_TYPE_COLOR_MAPPING[props.type]}>{props.type}</Tag>
        <Tag bgColor={PROJECT_STATUS_REGISTRY[props.status]}>Status: {props.status}</Tag>
      </div>
      <p>{props.description}</p>
    </li>
  )
}

const app__root = css`
  user-select: none;
  overflow-y: auto;
`

const app__header = css`
  width: 100%;
  height: 18rem;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--mantle);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 10px;
`

const app__mainContent = css`
  width: 100%;
  padding-inline: 10px;
  padding-top: 5px;
  padding-bottom: 15rem;
`

const app__title = css`
  text-align: center;
`

const app__updateNote = css`
  color: var(--subtext0);
`

const app__projectList = css`
  padding-left: 0;
`

const app__skipToMainContent = css`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: block;
  padding-inline: 30px;
  padding-block: 5px;
  text-align: center;
  border-radius: 6px;
  background-color: var(--surface0);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: 0.25s ease-out;
  &:focus {
    top: 30px;
  }
`

function AppEntryPoint() {
  return (
    <>
      <a 
        aria-label="Skip directly to main content" 
        href="#main_content_jump_to_here" 
        class={app__skipToMainContent}
      >
        Skip To Main Content
        <Kbd>Enter</Kbd>
      </a>
      <div id="root" class={`${app__root} ${scrollbar} ${scrollbar__vertical} ${scrollbar__invs}`}>
        <header class={app__header}>
          <div>
            <h1 class={app__title}>Duck's project index</h1>
            <p>
              What projects are <a href="https://github.com/lilunderDuck" target="_blank">mint_duck</a> currently doing? <span class={app__updateNote}>(As for {buildDate})</span>
            </p>
          </div>
          <div></div>
        </header>
        <main class={app__mainContent} id="main_content_jump_to_here">
          <ul class={app__projectList}>
            {PROJECT_REGISTRY.map(it => <ProjectItem {...it} />)}
          </ul>
        </main>
      </div>
    </>
  )
}

const page__headerShadow = css`
  width: 100%;
  height: 18rem;
  background: linear-gradient(to top, var(--crust) 0%, transparent 100%);
  bottom: 0;
  padding-inline: 20px;
  padding-top: 5px;
  position: relative;
`

function AppProjectPageEntryPoint() {
  return (
    <>
      <a 
        aria-label="Skip directly to main content" 
        href="#main_content_jump_to_here" 
        class={app__skipToMainContent}
      >
        Skip To Main Content
        <Kbd>Enter</Kbd>
      </a>
      <div id="root" class={app__root}>
        <header class={app__header}>
          <div class={page__headerShadow}>
            <h1 class={app__title}>Duck's project index</h1>
          </div>
        </header>
      </div>
    </>
  )
}

const APP_GLOBAL_CSS = `
  @font-face {
    font-family: ZeroProtoNerdFont;
    font-display: swap;
    src: url("../assets/da_font.woff2") format('woff2');
  }

  html { overflow: hidden; }

  :root {
    font-family: ZeroProtoNerdFont, Arial, Helvetica, sans-serif;
  }

  a { border-radius: 6px; }

  *:focus {
    outline: 4px solid var(--sapphire);
  }
`

const htmlRendererOptions: IRenderHtmlOption = {
  reason: `Every duck project (as for ${buildDate}), a project for a course final project on coursera: https://www.coursera.org/learn/introcss/peer/JMPGW/final-project-create-your-site`,
  title: "Duck's project index",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: `${APP_GLOBAL_CSS} ${dumpCssThenClearCache()}`
}

renderHtmlTo("./docs/04-coursera-css-custom/index.html", htmlRendererOptions, <AppEntryPoint />)

for (const project of PROJECT_REGISTRY) {
  renderHtmlTo(`./docs/04-coursera-css-custom/${project.projectNameId}.html`, htmlRendererOptions, <AppProjectPageEntryPoint />)
}