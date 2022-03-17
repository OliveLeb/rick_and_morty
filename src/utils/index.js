import { toRaw } from "vue"

export const sortEpisodesPerSeason = (array) => {
  return array.reduce((acc, obj) => {
    var cle = obj['episode'].slice(0, 3)
    if (!acc[cle]) acc[cle] = []
    acc[cle].push(obj)
    return acc
  }, {})
}

export const objectOfArraysToArray = (object) => {
  return Object.values(object)
    .map((key) => toRaw(key))
    .flat(1)
}