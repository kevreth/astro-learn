export type PropertyJSONLDParams = {
  name: string
  description: string
  image: string
  price: number
  currency: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: { latitude: number; longitude: number }
  url: string
  propertyType: string
  numberOfRooms: number
  floorSize: { value: number; unit: string }
}
export function generatePropertyJSONLD(params: PropertyJSONLDParams): string {
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "mainEntity": {
        "@type": params.propertyType,
        "name": params.name,
        "description": params.description,
        "image": params.image,
        "url": params.url,
        "numberOfRooms": params.numberOfRooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": params.floorSize.value,
          "unitCode": params.floorSize.unit
        },
        "address": {
          "@type": "PostalAddress",
          ...params.address
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": params.geo.latitude,
          "longitude": params.geo.longitude
        },
        "offers": {
          "@type": "Offer",
          "price": params.price,
          "priceCurrency": params.currency
        }
      }
    },
    null,
    2
  )
}
export function generatePropertiesJSONLD(properties: PropertyJSONLDParams[]): string[] {
  return properties.map(generatePropertyJSONLD)
}
