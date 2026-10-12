function shout(stackUsed: string, title?: string) {
  const LOG_BASE_STYLE = "color: #11111b; padding-inline: 5px; border-radius: 6px; font-weight: bold"
  const DUCK_LOG_LABEL = `${LOG_BASE_STYLE};background-color: #ebb748`
  const DISCLAIMER_STYLE = "color: #e6e6e6;font-weight:bold"
  const messageForCarelessRater = [
    "By viewing this page, you agreed that:",
    "1. %cYou have a somewhat basic understanding of English language%c",
    "2. %cYou are already know how to open the dev tools%c",
    // "Your project will be graded by the careful examination of your code by a peer [...]"
    // Nah it's not, coursera, someone will carelessly rate unfairly.
    "3. %cRead the coursera grading instructions to rate my or any others page correctly, without fast scanning for like 5 seconds%c",
    "4. %cRead the source code of this page carefully, so that you can rate my works.%c",
    "5. %cNo unfair rating regardless of how busy you are%c",
    "6. %cYour unfair rating will be permanently be shown on this page repo README.md%c",
    "7. %cFor future: if you're accidentally visiting this, then yes, it's just for a project and nothing else.%c"
  ]

  console.log(`%cduck%c 
                  __
                 /  \\
               ∠)_• / ^_^
                /  /_(•ω•)__
               (      UU    )
             ~~~~~~~~~~~~~~~~~~~~~~~
  \n%c${title ?? "[Untitled project name]"}%c, made with agony and %c${stackUsed}%c.`, DUCK_LOG_LABEL, "","color: #f7ff8c;font-weight:bold", "","color: #ffca4d;font-weight:bold", "",)
  console.log(`%cduck%c ${messageForCarelessRater.join("\n\n")}`, DUCK_LOG_LABEL, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "", DISCLAIMER_STYLE, "",)
}

// @ts-ignore
window.duck = {
  simulatePeerRatingExperience: shout
}