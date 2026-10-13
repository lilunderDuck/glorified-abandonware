import { JSX } from "react"

export interface IProjectStat {
  type: "private" | "public"
  status: "active" | "paused" | "completed" | "stopped"
  title: string
  projectNameId: string
  projectRepoUrl?: string
  description: string
  longDescription: string[]
  coverImages: string[]
  totalCommits: number
  previewImages?: string[]
  licence?: {
    name: string
    url: string
    why?: string
  }[]
}

export const PROJECT_REGISTRY: IProjectStat[] = [
  {
    title: "BigChadGuys+ decompilation",
    projectNameId: "bcg-decomp",
    description: "Decompilation of a minecraft modpack called: [BigChadGuys+ (Non Cobblemon!)](https://www.curseforge.com/minecraft/modpacks/bcgnc) by [jflec](https://www.curseforge.com/members/jflec/projects) (with additional 95 more mods = 396 mods) for fabric 1.20.1",
    projectRepoUrl: "https://github.com/lilunderDuck/this-generic-playlist",
    totalCommits: 41,
    type: "private",
    longDescription: [
      "This is an attempt to optimize my modified BCG+ NC modpack for my forever world and the launch time, while also adding some unfixable mods that just crash when opening the world ([Create Big Cannons](https://modrinth.com/mod/create-big-cannons) for example).",
      "Every mods are going to be decompiled to identify any memory leaks, or optimize any resource intensive part of the code."
    ],
    coverImages: ['bcg_2.png'],
    previewImages: ['bcg_2.png', 'bcg_3.png', 'bcg_1.png'],
    status: "active",
  },
  {
    title: "This generic playlist",
    projectNameId: "toast-playlist",
    description: "A totally normal playlist player with no twist whatsoever, also completely running in a browser tab.",
    projectRepoUrl: "https://github.com/lilunderDuck/this-generic-playlist",
    totalCommits: 41,
    type: "public",
    longDescription: [],
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
    longDescription: [],
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
    longDescription: [],
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
    longDescription: [],
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
    longDescription: [],
    coverImages: [],
    status: "paused",
  },
]

export const PROJECT_STATUS_REGISTRY: Record<IProjectStat["status"], string> = {
  active: "var(--green)",
  paused: "var(--yellow)",
  completed: "var(--sapphire)",
  stopped: "var(--red)"
}

export const PROJECT_TYPE_COLOR_MAPPING: Record<IProjectStat["type"], string> = {
  private: "var(--mauve)",
  public: "var(--flamingo)"
}