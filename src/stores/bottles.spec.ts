import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import { Bottle } from '../models/cellar'
import { useBottlesStore } from './bottles'

const bottles: Bottle[] = [
  {
    id: 1,
    name: 'Chateau Margaux',
    cellar: 'Chateau Margaux',
    vintage: 2010,
    country: 'France',
    region: 'Bordeaux',
    apellation: 'Margaux',
    type: 'Red',
    qty: 1,
    last_added: new Date(),
    mycellar: true,
    reviewed: true,
    date_scraped: new Date(),
    alcohol_content: '13.5%',
    climate_soil: 'Mediterranean',
    consumption: '2020-2030',
    aging: '18 months',
    stay_barrel: '18 months',
    grapes: ['Cabernet Sauvignon', 'Merlot'],
    description: 'A great wine',
    image:
      'https://www.chateau-margaux.com/wp-content/uploads/2019/10/Chateau-Margaux-2010-1.jpg',
    location: 'Cellar',
  },
  {
    id: 2,
    name: 'Chateau Lafite Rothschild',
    cellar: 'Chateau Lafite Rothschild',
    vintage: 2010,
    country: 'France',
    region: 'Bordeaux',
    apellation: 'Pauillac',
    type: 'Red',
    qty: 1,
    last_added: new Date(),
    mycellar: true,
    reviewed: true,
    date_scraped: new Date(),
    alcohol_content: '13.5%',
    climate_soil: 'Mediterranean',
    consumption: '2020-2030',
    aging: '18 months',
    stay_barrel: '18 months',
    grapes: ['Cabernet Sauvignon', 'Merlot'],
    description: 'A great wine',
    image:
      'https://www.chateau-margaux.com/wp-content/uploads/2019/10/Chateau-Margaux-2010-1.jpg',
    location: 'Cellar',
  },
  {
    id: 3,

    name: 'Chateau Latour',
    cellar: 'Chateau Latour',

    vintage: 2010,
    country: 'France',
    region: 'Bordeaux',
    apellation: 'Pauillac',
    type: 'Red',
    qty: 1,
    last_added: new Date(),
    mycellar: true,
    reviewed: true,
    date_scraped: new Date(),
    alcohol_content: '13.5%',
    climate_soil: 'Mediterranean',
    consumption: '2020-2030',
    aging: '18 months',
    stay_barrel: '18 months',
    grapes: ['Cabernet Sauvignon', 'Merlot'],
    description: 'A great wine',
    image:
      'https://www.chateau-margaux.com/wp-content/uploads/2019/10/Chateau-Margaux-2010-1.jpg',
    location: 'Cellar',
  },
]

describe('Bottles store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('sets bottles ', () => {
    const bottleStore = useBottlesStore()
    bottleStore.setBottles(bottles)
    expect(bottleStore.bottles).toEqual(bottles)
  })
})
