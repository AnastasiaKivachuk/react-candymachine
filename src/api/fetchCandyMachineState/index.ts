import { web3, Wallet, Provider, Program } from '@project-serum/anchor'

import { CandyMachineState } from './types'
import { CANDY_MACHINE_PROGRAM } from './constants'

export async function fetchCandyMachineState(
  networkEndpoint: string,
  candyMachineID: string
): Promise<CandyMachineState | undefined> {
  try {
    const connection = new web3.Connection(networkEndpoint)
    const dummyWallet = new Wallet(web3.Keypair.generate())
    const provider = new Provider(connection, dummyWallet, {
      preflightCommitment: 'recent'
    })

    const idl = await Program.fetchIdl(CANDY_MACHINE_PROGRAM, provider)
    if (!idl) {
      throw Error('Cannot fetch IDL from candy machine program')
    }

    const program = new Program(idl, CANDY_MACHINE_PROGRAM, provider)

    const accountCandyMachine: any = await program.account.candyMachine.fetch(candyMachineID)

    const accountConfig: any = await program.account.config.fetch(
      accountCandyMachine.config.toBase58()
    )

    const candyMachineState: CandyMachineState = {
      itemsAvailable: accountCandyMachine.data.itemsAvailable.toNumber(),
      itemsRedeemed: accountCandyMachine.itemsRedeemed.toNumber(),
      goLiveDate: new Date(accountCandyMachine.data.goLiveDate.toNumber() * 1000),
      wallet: accountCandyMachine.wallet.toBase58(),
      authority: accountCandyMachine.authority.toBase58(),
      sellerFeeBasisPoints: accountConfig.data.sellerFeeBasisPoints,
      symbol: accountConfig.data.symbol
    }

    return candyMachineState
  } catch (err) {
    console.error('err', err)
    return undefined
  }
}
