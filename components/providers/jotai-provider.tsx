import React, { PropsWithChildren } from 'react'
import { Provider } from 'jotai'

function JotaiProvider({ children }: PropsWithChildren) {
    return <Provider>{children}</Provider>
}

export default JotaiProvider
