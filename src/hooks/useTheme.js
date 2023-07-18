import { useThemeContext } from "../contexts/ThemeContext"

const useTheme = () => {
  return useThemeContext()
}

export default useTheme