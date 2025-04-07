import CoinToss from "@/coin-toss"
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Coin Toss Game</title>
        <meta name="description" content="Flip a coin and test your luck!" />
      </Head>
      <CoinToss />
    </>
  )
}

