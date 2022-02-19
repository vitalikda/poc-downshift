import { Box, Button as ChakraButton } from '@chakra-ui/react'
import Downshift, { useSelect } from 'downshift'
import { FC, forwardRef, useEffect, useState } from 'react'

const items = [
  { value: 'system', emoji: '☯️' },
  { value: 'light', emoji: '☀️' },
  { value: 'dark', emoji: '🌙' }
]

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

const Button = forwardRef<HTMLButtonElement, FC>((props, ref) => (
  <ChakraButton
    ref={ref}
    type="button"
    colorScheme="teal"
    variant="outline"
    size="md"
    height="48px"
    width="200px"
    rightIcon={<ChevronDownIcon />}
    iconSpacing="auto"
    {...props}
  />
))

const Menu = forwardRef<HTMLDivElement, { isOpen: boolean }>(
  ({ isOpen, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={{
        width: 200,
        mt: 3,
        py: 2,
        px: 1,
        backgroundColor: isOpen ? '#F3F3F3' : 'transparent',
        borderRadius: 'md'
      }}
    />
  )
)

const MenuItem = forwardRef<HTMLDivElement, { isActive: boolean }>(
  ({ isActive, ...props }, ref) => (
    <Box
      ref={ref}
      {...props}
      sx={{
        px: 2,
        borderRadius: 'md',
        backgroundColor: isActive ? '#bde4ff' : 'transparent'
      }}
    />
  )
)

type Select = { id: string }
const Select = ({ id }: Select) => {
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps
  } = useSelect({
    id,
    defaultSelectedItem: items[0],
    items,
    itemToString: i => (i ? i.value : '')
  })

  return (
    <Box sx={{ mt: 5 }}>
      <Button {...getToggleButtonProps()}>
        {selectedItem?.emoji} {selectedItem?.value}
      </Button>
      <Menu isOpen={isOpen} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <MenuItem
              key={`${item.value}${index}`}
              isActive={highlightedIndex === index}
              {...getItemProps({ item, index })}
            >
              {item.value}
            </MenuItem>
          ))}
      </Menu>
      {/* if you Tab from menu, focus goes on button, and it shouldn't. only happens here. */}
      <div tabIndex={0} />
    </Box>
  )
}

export default Select
