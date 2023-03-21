import { Bottle } from "~~/types/bottle";

export default function useFilteredBottles(
  bottles: Bottle[],
  searchQuery: string,
  type?: string
): Bottle[] {
  let filteredBottles = bottles.filter((bottle: Bottle) => {
    return (
      bottle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.cellar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bottle.apellation?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  if (type != "All" && type != "") {
    filteredBottles = filteredBottles.filter((bottle: Bottle) => {
      return bottle.type === type;
    });
  }
  return filteredBottles;
}
