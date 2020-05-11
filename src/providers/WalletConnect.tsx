import React, { useState, createContext, useEffect } from 'react'
import WalletConnect from '@walletconnect/react-native'
import {
  asyncStorageLoadSessions,
  asyncStorageSaveSession,
  asyncStorageDeleteSession,
} from '../utils/asyncStorage'
import { IWalletConnectRequest } from '../types'
import { EventEmitter } from 'events'
import Debug from 'debug'
import AppConstants from '../constants'

const debug = Debug('daf-provider:wallet-connect')

export const wcEventHub = new EventEmitter()
export const WalletConnectContext = createContext<WalletConnectState | any>({})

interface WalletConnectState {
  loading: false
  connectors: any[]
  pending: any[]
  requests: any[]
}

export const WalletConnectProvider = (props: any) => {
  const [connectors, updateConnectors] = useState<any[]>([])
  const [pending, updatePending] = useState<any[]>([])
  const [requests, updateRequests] = useState<any[]>([])
  const [peerId, updatePeerId] = useState<string | null>()

  useEffect(() => {
    debug('WalletConnect useEffect - Initialising wallet connect')
    //console.log('WalletConnect useEffect - Initialising wallet connect')
    walletConnectInit()
  }, [])

  useEffect(() => {
    if (peerId) {
      debug(`Subscribing to events for peerId ${peerId}`)
      walletConnectSubscribeToEvents(peerId)
    }
  }, [peerId])

  useEffect(() => {
    if (connectors.length > 0) {
      connectors.forEach((connector: any) => {
        debug(`Subscribing to events for peerId ${connector.peerId}`)
        walletConnectSubscribeToEvents(connector.peerId)
      })
    }
  }, [connectors])

  const getNativeOptions = async () => {
    // Wait for push token
    const nativeOptions = {
      clientMeta: {
        description: 'WalletConnect Demo App',
        url: 'https://walletconnect.org',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'WalletConnect',
        ssl: true,
      },
      // push: {
      //   url: "https://push.walletconnect.org",
      //   type: "fcm",
      //   token: token,
      //   peerMeta: true,
      //   language: language
      // }
    }

    return nativeOptions
  }

  const walletConnectInit = async () => {
    try {
      const sessions = await asyncStorageLoadSessions()
      const connectors = await Promise.all(
        Object.values(sessions).map(async session => {
          const nativeOptions = await getNativeOptions()
          return new WalletConnect({ session }, nativeOptions)
        }),
      )

      updateConnectors(connectors)
    } catch (error) {
      // console.error()
    }
  }

  // Called from UI to estanlis a connection
  const walletConnectOnSessionRequest = async (uri: string) => {
    debug('onSessionRequest')
    const nativeOptions = await getNativeOptions()
    const connector = new WalletConnect({ uri }, nativeOptions)

    connector.on(
      AppConstants.events.WALLET_CONNECT.SESSION_REQUEST,
      (error: any, payload: any) => {
        debug('Session requested')
        if (error) {
          debug(error)
          throw error
        }
        const { peerId, peerMeta } = payload.params[0]
        const updatedPending = pending.concat([connector])

        updatePending(updatedPending)

        // Send everythign internal event listener to handle
        wcEventHub.emit(
          AppConstants.events.WALLET_CONNECT.SESSION_REQUEST_INT,
          { peerId, peerMeta, payload },
        )
      },
    )
  }

  // Called from UI
  const walletConnectApproveSessionRequest = async (
    peerId: string,
    response: { accounts: string[]; chainId: number },
  ) => {
    let updatedConnectors = [...connectors]
    let updatedPending: any[] = []

    pending.forEach((connector: WalletConnect) => {
      if (connector.peerId === peerId) {
        connector.approveSession({
          accounts: response.accounts,
          chainId: response.chainId,
        })
        asyncStorageSaveSession(connector.session)
        updatedConnectors.push(connector)
      } else {
        updatedPending.push(connector)
      }
    })

    updateConnectors(updatedConnectors)
    updatePending(updatedPending)
    updatePeerId(peerId)
  }

  const walletConnectRejectSessionRequest = (peerId: string) => {
    const connector = pending.filter(
      (pendingConnector: WalletConnect) => pendingConnector.peerId === peerId,
    )[0]

    connector.rejectSession()

    const updatedPending = pending.filter(
      (connector: WalletConnect) => connector.peerId !== peerId,
    )

    updatePending(updatedPending)
  }

  const walletConnectKillSession = (peerId: string) => {
    const updatedConnectors = connectors.filter((connector: WalletConnect) => {
      if (connector.peerId === peerId) {
        connector.killSession()
        asyncStorageDeleteSession(connector.session)
        return false
      }
      return true
    })

    updateConnectors(updatedConnectors)
  }

  const walletConnectSubscribeToEvents = async (peerId: string) => {
    console.log('Connecting to:', peerId)

    const connector = connectors.filter(
      (connector: WalletConnect) => connector.peerId === peerId,
    )[0]

    connector.on(
      AppConstants.events.WALLET_CONNECT.CALL_REQUEST,
      (error: any, payload: any) => {
        if (error) {
          throw error
        }

        const updatedconnector = connectors.filter(
          (connector: WalletConnect) => connector.peerId === peerId,
        )[0]

        let updatedRequests = requests.concat([
          {
            connector: updatedconnector,
            payload: payload,
          },
        ])

        updateRequests(updatedRequests)

        wcEventHub.emit(AppConstants.events.WALLET_CONNECT.CALL_REQUEST_INT, {
          peerId,
          payload,
          peerMeta: connector.peerMeta,
        })
      },
    )

    connector.on(
      AppConstants.events.WALLET_CONNECT.DISCONNECT,
      (error: any) => {
        if (error) {
          throw error
        }
        const updatedConnectors = connectors.filter(
          (connector: WalletConnect) => {
            if (connector.peerId === peerId) {
              asyncStorageDeleteSession(connector.session)
              return false
            }
            return true
          },
        )

        updateConnectors(updatedConnectors)

        wcEventHub.emit(AppConstants.events.WALLET_CONNECT.DISCONNECT_INT)
      },
    )

    updatePeerId(null)
  }

  const walletConnectApproveCallRequest = async (
    peerId: string,
    response: { id: number; result: any },
  ) => {
    const connector = connectors.filter(
      (connector: WalletConnect) => connector.peerId === peerId,
    )[0]

    await connector.approveRequest(response)

    const updatedRequests = requests.filter(
      (request: IWalletConnectRequest) => request.payload.id !== response.id,
    )

    updateRequests(updatedRequests)
  }

  const walletConnectRejectCallRequest = async (
    peerId: string,
    response: { id: number; error: { message: string } },
  ) => {
    const request = requests.filter(
      (request: { connector: WalletConnect; payload: any }) =>
        request.connector.peerId === peerId,
    )[0]

    await request.connector.rejectRequest(response)

    const updatedRequests = pending.filter((request: IWalletConnectRequest) => {
      return request.payload.id !== response.id
    })

    updateRequests(updatedRequests)
  }

  const state = {
    connectors,
    requests,
    pending,
  }

  return (
    <WalletConnectContext.Provider
      value={{
        state,
        walletConnectInit,
        walletConnectSubscribeToEvents,
        walletConnectOnSessionRequest,
        walletConnectApproveSessionRequest,
        walletConnectRejectSessionRequest,
        walletConnectApproveCallRequest,
        walletConnectRejectCallRequest,
        walletConnectKillSession,
      }}
    >
      {props.children}
    </WalletConnectContext.Provider>
  )
}
