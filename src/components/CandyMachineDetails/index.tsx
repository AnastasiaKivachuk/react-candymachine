import {useMemo, memo} from 'react'
import styled from '@emotion/styled'

import Card from '@mui/material/Card'
import Link from '@mui/material/Link'

import theme from '../../configuration/theme'
import {formatDate, getSolanaExplorerLink} from '../../utils'

import {CandyMachineDetailsProps} from './types'
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const StyledCard = styled(Card)`
  min-width: 426px;
  margin: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  position: relative
`

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing(1)};
`

const StyledCardContentTitle = styled.p`
  margin: ${theme.spacing(0.1)};
`

const StyledCardContentDetails = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`

const StyledCardHeader = styled(CardHeader)`
  padding: ${theme.spacing(1)};
`

const StyledCardEmptyContent = styled(CardContent)`
  display: flex;
  left: 50%;
  justify-content: center;
  padding: ${theme.spacing(1)};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`


const CandyMachineDetails = ({cluster, data}: CandyMachineDetailsProps) => {
    const details = useMemo(
        () =>
            data
                ? [
                    {
                        title: 'Symbol',
                        value: data?.symbol
                    },
                    {
                        title: 'Authority',
                        value: (
                            <Link href={getSolanaExplorerLink(cluster, data?.authority)} target="_blank">
                                {data?.authority}
                            </Link>
                        )
                    },
                    {
                        title: 'Left Items',
                        value: data?.itemsAvailable - data?.itemsRedeemed
                    },
                    {
                        title: 'Available Items',
                        value: data?.itemsAvailable
                    },
                    {
                        title: 'Redeemed Items',
                        value: data?.itemsRedeemed
                    },
                    {
                        title: 'Wallet',
                        value: (
                            <Link href={getSolanaExplorerLink(cluster, data?.wallet)} target="_blank">
                                {data?.wallet}
                            </Link>
                        )
                    },
                    {
                        title: 'Live date',
                        value: formatDate(data?.goLiveDate)
                    },
                    {
                        title: 'Seller Fee Basis Points',
                        value: data?.sellerFeeBasisPoints
                    }
                ]
                : [],
        [cluster, data]
    )

    return (
        <StyledCard className='details'>
            {data ?
                <>
                    <StyledCardHeader
                        title={<Typography variant="h6" className='title'>Details</Typography>}>
                    </StyledCardHeader>
                    {details.map(({title, value}) => (
                        <StyledCardContent key={title}>
                            <StyledCardContentTitle>{title}</StyledCardContentTitle>
                            <StyledCardContentDetails>{value}</StyledCardContentDetails>
                        </StyledCardContent>
                    ))}
                </>
                :
                <StyledCardEmptyContent>
                    No data
                </StyledCardEmptyContent>
            }
        </StyledCard>
    )
}

CandyMachineDetails.defaultProps = {
    cluster: '', data: null
}

export default memo(CandyMachineDetails)
