import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@linxia/utils"

import IconLoader from "./iconLoaderButton"

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
const buttonVariants = cva(
  `inline-flex 
  items-center 
  justify-center 
  rounded-md 
  font-medium 
  ring-offset-background 
  transition-colors 
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-ring 
  focus-visible:ring-offset-2
  disabled:pointer-events-none 
  disabled:opacity-50
  disabled:cursor-not-allowed
  cursor-pointer 
  border
  border-[#FF8A47]
  shadow`,
  {
    variants: {
      type: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      type: "default",
      size: "default",
    },
  },
)

export type IconContainerVariantProps = VariantProps<
  typeof IconContainerVariants
>
const IconContainerVariants = cva("", {
  variants: {
    size: {
      default: "[&_svg]:h-[14px] [&_svg]:w-[14px]",
      sm: "[&_svg]:h-[18px] [&_svg]:w-[18px]",
      lg: "[&_svg]:h-[20px] [&_svg]:w-[20px]",
      icon: "[&_svg]:h-[10px] [&_svg]:w-[10px]",
      large: "[&_svg]:h-[20px] [&_svg]:w-[20px]",
      xlarge: "[&_svg]:h-[24px] [&_svg]:w-[24px]",
      xxlarge: "[&_svg]:h-[30px] [&_svg]:w-[30px]",
      xxxlarge: "[&_svg]:h-[42px] [&_svg]:w-[42px]",
    },
  },
})

export type LoadingVariantProps = VariantProps<typeof loadingVariants>
const loadingVariants = cva("", {
  variants: {
    loading: {
      default: "",
      true: `animate-spin`,
    },
  },
})

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    Omit<ButtonVariantProps, "disabled">,
    LoadingVariantProps {
  asChild?: boolean
  type?: ButtonVariantProps["type"]
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  icon?: React.ReactNode
  sizeIcon?: IconContainerVariantProps["size"]
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "default",
      size = "default",
      sizeIcon = "default",
      asChild = false,
      loading,
      icon,
      iconLeft,
      htmlType = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const showIcon = loading || icon
    const _iconLeft: React.ReactNode = icon ?? iconLeft
    props.disabled = loading ? true : props.disabled

    return (
      <Comp
        className={cn(buttonVariants({ type, size, className }))}
        data-size={size}
        type={htmlType}
        ref={ref}
        {...props}
      >
        {asChild ? (
          React.isValidElement(children) ? (
            React.cloneElement(
              children,
              undefined,
              showIcon &&
                (loading ? (
                  <div
                    className={cn(IconContainerVariants({ size: sizeIcon }))}
                  >
                    <IconLoader />
                  </div>
                ) : _iconLeft ? (
                  <div
                    className={cn(IconContainerVariants({ size: sizeIcon }))}
                  >
                    {_iconLeft}
                  </div>
                ) : null),
              children.props.children && (
                <span className={"a truncate"}>{children.props.children}</span>
              ),
            )
          ) : null
        ) : (
          <>
            {showIcon &&
              (loading ? (
                <div className={cn(IconContainerVariants({ size: sizeIcon }))}>
                  <IconLoader />
                </div>
              ) : _iconLeft ? (
                <div className={cn(IconContainerVariants({ size: sizeIcon }))}>
                  {_iconLeft}
                </div>
              ) : null)}{" "}
            {children && <span className={"truncate"}>{children}</span>}{" "}
          </>
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
