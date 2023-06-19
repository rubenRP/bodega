import { defineStore } from "pinia";
import { useBottles } from "~/composables/bottles";
import { AddedBottle, Bottle, OpenedBottle } from "~~/types/bottle";

export const useBottlesStore = defineStore("bottles", {
  state: () => ({
    allBottles: [] as Bottle[],
    openedBottles: [] as OpenedBottle[],
    addedBottles: [] as AddedBottle[],
  }),
  getters: {
    cellarBottles(): Bottle[] {
      return this.allBottles.filter(
        (bottle: Bottle) => bottle.mycellar && bottle.qty! > 0
      );
    },
    getBottleById(state) {
      return (id: number) =>
        state.allBottles.find((bottle: Bottle) => bottle.id === id);
    },
    totalCellarApellations() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.apellation)
            acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty;
          return acc;
        },
        {}
      );
    },
    totalCellarVintages() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.vintage] = (acc[curr.vintage] || 0) + curr.qty;
          return acc;
        },
        {}
      );
    },
    totalCellarCountries() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.country)
            acc[curr.country] = (acc[curr.country] || 0) + curr.qty;
          return acc;
        },
        {}
      );
    },
    totalCellarBottles() {
      return this.cellarBottles.reduce(
        (acc: number, curr: any) => acc + curr.qty,
        0
      );
    },
    totalBottles(): number {
      return this.allBottles.length;
    },
    latestCellarBottles() {
      return this.cellarBottles.slice(0, 5);
    },
    cellarTypes() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.type] = (acc[curr.type] || 0) + curr.qty;
          return acc;
        },
        {}
      );
    },
    bottlesFromCellar(state) {
      return (bottle: Bottle) =>
        state.allBottles
          .filter(
            (b: Bottle) =>
              b.cellar.toLowerCase() === bottle.cellar.toLowerCase() &&
              b.id !== bottle.id &&
              b.qty! > 0
          )
          .sort((a: Bottle, b: Bottle) => b.vintage - a.vintage);
    },
    bottlesFromApellation(state) {
      return (bottle: Bottle) =>
        state.allBottles
          .filter(
            (b: Bottle) =>
              b.apellation?.toLowerCase() ===
                bottle.apellation?.toLowerCase() &&
              b.id !== bottle.id &&
              b.qty! > 0
          )
          .sort((a: Bottle, b: Bottle) => b.vintage - a.vintage);
    },
  },
  actions: {
    fetchStoreData() {
      this.fetchBottles();
      this.fetchOpenedBottles();
      this.fetchAddedBottles();
    },
    async fetchBottles() {
      const { allBottles } = useBottles();
      try {
        let { data } = await allBottles();
        if (data) {
          this.allBottles = data as Bottle[];
        }
      } catch (e) {
        console.error(e);
      }
    },
    async fetchOpenedBottles() {
      const { openedBottles } = useCellar();
      try {
        let { data } = await openedBottles();
        if (data) {
          this.openedBottles = data as OpenedBottle[];
        }
      } catch (e) {
        console.error(e);
      }
    },

    async fetchAddedBottles() {
      const { addedCellarBottles } = useCellar();
      try {
        let { data } = await addedCellarBottles();
        if (data) {
          this.addedBottles = data as AddedBottle[];
        }
      } catch (e) {
        console.error(e);
      }
    },
    addBottle(bottle: Bottle) {
      this.allBottles.unshift(bottle);
    },
    modifyBottle(bottle: Bottle) {
      let bottleFinded = this.allBottles.find((item: any) => {
        return bottle.id === item.id;
      });
      if (bottleFinded) {
        Object.assign(bottleFinded, bottle);
      }
    },
    deleteBottle(bottle: Bottle) {
      this.allBottles = this.allBottles.filter((b) => b.id !== bottle.id);
    },
    addOpenedBottle(bottle: OpenedBottle) {
      this.openedBottles.unshift(bottle);
    },
    modifyOpenedBottle(bottle: OpenedBottle) {
      let bottleFinded = this.openedBottles.find((item: any) => {
        return bottle.id === item.id;
      });
      if (bottleFinded) {
        Object.assign(bottleFinded, bottle);
      }
    },
    deleteOpenedBottle(bottle: OpenedBottle) {
      this.openedBottles = this.openedBottles.filter((b) => b.id !== bottle.id);
    },
    addAddedBottle(bottle: AddedBottle) {
      this.addedBottles.unshift(bottle);
    },
    modifyAddedBottle(bottle: AddedBottle) {
      let bottleFinded = this.addedBottles.find((item: any) => {
        return bottle.id === item.id;
      });
      if (bottleFinded) {
        Object.assign(bottleFinded, bottle);
      }
    },
    deleteAddedBottle(bottle: AddedBottle) {
      this.addedBottles = this.addedBottles.filter((b) => b.id !== bottle.id);
    },
    async increaseBottleQty(info: { bottleId: number; qty: number }) {
      const { increaseBottleQty } = useCellar();
      try {
        await increaseBottleQty(info.bottleId, info.qty);
      } catch (e) {
        console.error(e);
      }
    },
    async decreaseBottleQty(info: { bottleId: number; qty: number }) {
      const { decreaseBottleQty } = useCellar();
      try {
        await decreaseBottleQty(info.bottleId, info.qty);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
