const GITHUB_USERNAME="Ellyzeul"

document.querySelector("#theme-changer").addEventListener('click', () => 
  document.documentElement.className = document.documentElement.className === 'light' 
    ? 'dark' 
    : 'light'
)

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
.then(response => response.json())
.then(response => {
    const reposList = document.querySelector("#repos-list")
    response.forEach(repo => {
      const { name, language, html_url, description } = repo
      const lowerLang = language ? language.toLowerCase() : ""

      const anchor = document.createElement('a')
      anchor.className = "repo-container"
      anchor.href = html_url
      anchor.target = "_blank"

      const img = document.createElement('img')
      img.src = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${lowerLang}/${lowerLang}-original.svg`
      img.alt = ""

      const div = document.createElement('div')

      const strong = document.createElement('strong')
      strong.textContent = name

      const p = document.createElement('p')
      p.textContent = description

      div.appendChild(strong)
      div.appendChild(p)

      anchor.appendChild(img)
      anchor.appendChild(div)

      reposList.appendChild(anchor)
    })
  })
  .catch(err => console.log(err))

document.querySelectorAll(".content-chooser").forEach(button => {
  const contentSection = button.firstElementChild.value

  button.addEventListener('click', () => {
    document.querySelector(".content-enabled").className = "content-disabled"
    document.querySelector(`#${contentSection}`).parentElement.className = "content-enabled"
  })
})

document.querySelector("#show-more").addEventListener('click', (event) => {
  event.target.style.display = "none"

  document.querySelector("#user-info").style.cssText = "display: flex !important"
})
