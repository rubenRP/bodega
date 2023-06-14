import { setActivePinia, createPinia } from "pinia";
import { describe, beforeEach, it, expect, afterEach, vi, test } from "vitest";
import { useBottlesStore } from "./bottles";
import * as bottlesApi from "../api/bottles";

const getAllBottlesMock = vi.fn().mockResolvedValue({
  data: [
    {
      id: 248,
      apellation: null,
      cellar: "J.L. Wolf",
      country: "Alemania",
      name: "Villa Wolf Wachenheimer",
      qty: 1,
      region: "Pfalz",
      type: "White",
      vintage: 2020,
      last_added: "2023-03-13",
      mycellar: true,
      reviewed: false,
      date_scrapped: null,
      alcohol_content: null,
      climate_soil: null,
      aging: null,
      consumption: null,
      stay_barrel: null,
      grapes: null,
      description: null,
      image: null,
      location: "home",
    },
    {
      id: 250,
      apellation: "Rioja",
      cellar: "El Coto de Imaz",
      country: "España",
      name: "El Coto Crianza",
      qty: 1,
      region: "La Rioja",
      type: "Red",
      vintage: 2019,
      last_added: "2023-03-13",
      mycellar: true,
      reviewed: false,
      date_scrapped: null,
      alcohol_content: null,
      climate_soil: null,
      aging: null,
      consumption: null,
      stay_barrel: null,
      grapes: null,
      description: null,
      image: null,
      location: "home",
    },
  ],
  error: null,
  status: 200,
});

describe("Bottles store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  afterEach(() => {
    setActivePinia(undefined);
    vi.restoreAllMocks();
  });
  test("getAllBottles", async () => {
    const store = useBottlesStore();
    const spy = vi
      .spyOn(bottlesApi, "getAllBottles")
      .mockImplementation(getAllBottlesMock);
    await store.fetchBottles();
    expect(store.allBottles).toHaveLength(2);
    expect(spy).toHaveBeenCalled();
  });
});
