export interface IProjectStat {
  type: "private" | "public"
  status: "active" | "paused" | "completed" | "stopped"
  title: string
  id: string
  repoUrl?: string
  description: string
  longDescription: string[]
  coverImage?: string
  totalCommits: string // WORKAROUND: currently didn't found why numbers aren't rendered
  previewImages?: string[]
  icon: string
  licence?: {
    name: string
    url: string
    why?: string
  }[]
}

export const PROJECT_REGISTRY: IProjectStat[] = [
  {
    title: "BigChadGuys+ decompilation",
    id: "bcg-decomp",
    description: "Decompilation of a minecraft modpack called: [BigChadGuys+ (Non Cobblemon!)](https://www.curseforge.com/minecraft/modpacks/bcgnc) by [jflec](https://www.curseforge.com/members/jflec/projects) (with additional 95 more mods = 396 mods) for fabric 1.20.1",
    totalCommits: '72',
    type: "private",
    longDescription: [
      "This is an attempt to optimize my modified BCG+ NC modpack for my forever world and the launch time, while also adding some unfixable mods that just crash when opening the world ([Create Big Cannons](https://modrinth.com/mod/create-big-cannons) for example).",
      "Every mods are going to be decompiled to identify any memory leaks, or optimize any resource intensive part of the code."
    ],
    coverImage: 'bcg_2.png',
    previewImages: ['bcg_2.png', 'bcg_3.png', 'bcg_1.png'],
    status: "active",
    icon: 'bcg.png'
  },
  {
    title: "Unnamed spinning cube",
    id: "unnamed-spinning-cube",
    description: "Ominous spinning cube... or is it really a spinning cube?",
    repoUrl: "https://github.com/lilunderDuck/unnamed-spinning-cube",
    totalCommits: '41',
    type: "public",
    longDescription: [
      "# Spinning cube??",
      "Not a cube spinning around violently actually, it's just Maxwell the Cat (at least now) spinning around slowly.",
      "See this unserious project here: [https://lilunderduck.github.io/unnamed-spinning-cube/](https://lilunderduck.github.io/unnamed-spinning-cube/)",
      "# Background",
      "A completely unserious project that I want to try and messing around with [THREE.js](https://threejs.org/), just to have a break with recent personal projects I'm currently working."
    ],
    coverImage: './maxwell_the_cat.png',
    status: "active",
    licence: [{
      name: "MIT",
      url: "https://opensource.org/license/mit",
      why: "for the code that handles rendering stuff"
    }, {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/deed.en",
      why: "for all of the 3D models used in the project"
    }],
    icon: 'maxwell.png'
  },
  {
    title: "Glorified abandonware",
    id: "glorified-abandonware",
    description: "Repo for some required course I need to take (oh well).",
    repoUrl: "https://github.com/lilunderDuck/glorified-abandonware",
    totalCommits: '28',
    type: "public",
    longDescription: [
      "# A dumping place and nothing else",
      "Originally, I put it inside my other project: [unnamed-spinning-cube](https://github.com/lilunderDuck/unnamed-spinning-cube), but I decided to move it into another repo to seperate my project.",
      "# Repo of (bad) interesting ideas",
      "While doing this project, I was like *\"How can I be able to generate static html pages just by writing [JSX](https://en.wikipedia.org/wiki/JSX_(programming))?\"*, so I decided to write a not-production-ready highly experimental jsx to html5 renderer for myself. It was very fun.",
    ],
    coverImage: undefined,
    status: "active",
    licence: [{
      name: "MIT",
      url: "https://opensource.org/license/mit"
    }],
    icon: "missing_no.png"
  }
]

export const PROJECT_STATUS_REGISTRY: Record<IProjectStat["status"], {
  color: string
  description: string
}> = {
  active: {
    color: "var(--green)",
    description: "mint_duck is currently active on maintaining this"
  },
  paused: {
    color: "var(--yellow)",
    description: "mint_duck is currently pausing this project and will go back to maintain it later"
  },
  completed: {
    color: "var(--sapphire)",
    description: "mint_duck is finished doing this project (at least for now)"
  },
  stopped: {
    color: "var(--red)",
    description: "mint_duck has stopped maintaining this project (due to motivation loss for example)"
  },
}

export const PROJECT_TYPE_COLOR_MAPPING: Record<IProjectStat["type"], string> = {
  private: "var(--mauve)",
  public: "var(--flamingo)"
}