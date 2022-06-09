import { render, RenderResult, screen } from '@testing-library/react'

import withProviders from '../../test/utils/withProviders'
import { candyMachineIdFixture, clusterFixture } from '../../test/fixtures'

import CandyMachineCard from '.'

import { CandyMachineCardProps } from './types'

const onChangeMock = jest.fn()

const renderComponent = (componentProps?: Partial<CandyMachineCardProps>): RenderResult =>
  render(
    withProviders(
      <CandyMachineCard
        cluster={clusterFixture}
        candyMachineId={candyMachineIdFixture}
        onClusterChange={onChangeMock}
        onCandyMachineIdChange={onChangeMock}
        isLoading={false}
        {...componentProps}
      />
    )
  )

describe('CandyMachineCard', () => {
  it('should display correct layout', () => {
    renderComponent()

    expect(screen.getByText('Candy Machine')).toBeInTheDocument()
    expect(screen.getByText('Cluster')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Candy Machine ID' })).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).toBeNull()
    expect(screen.getByText('Enter more then 7 symbols to find details')).toBeInTheDocument()
  })

    it('check values', () => {
        renderComponent()
        expect(screen.getByDisplayValue(candyMachineIdFixture)).toBeInTheDocument()
        expect(screen.getByDisplayValue(clusterFixture)).toBeInTheDocument()
    })

    it('check progress if loading true', () => {
        renderComponent({isLoading: true})
        expect(screen.queryByRole('progressbar')).toBeInTheDocument()
    })


})
