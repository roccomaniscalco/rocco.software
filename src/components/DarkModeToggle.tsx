import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react"
import { useState } from "react"

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  )

  const handleClick = () => {
    if (isDarkMode) {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
    } else {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    }
  }

  return (
    <button className="dark:text-white" onClick={handleClick}>
      {isDarkMode ? <IconMoonFilled /> : <IconSunFilled />}
    </button>
  )
}

export default DarkModeToggle
