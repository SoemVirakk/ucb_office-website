import "@testing-library/jest-dom/vitest"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import ExchangeRateTicker from "./ExchangeRateTicker.jsx"

function mockReducedMotion(matches) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
}

describe("ExchangeRateTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockReducedMotion(false)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it("renders the first mock currency with flag image and accessible label", () => {
    render(<ExchangeRateTicker />)

    expect(
      screen.getByLabelText(
        "Exchange rate USD. Buy 4,043. Sell 4,058. View exchange rates",
      ),
    ).toHaveAttribute("href", "/exchange-rates")
    expect(screen.getByAltText("United States flag")).toHaveAttribute(
      "src",
      "/assets/images/flags/us.svg",
    )
  })

  it("rotates to the next currency every 3 seconds", () => {
    render(<ExchangeRateTicker />)

    expect(screen.getByText("USD")).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByText("THB")).toBeInTheDocument()
    expect(screen.getByAltText("Thailand flag")).toHaveAttribute(
      "src",
      "/assets/images/flags/th.svg",
    )
  })

  it("pauses rotation on keyboard focus and resumes on blur", () => {
    render(<ExchangeRateTicker />)
    const ticker = screen.getByLabelText(
      "Exchange rate USD. Buy 4,043. Sell 4,058. View exchange rates",
    )

    fireEvent.focus(ticker)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText("USD")).toBeInTheDocument()

    fireEvent.blur(ticker)
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByText("THB")).toBeInTheDocument()
  })

  it("shows USD only when reduced motion is enabled", () => {
    mockReducedMotion(true)
    render(<ExchangeRateTicker />)

    act(() => {
      vi.advanceTimersByTime(9000)
    })

    expect(screen.getByText("USD")).toBeInTheDocument()
    expect(screen.queryByText("THB")).not.toBeInTheDocument()
  })

  it("cleans up the rotation interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(window, "clearInterval")
    const { unmount } = render(<ExchangeRateTicker />)

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })
})
