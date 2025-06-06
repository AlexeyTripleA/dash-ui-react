'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const ThemeContext = /*#__PURE__*/react.createContext(undefined);
/**
 * Provides theme context to its descendants and syncs theme with localStorage
 * and the root HTML element's class list ('light' or 'dark').
 *
 * @param initialTheme - Optional initial theme override.
 * @param children - React children.
 */
const ThemeProvider = ({
  initialTheme,
  children
}) => {
  /**
   * Retrieve stored theme from localStorage, if available.
   */
  const getStoredTheme = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme') || null;
  };
  const [theme, setThemeState] = react.useState(() => {
    var _a;
    return (_a = initialTheme !== null && initialTheme !== void 0 ? initialTheme : getStoredTheme()) !== null && _a !== void 0 ? _a : 'light';
  });
  // Sync theme changes to document <html> class and localStorage.
  react.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem('theme', theme);
    } catch (_a) {
      // Ignore localStorage.
    }
  }, [theme]);
  /**
   * Update theme state explicitly.
   * @param newTheme - The theme to set ('light' or 'dark').
   */
  const setTheme = newTheme => {
    setThemeState(newTheme);
  };
  /**
   * Toggle between 'light' and 'dark' theme.
   */
  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };
  return jsxRuntime.jsx(ThemeContext.Provider, {
    value: {
      theme,
      setTheme,
      toggleTheme
    },
    children: children
  });
};
/**
 * Hook to access the theme context.
 * @returns ThemeContextValue - Contains `theme`, `setTheme`, and `toggleTheme`.
 * @throws If used outside of a ThemeProvider.
 */
function useTheme() {
  const context = react.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
//# sourceMappingURL=ThemeContext.cjs.js.map
