import { getReviews } from '@/api/reviews'
import { supabase } from '@/supabase'
import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: <any>[],
    reviewsSubscriber: <any>{},
  }),
  getters: {
    totalReviews(): number {
      return this.reviews.length
    },
    latestReviews(): any[] {
      return this.reviews.slice(0, 5)
    },
    reviewsById(state) {
      return (id: number) =>
        state.reviews.filter((review: any) => review.bottleId === id)
    },
  },
  actions: {
    async fetchReviews() {
      try {
        let { data, error, status } = await getReviews()
        if (error && status !== 406) throw error
        if (data) {
          const reviews = data.map((review) => ({
            id: review.id,
            bottleId: review.bottle_id,
            rating: review.rating,
            comment: review.comment,
            date: review.date_added,
            ...review.bottles,
            ...review.profiles,
          }))

          this.setReviews(reviews)
          this.reviewsSubscriber = supabase
            .from('reviews')
            .on('*', async (payload) => {
              console.log('Change received!', payload)
              switch (payload.eventType) {
                case 'INSERT':
                  const bottleData = await this.reviewsById(payload.new.id)
                  if (bottleData.data) {
                    const bottleReview = {
                      ...payload.new,
                      ...bottleData.data[0].bottles,
                      ...bottleData.data[0].profiles,
                    }
                    this.addReview(bottleReview)
                  }
                  break
                case 'UPDATE':
                  this.modifyReview(payload.new)
                  return
                case 'DELETE':
                  this.deleteReview(payload.new.id)
                  break
              }
            })
            .subscribe()
        }
      } catch (error: any) {
        alert(error.message)
      }
    },
    unsuscribeReviews() {
      supabase.removeSubscription(this.reviewsSubscriber)
    },
    destroyCellar() {
      this.unsuscribeReviews()
      this.resetReviews()
    },
    setReviews(reviews: any[]) {
      this.reviews = reviews
    },
    resetReviews() {
      this.reviews = []
    },
    addReview(review: {}) {
      this.reviews.push(review)
    },
    modifyReview(review: { id: number; rating: number; comment: string }) {
      let reviewFinded = this.reviews.find((item: any) => {
        return review.id === item.id
      })
      reviewFinded.rating = review.rating
      reviewFinded.comment = review.comment
    },
    deleteReview(id: number) {
      this.reviews = this.reviews.filter((item: any) => {
        return item.id !== id
      })
    },
  },
})
