import { describe, expect, test } from 'vitest'
import useFilteredBottles from './useFilteredBottles'
describe('useFilteredBottles', () => {
  test('should return an array of bottles', () => {
    const bottles = [{ name: 'test', cellar: 'test' }]
    expect(useFilteredBottles([], '')).toEqual([])
    expect(useFilteredBottles(bottles, '')).toEqual(bottles)
    expect(useFilteredBottles(bottles, 'test')).toEqual(bottles)
    expect(useFilteredBottles(bottles, 'TEST')).toEqual(bottles)
    expect(useFilteredBottles(bottles, 'TEST2')).toEqual([])
  })
})
