import React, { useEffect } from 'react'
import { core } from '../../lib/setup'
import NavigationService from '../navigationService'
import * as Daf from 'daf-core'

import { useQuery } from 'react-apollo'
import { GET_VIEWER } from '../../lib/graphql/queries'

const App = () => {
  console.log('NavigationEvents: ' + GET_VIEWER)
  const { data } = useQuery(GET_VIEWER)

  useEffect(() => {
    core.on(Daf.EventTypes.validatedMessage, async (message: Daf.Message) => {
      console.log('NavigationEvents: ' + Daf.Message)
      if (
        (data && data.viewer && data.viewer.did && message.type === 'sdr',
        data.viewer.did !== message.sender)
      ) {
        // NavigationService.navigate('Request', {
        //   requestMessage: message,
        //   viewerDid: data.viewer.did,
        // })
      }
    })
  }, [])

  return <></>
}
export default App
