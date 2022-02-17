import { Bottle } from '@/models/cellar'
import { defineStore } from 'pinia'

export const useBottlesStore = defineStore('bottles', {
  state: () => ({
    bottles: [] as Bottle[],
    bottlesSubscriber: <any>{},
    openedBottles: [] as Bottle[],
    addedBottles: [] as Bottle[],
  }),
  getters: {
    cellarBottles(): Bottle[] {
      return this.bottles.filter(
        (bottle: Bottle) => bottle.mycellar && bottle.qty! > 0
      )
    },
    getBottleById(state) {
      return (id: number) =>
        state.bottles.find((bottle: Bottle) => bottle.id === id)
    },
    totalCellarApellations() {
      return this.cellarBottles().reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.apellation)
            acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarVintages() {
      return this.cellarBottles().reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.vintage] = (acc[curr.vintage] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarCountries() {
      return this.cellarBottles().reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.country)
            acc[curr.country] = (acc[curr.country] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarBottles() {
      return this.cellarBottles().reduce(
        (acc: number, curr: any) => acc + curr.qty,
        0
      )
    },
    totalBottles(): number {
      return this.bottles.length
    },
    latestCellarBottles() {
      return this.cellarBottles().slice(0, 5)
    },
    cellarTypes() {
      return this.cellarBottles().reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.type] = (acc[curr.type] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
  },
  actions: {
    setBottles(bottles: Bottle[]) {
      this.bottles = bottles
    },
    resetBottles() {
      this.bottles = []
    },
    addBottle(bottle: Bottle) {
      this.bottles.unshift(bottle)
    },
    deleteBottle(bottle: Bottle) {
      this.bottles = this.bottles.filter((b) => b.id !== bottle.id)
    },
    modifyBottle(bottle: Bottle) {
      let bottleFinded = this.bottles.find((item: any) => {
        return bottle.id === item.id
      })
      if (bottleFinded) {
        Object.assign(bottleFinded, bottle)
      }
    },
    setOpenedBottles(bottles: Bottle[]) {
      this.openedBottles = bottles
    },
    setAddedBottles(bottles: Bottle[]) {
      this.addedBottles = bottles
    },
  },
})
