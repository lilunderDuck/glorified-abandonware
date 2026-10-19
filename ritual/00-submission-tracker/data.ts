export interface IProjectScoreData {
  score: number
  date: Date
  reason?: string
}

export interface IProjectData {
  name: string
  score: IProjectScoreData[] | null
  custom?: boolean
}

export interface IProjectSubmissionData {
  name: string
  link: string
  projects: IProjectData[]
}

export const SUBMISSION_DATA: IProjectSubmissionData[] = [
  {
    name: "Introduction to HTML5",
    link: "https://www.coursera.org/learn/html",
    projects: [
      {
        name: "01-coursera-html-final-project",
        score: [
          {score: 0, date: new Date(2026, 10 - 1, 1), reason: "followed all of the instruction, but being rated 0"}, 
          {score: 100, date: new Date(2026, 10 - 1, 1)}
        ]
      }
    ]
  },
  {
    name: "Introduction to CSS3",
    link: "https://www.coursera.org/learn/introcss",
    projects: [
      {
        name: "02-gallery",
        score: [{score: 93.54, date: new Date(2026, 10 - 1, 16)}]
      },
      {
        name: "03-gallery-w-advance-selectors",
        score: [{score: 100, date: new Date(2026, 10 - 1, 16)}]
      },
      {
        name: "04-duck-project-index",
        score: [{score: 100, date: new Date(2026, 10 - 1, 15)}],
        custom: true
      }
    ]
  },
  {
    name: "Interactivity with JavaScript",
    link: "https://www.coursera.org/learn/javascript",
    projects: [
      {
        name: "05-gallery-js-w-template",
        score: [{score: 100, date: new Date(2026, 10 - 1, 17)}]
      },
      {
        name: "06-a-moment-of-time",
        score: [{score: 100, date: new Date(2026, 10 - 1, 18)}],
        custom: true
      }
    ]
  },
  {
    name: "Advanced Styling with Responsive Design",
    link: "https://www.coursera.org/learn/responsivedesign",
    projects: [
      {
        name: "07-responsive-stylesheet",
        score: null
      },
      {
        name: "08-gallery-responsive (?)",
        score: null,
        custom: true
      }
    ]
  },
  {
    name: "Web Design for Everybody Capstone",
    link: "https://www.coursera.org/learn/web-design-project/",
    projects: [
      {
        name: "09-sketch",
        score: null,
        custom: true
      },
      {
        name: "10-portfolio",
        score: null,
        custom: true
      }
    ]
  }
]