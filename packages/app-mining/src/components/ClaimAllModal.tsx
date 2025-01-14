import {usePolkadotAccountAtom} from '@phala/app-store'
import {Alert, Input, InputAction} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo, useState} from 'react'
import useFormat from '../hooks/useFormat'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import Decimal from 'decimal.js'
import type {TableItem} from './Delegate/MyDelegateTable'

const ClaimAllModal = (props: {
  onClose: () => void
  stakePools: TableItem[]
}): JSX.Element => {
  const {onClose, stakePools} = props
  const {api} = useApiPromise()
  const format = useFormat()
  const waitSignAndSend = useWaitSignAndSend()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const [address, setAddress] = useState<string>('')

  const rewards = useMemo<string>(
    () =>
      format(
        stakePools.reduce(
          (acc, {claimableRewards}) =>
            acc.add(claimableRewards || new Decimal(0)),
          new Decimal(0)
        )
      ),
    [stakePools, format]
  )

  const claimablePools = useMemo<TableItem[]>(() => {
    return stakePools.filter(
      ({claimableRewards}) => claimableRewards?.greaterThan(10 ** 10) // 0.01 PHA
    )
  }, [stakePools])

  const onConfirm = useCallback(async () => {
    if (api && address) {
      return waitSignAndSend(
        api.tx.utility.batchAll?.(
          claimablePools.map(
            ({pid}) =>
              api.tx.phalaStakePool?.claimRewards?.(pid, address) as any
          )
        )
      )
    }
  }, [api, waitSignAndSend, claimablePools, address])

  const onInputChange = useCallback((value) => {
    setAddress(value)
  }, [])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Claim All"
      subtitle="Claim all the pending rewards of the sender and send to the target"
      disabled={!address || !claimablePools.length}
    >
      <Label>Rewards</Label>
      <Value>{rewards}</Value>
      <Label>Target Address</Label>
      <Input
        value={address}
        onChange={onInputChange}
        after={
          <InputAction
            onClick={() => setAddress(polkadotAccount?.address || '')}
          >
            MY ADDRESS
          </InputAction>
        }
      ></Input>
      <Alert style={{marginTop: 20}}>
        Only claim rewards greater than 0.01 PHA.
      </Alert>
    </ActionModal>
  )
}

export default ClaimAllModal
