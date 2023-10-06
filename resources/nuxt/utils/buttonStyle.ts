import { type ButtonProps } from '~/components/TheButton.vue'

const buttonCoreClasses = [
  'transition text-center',
  'text-xs rounded-sm',
  'tracking-wide font-medium',
  'disabled:cursor-not-allowed',
  'disabled:opacity-80'
]

const buttonVariantClasses = {
  primary: {
    default: [
      'p-2',
      'bg-accent text-light',
      'border border-accent',
      'hover:bg-accent-light',
      'focus:outline-accent-light'
    ],
    info: [
      'p-2',
      'bg-info text-light',
      'border border-info',
      'hover:bg-info-light',
      'focus:outline-info-light'
    ],
    warning: [
      'p-2',
      'bg-warning text-accent',
      'border border-warning',
      'hover:bg-warning-light',
      'focus:outline-warning-light'
    ],
    danger: [
      'p-2',
      'bg-danger text-light',
      'border border-danger',
      'hover:bg-danger-light',
      'focus:outline-danger-light'
    ],
    success: [
      'p-2',
      'bg-success text-light',
      'border border-success',
      'hover:bg-success-light',
      'focus:outline-success-light'
    ]
  },
  secondary: {
    default: [
      'p-2',
      'bg-light text-accent',
      'border border-accent',
      'hover:bg-white',
      'focus:outline-accent-light'
    ],
    info: [
      'p-2',
      'bg-light text-info',
      'border border-info',
      'hover:bg-white',
      'focus:outline-info-light'
    ],
    warning: [
      'p-2',
      'bg-light text-warning',
      'border border-warning',
      'hover:bg-white',
      'focus:outline-warning-light'
    ],
    danger: [
      'p-2',
      'bg-light text-danger',
      'border border-danger',
      'hover:bg-white',
      'focus:outline-danger-light'
    ],
    success: [
      'p-2',
      'bg-light text-success',
      'border border-success',
      'hover:bg-white',
      'focus:outline-success-light'
    ]
  },
  tertiary: {
    default: [
      'bg-transparent text-accent',
      'border border-transparent',
      'hover:underline',
      'focus:outline-accent-light'
    ],
    info: [
      'bg-transparent text-info',
      'border border-transparent',
      'hover:underline',
      'focus:outline-info-light'
    ],
    warning: [
      'bg-transparent text-warning',
      'border border-transparent',
      'hover:underline',
      'focus:outline-warning-light'
    ],
    danger: [
      'bg-transparent text-danger',
      'border border-transparent',
      'hover:underline',
      'focus:outline-danger-light'
    ],
    success: [
      'bg-transparent text-success',
      'border border-transparent',
      'hover:underline',
      'focus:outline-success-light'
    ]
  }
}

function setButtonClasses ({
  variant = 'primary',
  accent = 'default',
  block = false,
  noCaps = false
}: {
  variant: ButtonProps['variant']
  accent: ButtonProps['accent']
  block: ButtonProps['block']
  noCaps: ButtonProps['noCaps']
}) {
  const coreClasses = buttonCoreClasses.join(' ')
  const variantClasses = buttonVariantClasses[variant][accent].join(' ')
  const blockClasses = block ? 'w-full' : ''
  const noCapsClasses = noCaps ? '' : 'uppercase'

  return [
    coreClasses,
    variantClasses,
    blockClasses,
    noCapsClasses
  ]
}

function setButtonComponent (href: ButtonProps['href']) {
  return href ? 'a' : 'button'
}

export {
  setButtonClasses,
  setButtonComponent
}
