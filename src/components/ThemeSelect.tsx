import { Listbox, Transition } from "@headlessui/react"
import { IconCheck, IconMoonFilled, IconSunFilled } from "@tabler/icons-react"
import { useCallback, useMemo, useState } from "react"

const themes = ["system", "dark", "light"] as const
type theme = (typeof themes)[number]

const ThemeSelect = () => {
  const [selectedTheme, setSelectedTheme] = useState<theme>(
    localStorage.theme || "system"
  )
  const Icon = useMemo(
    () =>
      selectedTheme === "dark" ||
      (selectedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? IconMoonFilled
        : IconSunFilled,
    [selectedTheme]
  )

  const handleChange = useCallback((newSelectedTheme: theme) => {
    setSelectedTheme(newSelectedTheme)
    localStorage.theme = newSelectedTheme

    if (newSelectedTheme === "dark")
      document.documentElement.classList.add("dark")
    else if (newSelectedTheme === "light")
      document.documentElement.classList.remove("dark")
    else if (newSelectedTheme === "system")
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
  }, [])

  return (
    <Listbox value={selectedTheme} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="flex items-center gap-2 capitalize text-slate-700 hover:text-black focus:outline-0 dark:text-gray-300 dark:hover:text-white">
          <Icon size={20} stroke={3} />
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-3 rounded bg-white py-1 shadow-md focus:outline-none dark:bg-gray-800">
            {themes.map((theme) => (
              <Listbox.Option key={theme} value={theme}>
                {({ active, selected }) => (
                  <div
                    className={`flex cursor-pointer items-center justify-between px-3 py-1 pr-10 capitalize ${
                      active
                        ? "bg-slate-100 text-black dark:bg-gray-700 dark:text-white"
                        : "text-slate-700 dark:text-gray-300"
                    }`}
                  >
                    {theme}
                    {selected && (
                      <span className="absolute right-0 pr-3">
                        <IconCheck size={16} stroke={3} />
                      </span>
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ThemeSelect
