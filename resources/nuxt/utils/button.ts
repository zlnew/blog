import { type ButtonProps } from '~/components/TheButton.vue'

function setColorClasses (accent: ButtonProps['accent']) {
  switch (accent) {
    case 'default':
      return {
        primary: [
          'p-2',
          'bg-accent text-light',
          'border border-accent',
          'hover:bg-accent-light',
          'focus:outline-accent-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-accent',
          'border border-accent',
          'hover:bg-white',
          'focus:outline-accent-light'
        ],
        tertiary: [
          'bg-transparent text-accent',
          'border border-transparent',
          'hover:underline',
          'focus:outline-accent-light'
        ]
      }
    case 'info':
      return {
        primary: [
          'p-2',
          'bg-info text-light',
          'border border-info',
          'hover:bg-info-light',
          'focus:outline-info-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-info',
          'border border-info',
          'hover:bg-white',
          'focus:outline-info-light'
        ],
        tertiary: [
          'bg-transparent text-info',
          'border border-transparent',
          'hover:underline',
          'focus:outline-info-light'
        ]
      }
    case 'danger':
      return {
        primary: [
          'p-2',
          'bg-danger text-light',
          'border border-danger',
          'hover:bg-danger-light',
          'focus:outline-danger-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-danger',
          'border border-danger',
          'hover:bg-white',
          'focus:outline-danger-light'
        ],
        tertiary: [
          'bg-transparent text-danger',
          'border border-transparent',
          'hover:underline',
          'focus:outline-danger-light'
        ]
      }
    case 'warning':
      return {
        primary: [
          'p-2',
          'bg-warning text-accent',
          'border border-warning',
          'hover:bg-warning-light',
          'focus:outline-warning-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-warning',
          'border border-warning',
          'hover:bg-white',
          'focus:outline-warning-light'
        ],
        tertiary: [
          'bg-transparent text-warning',
          'border border-transparent',
          'hover:underline',
          'focus:outline-warning-light'
        ]
      }
    case 'success':
      return {
        primary: [
          'p-2',
          'bg-success text-light',
          'border border-success',
          'hover:bg-success-light',
          'focus:outline-success-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-success',
          'border border-success',
          'hover:bg-white',
          'focus:outline-success-light'
        ],
        tertiary: [
          'bg-transparent text-success',
          'border border-transparent',
          'hover:underline',
          'focus:outline-success-light'
        ]
      }
    default:
      return {
        primary: [
          'p-2',
          'bg-accent text-light',
          'border border-accent',
          'hover:bg-accent-light',
          'focus:outline-accent-light'
        ],
        secondary: [
          'p-2',
          'bg-light text-accent',
          'border border-accent',
          'hover:bg-white',
          'focus:outline-accent-light'
        ],
        tertiary: [
          'bg-transparent text-accent',
          'border border-transparent',
          'hover:underline',
          'focus:outline-accent-light'
        ]
      }
  }
}

function setBlockClasses (block: boolean) {
  return block ? 'w-full' : undefined
}

function setCapsClasses (noCaps: boolean) {
  return noCaps ? undefined : 'uppercase'
}

export {
  setColorClasses,
  setBlockClasses,
  setCapsClasses
}
