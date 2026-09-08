import { useState } from "react"
import type { CreditCardProduct } from "../../data/creditCards"

interface CreditCardProductCardProps {
  product: CreditCardProduct
}

/** Renders a fallback card visual when the product image cannot load. */
function CreditCardPlaceholder({ productName }: { productName: string }) {
  return (
    <svg
      className="credit-card-placeholder"
      viewBox="0 0 360 227"
      role="img"
      aria-label={`${productName} card image unavailable`}
    >
      <rect width="360" height="227" rx="20" fill="#E6F7F7" />
      <rect x="24" y="34" width="76" height="48" rx="8" fill="#009C9F" />
      <rect x="24" y="124" width="220" height="14" rx="7" fill="#0A2540" />
      <rect x="24" y="152" width="144" height="10" rx="5" fill="#0A2540" />
      <circle cx="292" cy="170" r="26" fill="#009C9F" opacity="0.85" />
      <circle cx="322" cy="170" r="26" fill="#0A2540" opacity="0.85" />
    </svg>
  )
}

/** Renders an interactive credit-card product card with optional flip behavior. */
export default function CreditCardProductCard({
  product,
}: CreditCardProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const hasBenefits = Boolean(product.benefits?.length)
  const selectedImageUrl = isFlipped
    ? product.cardBackImageUrl
    : product.cardFrontImageUrl
  const showImage = selectedImageUrl && !imageFailed

  /** Switches a credit-card image to its fallback placeholder after load failure. */
  const handleImageError = () => {
    setImageFailed(true)

    if (import.meta.env.DEV) {
      console.warn(
        `Credit card image failed to load: slug=${product.slug}, imageUrl=${selectedImageUrl}`,
      )
    }
  }

  return (
    <article
      className={`product-card credit-card-product-card ${
        hasBenefits ? "has-benefits" : "has-no-benefits"
      }`}
    >
      <div className="credit-card-badges">
        {product.category && (
          <span className="credit-card-badge">{product.category}</span>
        )}
        {product.isNew && <span className="credit-card-badge is-new">New</span>}
      </div>

      <div className="credit-card-media-section">
        <div
          className="credit-card-media"
          role="button"
          tabIndex={0}
          aria-label={`Show ${isFlipped ? "front" : "back"} of ${product.name}`}
          onClick={() => {
            if (product.cardFrontImageUrl && product.cardBackImageUrl) {
              setImageFailed(false)
              setIsFlipped((flipped) => !flipped)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              if (product.cardFrontImageUrl && product.cardBackImageUrl) {
                setImageFailed(false)
                setIsFlipped((flipped) => !flipped)
              }
            }
          }}
        >
          {showImage ? (
            <img
              className="credit-card-image"
              src={selectedImageUrl}
              alt={`${product.name} — ${isFlipped ? "back" : "front"}`}
              onError={handleImageError}
            />
          ) : (
            <CreditCardPlaceholder productName={product.name} />
          )}
        </div>
      </div>

      <div className="credit-card-content">
        <h3>{product.name}</h3>
        {product.shortDescription && <p>{product.shortDescription}</p>}

        {product.annualFee?.displayText && (
          <div className="credit-card-fee">{product.annualFee.displayText}</div>
        )}

        {hasBenefits && product.benefits && (
          <ul className="credit-card-benefits">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="credit-card-footer">
        {product.productDetailUrl && (
          <a href={product.productDetailUrl}>View card details →</a>
        )}
        {product.disclaimer && (
          <p className="credit-card-disclaimer">{product.disclaimer}</p>
        )}
      </div>
    </article>
  )
}
