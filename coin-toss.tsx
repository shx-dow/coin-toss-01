"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CoinToss() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const [flipCount, setFlipCount] = useState(0)
  const [showSide, setShowSide] = useState<"heads" | "tails" | null>(null)

  // Effect to alternate between heads and tails during flip
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isFlipping) {
      interval = setInterval(() => {
        setShowSide((prev) => (prev === "heads" ? "tails" : "heads"))
      }, 150) // Fast switching between sides
    } else {
      setShowSide(result)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isFlipping, result])

  const flipCoin = () => {
    if (isFlipping) return

    setIsFlipping(true)
    setFlipCount((prev) => prev + 1)

    // Random result
    const newResult = Math.random() > 0.5 ? "heads" : "tails"

    // Set timeout to show the result after animation
    setTimeout(() => {
      setResult(newResult)
      setIsFlipping(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F172A] bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTI1MjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMC0zMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wIDYwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0zMC0zMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em02MCAwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0zMCAzMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wLTYwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTMwIDMwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS02MCAwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>

      <Card className="w-full max-w-md overflow-hidden border-0 bg-[#1E293B]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Coin Toss</h1>
            <p className="mt-2 text-gray-400">Tap the coin to flip</p>
          </div>

          <div className="flex justify-center mb-8">
            <motion.div
              className="relative cursor-pointer"
              onClick={flipCoin}
              animate={{
                rotateY: isFlipping ? flipCount * 1080 : undefined,
                scale: isFlipping ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="relative h-40 w-40">
                {/* Coin */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center border-2 border-amber-300/20">
                  <div className="text-gray-900 text-5xl font-bold">{showSide === "tails" ? "T" : "H"}</div>

                  {/* Edge detail */}
                  <div className="absolute inset-0 rounded-full border-8 border-amber-600/30"></div>

                  {/* Shine effect */}
                  <div className="absolute top-0 left-1/4 w-1/2 h-1/6 bg-white/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            {result && !isFlipping && <p className="text-xl font-medium capitalize text-white mb-4">{result}!</p>}
            <Button
              onClick={flipCoin}
              disabled={isFlipping}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
            >
              {isFlipping ? "Flipping..." : "Flip Coin"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <p className="mt-4 text-sm text-gray-400 backdrop-blur-sm px-3 py-1 rounded-full bg-gray-800/30">
          Last result: <span className="font-medium capitalize text-amber-400">{result}</span>
        </p>
      )}
    </div>
  )
}

