import { getLayout } from '@functions/getLayout'
import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = ()=>{
  return (
      <div className='' >
        <h1>Hai Hia</h1>
      </div>
  )
}
Home.getLayout = getLayout;
export default Home;