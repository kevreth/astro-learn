import { test, expect} from 'vitest'
import {PropertyJSONLDParams, generatePropertiesJSONLD} from './re.schema'
const properties: PropertyJSONLDParams[] = [
  {
    name: "Luxury Beachfront Villa",
    description: "A stunning 5-bedroom villa with ocean views and a private pool.",
    image: "https://example.com/images/villa.jpg",
    price: 2500000,
    currency: "USD",
    address: {
      streetAddress: "123 Ocean Drive",
      addressLocality: "Miami Beach",
      addressRegion: "FL",
      postalCode: "33139",
      addressCountry: "US"
    },
    geo: { latitude: 25.7617, longitude: -80.1918 },
    url: "https://example.com/property/123",
    propertyType: "SingleFamilyResidence",
    numberOfRooms: 5,
    floorSize: { value: 450, unit: "SQM" }
  },
  {
    name: "Modern Downtown Apartment",
    description: "A high-rise apartment with city views and luxury amenities.",
    image: "https://example.com/images/apartment.jpg",
    price: 750000,
    currency: "USD",
    address: {
      streetAddress: "456 Main Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US"
    },
    geo: { latitude: 40.7128, longitude: -74.006 },
    url: "https://example.com/property/456",
    propertyType: "Apartment",
    numberOfRooms: 3,
    floorSize: { value: 120, unit: "SQM" }
  }
]
test('generatePropertiesJSONLD returns correctly formatted JSON-LD objects', () => {
  const result = generatePropertiesJSONLD(properties)
  expect(result).toBeInstanceOf(Array)
  expect(result.length).toBe(2)
  const json1 = JSON.parse(result[0])
  const json2 = JSON.parse(result[1])
  expect(json1['@context']).toBe("https://schema.org")
  expect(json1.mainEntity.name).toBe("Luxury Beachfront Villa")
  expect(json1.mainEntity.address.streetAddress).toBe("123 Ocean Drive")
  expect(json2['@context']).toBe("https://schema.org")
  expect(json2.mainEntity.name).toBe("Modern Downtown Apartment")
  expect(json2.mainEntity.address.streetAddress).toBe("456 Main Street")
  expect(result[1]).toContain('"streetAddress": "456 Main Street"')
})