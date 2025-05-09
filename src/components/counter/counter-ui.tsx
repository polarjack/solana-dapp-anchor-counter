'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCounterProgram, useCounterProgramAccount } from './counter-data-access'

function LoadingSpinner() {
  return <span className="loading loading-spinner loading-lg"></span>
}

export function CounterCreate() {
  const { initialize } = useCounterProgram()

  const handleCreate = async () => {
    await initialize.mutateAsync(Keypair.generate())
  }

  return (
    <button
      className="btn btn-xs lg:btn-md btn-primary"
      onClick={handleCreate}
      disabled={initialize.isPending}
    >
      Create {initialize.isPending && '...'}
    </button>
  )
}

export function CounterList() {
  const {
    accounts,
    getProgramAccount,
    incrementAllMutation,
    decrementAllMutation,
    setAllMutation,
    closeAllMutation,
  } = useCounterProgram()
  const [refresh, setRefresh] = useState<number>(1)

  if (getProgramAccount.isLoading) {
    return <LoadingSpinner />
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and are on the correct cluster.
        </span>
      </div>
    )
  }

  const handleAction = async (action: () => Promise<any>) => {
    await action()
    setRefresh((r) => r + 1)
  }

  const handleSetAll = async () => {
    const value = window.prompt('Set value to:', '0')
    const num = parseInt(value || '')
    if (!value || isNaN(num)) return
    await setAllMutation.mutateAsync(num)
  }

  const mutationGroupVisible = accounts.data && accounts.data.length > 1

  return (
    <div className="space-y-6">
      {mutationGroupVisible && (
        <div className="flex gap-2 justify-center mb-4">
          <button
            className="btn btn-outline"
            disabled={incrementAllMutation.isPending}
            onClick={() => handleAction(incrementAllMutation.mutateAsync)}
          >
            Increase All
          </button>
          <button
            className="btn btn-outline"
            disabled={setAllMutation.isPending}
            onClick={handleSetAll}
          >
            Set All
          </button>
          <button
            className="btn btn-outline"
            disabled={decrementAllMutation.isPending}
            onClick={() => handleAction(decrementAllMutation.mutateAsync)}
          >
            Decrease All
          </button>
          <button
            className="btn btn-secondary btn-outline"
            disabled={closeAllMutation.isPending}
            onClick={async () => {
              if (window.confirm('Are you sure you want to close all accounts?')) {
                await handleAction(closeAllMutation.mutateAsync)
              }
            }}
          >
            Close All
          </button>
        </div>
      )}
      {accounts.isLoading ? (
        <LoadingSpinner />
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-3 gap-4">
          {accounts.data.map((account) => (
            <CounterCard key={account.publicKey.toString()} account={account.publicKey} refresh={refresh} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl">No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CounterCard({ account, refresh }: { account: PublicKey; refresh: number }) {
  const {
    accountQuery,
    incrementMutation,
    setMutation,
    decrementMutation,
    closeMutation,
    mintMutation,
    requestRedeemMutation,
    cancelRedeemRequestMutation,
  } = useCounterProgramAccount({ account })

  const count = useMemo(() => accountQuery.data?.count ?? 0, [accountQuery.data?.count])

  useEffect(() => {
    if (accountQuery.isFetched) {
      accountQuery.refetch()
    }
  }, [refresh, accountQuery])

  const handleIncrement = async () => await incrementMutation.mutateAsync()
  const handleDecrement = async () => await decrementMutation.mutateAsync()
  const handleMint = async () => {
    const value = window.prompt('Mint value:', '0')
    const num = parseInt(value || '')
    if (!value || isNaN(num)) return
    await mintMutation.mutateAsync(num)
  }

  const handleRequestRedeem = async () => {
    const value = window.prompt('Redeem value:', '0')
    const num = parseInt(value || '')
    if (!value || isNaN(num)) return
    await requestRedeemMutation.mutateAsync(num)
  }

  const handleCancelRedeemRequest = async () => {
    const value = window.prompt('Cancel redeem request value:', '0')
    const num = parseInt(value || '')
    if (!value || isNaN(num)) return
    await cancelRedeemRequestMutation.mutateAsync(num)
  }

  const handleSet = async () => {
    const value = window.prompt('Set value to:', count.toString())
    const num = parseInt(value || '')
    if (!value || isNaN(num) || num === count) return
    await setMutation.mutateAsync(num)
  }
  const handleClose = async () => {
    if (window.confirm('Are you sure you want to close this account?')) {
      await closeMutation.mutateAsync()
    }
  }

  return accountQuery.isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-3">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => accountQuery.refetch()}
          >
            {count}
          </h2>
          <div className="card-actions justify-center flex-wrap gap-2">
            {[
              { label: 'Increment',   onClick: handleIncrement,             pending: incrementMutation.isPending },
              { label: 'Set',         onClick: handleSet,                   pending: setMutation.isPending },
              { label: 'Decrement',   onClick: handleDecrement,             pending: decrementMutation.isPending },
            ].map(({ label, onClick, pending }) => (
              <button
                key={label}
                className="btn btn-xs lg:btn-md btn-outline"
                onClick={onClick}
                disabled={pending}
              >
                {label}
              </button>
            ))}

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-xs lg:btn-md btn-outline">
                Fake Actions
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    onClick={handleMint}
                    disabled={mintMutation.isPending}
                  >
                    Mint
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleRequestRedeem}
                    disabled={requestRedeemMutation.isPending}
                  >
                    Request Redeem
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleCancelRedeemRequest}
                    disabled={cancelRedeemRequestMutation.isPending}
                  >
                    Cancel Redeem
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink path={`account/${account}`} label={ellipsify(account.toString())} />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={handleClose}
              disabled={closeMutation.isPending}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
