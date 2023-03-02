import { Listbox, Transition } from "@headlessui/react"
import { IconCheck, IconMoonFilled, IconSunFilled } from "@tabler/icons-react"
import { useCallback, useMemo, useState } from "react"

const THEMES = ["system", "dark", "light"] as const
type theme = (typeof THEMES)[number]

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
    <Listbox value={selectedTheme} onChange={handleChange} as="div">
      <Listbox.Button aria-label="Select theme">
        <Icon
          size={20}
          stroke={3}
          className={`${
            selectedTheme === "system"
              ? "text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              : "text-amber-600 hover:text-amber-500"
          }`}
        />
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="absolute top-4 right-0 mt-2 rounded-lg border border-gray-200 bg-amber-50 p-2 shadow-md dark:border-0 dark:bg-gray-800">
          {THEMES.map((theme) => (
            <Listbox.Option key={theme} value={theme} className="relative">
              {({ active, selected }) => (
                <div
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-1 pr-10 capitalize ${
                    active
                      ? "bg-white text-black shadow-md dark:bg-gray-700 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
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
    </Listbox>
  )
}

export default ThemeSelect
