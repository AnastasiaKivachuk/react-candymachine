import {formatDate, getSolanaExplorerLink} from "./index";
import {DEVNET, MAINNET, TESTNET} from "../configuration/availableNetworkAddresses";

describe('Utils', () => {
describe('formatDate util', () => {
    const data = new Date('Tue Aug 31 2021 18:00:00 GMT+0300 (Moscow Standard Time)');
    const result = '9 months ago - Tue Aug 31 2021 18:00:00 GMT+0300'

    it('formatDate if correct', () => {
        expect(formatDate(data)).toBe(result)
    })
})
    describe('getSolanaExplorerLink util', () => {
        const address = '9vwYtcJsH1MskNaixcjg';

        it('default value if selectedCluster empty', () => {
            expect(getSolanaExplorerLink('', address)).toBe('#')
        })

        it('value if selectedCluster is MAINNET', () => {
            expect(getSolanaExplorerLink(MAINNET, address)).toBe(`https://explorer.solana.com/address/${address}`)
        })
        it('value if selectedCluster is TESTNET', () => {
            expect(getSolanaExplorerLink(TESTNET, address)).toBe(`https://explorer.solana.com/address/${address}?cluster=testnet`)
        })
        it('value if selectedCluster is DEVNET', () => {
            expect(getSolanaExplorerLink(DEVNET, address)).toBe(`https://explorer.solana.com/address/${address}?cluster=devnet`)
        })

    })
})