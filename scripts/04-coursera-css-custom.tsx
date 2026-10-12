import { css, dumpCssThenClearCache, renderHtmlTo } from "./libs/dumb_html5str_renderer"
import "react" // only used for jsx tag types

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
    projectNameId: "toast-playlist",
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

function ProjectItem(props: IProjectStat) {
  return (
    <li>
      <div>
        <div>
          <h2>
            <a href={`./${props.projectNameId}`} target="_blank">
              {props.title}
            </a>
          </h2>
        </div>
        <p>{props.description}</p>
      </div>
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
  padding-inline: 15px;
  padding-top: 10px;
  padding-bottom: 15rem;
`

const app__title = css`
  text-align: center;
`

const app__updateNote = css`
  color: var(--subtext0);
`

function AppEntryPoint() {
  return (
    <div id="root" class={app__root}>
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
        <ul>
          {PROJECT_REGISTRY.map(it => <ProjectItem {...it} />)}
        </ul>
      </main>
    </div>
  )
}

renderHtmlTo("./docs/04-coursera-css-custom/index.html", {
  reason: `Every duck project (as for ${buildDate}), a project for a course final project on coursera: https://www.coursera.org/learn/introcss/peer/JMPGW/final-project-create-your-site`,
  title: "Duck's project index",
  noFlashbangWhenOpened: true,
  libraryUsed: "libduck_haxjsx2html5 palette@catppuccin_mocha",
  css: dumpCssThenClearCache()
}, <AppEntryPoint />)