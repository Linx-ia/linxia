import { cn } from "@linxia/utils"

export function DashboardShell(props: {
  title: string
  description?: React.ReactNode
  headerAction?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div>
      <div className="mb-10 flex h-36 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="truncate text-2xl text-gray-600">{props.title}</h1>
              <h2 className="text-base text-muted-foreground">
                {props.description}
              </h2>
            </div>

            {props.headerAction}
          </div>
        </div>
      </div>
      <div
        className={cn(
          props.className,
          "mx-auto w-full max-w-screen-xl px-2.5 pb-5 lg:px-20",
        )}
      >
        {props.children}
      </div>
    </div>
  )
}
