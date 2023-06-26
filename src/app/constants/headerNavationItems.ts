interface HeaderNavationItem {
  key: string
  href: string
  name: string
  disabled?: boolean
  external?: boolean
}

export const headerNavationItems: HeaderNavationItem[] = [
  {
    key: 'home',
    href: '/',
    name: 'Home',
  },
  {
    key: 'category',
    href: '/category',
    name: 'Category',
    disabled: true,
  },
]
