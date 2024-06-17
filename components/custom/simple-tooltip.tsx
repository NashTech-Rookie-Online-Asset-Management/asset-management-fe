import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { TooltipProps, TooltipTriggerProps } from '@radix-ui/react-tooltip'

interface SimpleTooltipProps extends TooltipTriggerProps {
    tooltipContent: React.ReactNode
    parentProps?: TooltipProps
}

function SimpleTooltip({ children, tooltipContent, parentProps,...props }: SimpleTooltipProps) {
    return (
        <Tooltip {...parentProps}>
            <TooltipTrigger {...props}>{children}</TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
    )
}

export default SimpleTooltip
