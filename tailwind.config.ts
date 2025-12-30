import type { Config } from 'tailwindcss'
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: 'var(--color-tiny-grey)',
          secondary: 'var(--color-tiny-white)',
        },
        background: {
          base: 'var(--color-bg-base)',
          unselect: 'var(--color-bg-unselect)',
          select: 'var(--color-bg-select)',
          hover: 'var(--color-bg-hover)',
        },
      },
    },
  },
  plugins: [flowbiteReact],
}

export default config