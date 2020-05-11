import React, { useEffect } from 'react'
import { core, Message } from '../lib/setup'
import { wcEventHub } from '../providers/WalletConnect'
import { Screens } from '../navigators/screens'
import AppConstants from '../constants/index'

interface WalletConnectProps {
  navigate: (routeName: any, params: any) => void
}

/**
 * Top level component to house all the event handlers coming from wallet connect provider
 **/
const WalletConnect: React.FC<WalletConnectProps> = ({ navigate }) => {
  useEffect(() => {
    wcEventHub.addListener(
      AppConstants.events.WALLET_CONNECT.SESSION_REQUEST_INT,
      async ({ peerId, peerMeta, payload }: any) => {
        const requestType = AppConstants.requests.SESSION

        navigate(Screens.Requests.screen, {
          requestType,
          peerId,
          peerMeta,
          payload,
        })
      },
    )

    wcEventHub.addListener(
      AppConstants.events.WALLET_CONNECT.CALL_REQUEST_INT,
      async ({ peerId, peerMeta, payload }) => {
        console.log(peerId, peerMeta, payload)
        const message = payload.params[0]
          ? await core.validateMessage(
              new Message({
                raw: payload.params[0],
                meta: {
                  type: 'walletConnect',
                },
              }),
            )
          : null

        if (payload.method === 'request_credentials') {
          const requestType = AppConstants.requests.DISCLOSURE
          navigate(Screens.Requests.screen, {
            requestType,
            peerId,
            peerMeta,
            payload,
            messageId: message ? message.id : message,
          })
        }
        if (payload.method === 'issue_credential_callback') {
          debug('components Wallet Connect issue credential callback')
          const requestType = AppConstants.requests.CREDENTIAL
          navigate(Screens.Requests.screen, {
            requestType,
            peerId,
            peerMeta,
            payload,
            messageId: message ? message.id : message,
          })
        }
      },
    )
  }, [])

  return <></>
}

export default WalletConnect
