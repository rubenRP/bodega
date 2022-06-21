import {
  decreaseBottleQty,
  getAddedBottles,
  getAllBottles,
  getOpenedBottles,
  increaseBottleQty,
} from '@/api/bottles'
import { Bottle } from '@/models/cellar'
import { supabase } from '@/supabase'
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
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.apellation)
            acc[curr.apellation] = (acc[curr.apellation] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarVintages() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.vintage] = (acc[curr.vintage] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarCountries() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          if (curr.country)
            acc[curr.country] = (acc[curr.country] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    totalCellarBottles() {
      return this.cellarBottles.reduce(
        (acc: number, curr: any) => acc + curr.qty,
        0
      )
    },
    totalBottles(): number {
      return this.bottles.length
    },
    latestCellarBottles() {
      return this.cellarBottles.slice(0, 5)
    },
    cellarTypes() {
      return this.cellarBottles.reduce(
        (acc: { [x: string]: any }, curr: any) => {
          acc[curr.type] = (acc[curr.type] || 0) + curr.qty
          return acc
        },
        {}
      )
    },
    bottlesFromCellar(state) {
      return (bottle: Bottle) =>
        state.bottles
          .filter(
            (b: Bottle) =>
              b.cellar.toLowerCase() === bottle.cellar.toLowerCase() &&
              b.id !== bottle.id
          )
          .sort((a: Bottle, b: Bottle) => b.vintage - a.vintage)
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
    async fetchBottles() {
      try {
        let { data, error, status } = await getAllBottles()
        if (error && status !== 406) throw error
        if (data) {
          this.setBottles(data)
          this.subscribeToBottles()
        }
      } catch (error: any) {
        alert(error.message)
      }
    },
    subscribeToBottles() {
      this.bottlesSubscriber = supabase
        .from('bottles')
        .on('*', (payload) => {
          console.log('Change received!', payload)
          // TODO Refactor this
          switch (payload.eventType) {
            case 'INSERT':
              this.addBottle(payload.new)
              this.fetchAddedBottles()
              this.fetchOpenedBottles()
              break
            case 'UPDATE':
              this.modifyBottle(payload.new)
              this.fetchAddedBottles()
              this.fetchOpenedBottles()
              return
            case 'DELETE':
              this.deleteBottle(payload.new.id)
              this.fetchAddedBottles()
              this.fetchOpenedBottles()
              break
          }
        })
        .subscribe()
    },
    unsuscribeToBottles() {
      supabase.removeSubscription(this.bottlesSubscriber)
    },
    async destroyBottles() {
      this.unsuscribeToBottles()
      this.resetBottles()
    },
    async fetchOpenedBottles() {
      try {
        let { data } = await getOpenedBottles()
        if (data) {
          this.setOpenedBottles(data)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async fetchAddedBottles() {
      try {
        let { data } = await getAddedBottles()
        if (data) {
          this.setAddedBottles(data)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async increaseBottleQty(info: { bottleId: number; qty: number }) {
      try {
        increaseBottleQty(info.bottleId, info.qty)
      } catch (e) {
        console.error(e)
      }
    },
    async decreaseBottleQty(info: { bottleId: number; qty: number }) {
      try {
        decreaseBottleQty(info.bottleId, info.qty)
      } catch (e) {
        console.error(e)
      }
    },
  },
})
