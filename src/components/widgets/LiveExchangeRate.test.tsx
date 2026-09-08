import "@testing-library/jest-dom/vitest"
import { act, cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import LiveExchangeRate from "./LiveExchangeRate"
import { getUsdQuoteExchangeRate } from "../../services/exchangeRatesApi"

vi.mock("../../services/exchangeRatesApi", () => ({
  getUsdQuoteExchangeRate: vi.fn(),
}))

const mockGetUsdQuoteExchangeRate = vi.mocked(getUsdQuoteExchangeRate)

describe("LiveExchangeRate", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockGetUsdQuoteExchangeRate.mockReset()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  async function flushPromises() {
    await act(async () => {
      await Promise.resolve()
    })
  }

  it("shows a subtle loading state before the first response", () => {
    mockGetUsdQuoteExchangeRate.mockReturnValue(new Promise(() => {}))

    render(<LiveExchangeRate />)

    expect(screen.getByText("USD/KHR -")).toBeInTheDocument()
    expect(
      screen.getByLabelText(
        "Live USD to KHR exchange rate loading. View exchange rates",
      ),
    ).toHaveAttribute("href", "/exchange-rates")
  })

  it("shows the live USD/KHR rate after a successful request", async () => {
    mockGetUsdQuoteExchangeRate.mockResolvedValue({ rate: 4060, quote: "KHR" })

    render(<LiveExchangeRate />)
    await flushPromises()

    expect(screen.getByText("USD/KHR 4,060")).toBeInTheDocument()
    expect(
      screen.getByLabelText(
        "Live USD to KHR exchange rate: 4,060. View exchange rates",
      ),
    ).toBeInTheDocument()
  })

  it("keeps the last successful rate when a later request fails", async () => {
    mockGetUsdQuoteExchangeRate
      .mockResolvedValueOnce({ rate: 4060, quote: "KHR" })
      .mockRejectedValueOnce(new Error("network unavailable"))

    render(<LiveExchangeRate />)
    await flushPromises()

    expect(screen.getByText("USD/KHR 4,060")).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(3000)
      await Promise.resolve()
    })

    expect(mockGetUsdQuoteExchangeRate).toHaveBeenCalledTimes(2)
    expect(screen.getByText("USD/EUR -")).toBeInTheDocument()
  })

  it("clears the refresh interval when unmounted", () => {
    mockGetUsdQuoteExchangeRate.mockResolvedValue({ rate: 4060, quote: "KHR" })
    const clearIntervalSpy = vi.spyOn(window, "clearInterval")

    const { unmount } = render(<LiveExchangeRate />)
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    clearIntervalSpy.mockRestore()
  })

  it("loops through supported currency pairs on the interval", async () => {
    mockGetUsdQuoteExchangeRate
      .mockResolvedValueOnce({ rate: 4060, quote: "KHR" })
      .mockResolvedValueOnce({ rate: 0.92, quote: "EUR" })

    render(<LiveExchangeRate />)
    await flushPromises()

    expect(screen.getByText("USD/KHR 4,060")).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(3000)
      await Promise.resolve()
    })

    expect(screen.getByText("USD/EUR 0.92")).toBeInTheDocument()
    expect(mockGetUsdQuoteExchangeRate).toHaveBeenNthCalledWith(
      1,
      "KHR",
      expect.any(AbortSignal),
    )
    expect(mockGetUsdQuoteExchangeRate).toHaveBeenNthCalledWith(
      2,
      "EUR",
      expect.any(AbortSignal),
    )
  })
})
