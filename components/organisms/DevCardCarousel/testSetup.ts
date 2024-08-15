import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { STUB_DEV_CARDS } from "components/organisms/DevCardCarousel/stubData";


export const restHandlers = [
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/users/zeucapua/devstats?range=30`, () => {
    return HttpResponse.json({})
  }),
]

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

