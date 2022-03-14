import React, { useContext, useMemo } from 'react'
import List from '../Nft/List'

export default function MarketList() {
    function refreshPage() {
        // @ts-ignore
      window.location.reload(false);
      }
    return (
        <>
            <div className="p-market__list">
                <List onClick={refreshPage}/>
            </div>
        </>
    )
}
