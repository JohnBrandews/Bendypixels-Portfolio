import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'pgh7r241',
    dataset: 'myportfolio',
    apiVersion: '2024-01-01',
    useCdn: true,
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => {
    return builder.image(source)
}