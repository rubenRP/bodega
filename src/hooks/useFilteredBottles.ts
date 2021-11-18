import { Bottle } from '@/models/cellar'

export default function useFilteredBottles(
  bottles: Bottle[],
  searchQuery: string
): Bottle[] {
  return bottles.filter((bottle: Bottle) => {
    return (
      bottle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.cellar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.apellation?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
}
