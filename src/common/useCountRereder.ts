import { useRef } from "react"

const NUMBER_OF_ITERATIONS = 10_000_000

function expensiveFunction() {
    let i = 0
    while (i < NUMBER_OF_ITERATIONS) {
        i++
    }
    console.log(i)
}

function useCountRerender() {
    const rerender = useRef(0)
    rerender.current += 1
    expensiveFunction()
    return rerender.current
}

export default useCountRerender