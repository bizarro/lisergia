import { Request, Response } from 'express'

export default async (request: Request, response: Response) => {
  const { email } = request.body

  try {
    const body = JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: 'SUBSCRIBED',
                      },
                    },
                  },
                  email,
                },
              },
            ],
          },
          historical_import: false,
        },
        relationships: {
          list: {
            data: {
              id: process.env.KLAVIYO_LIST_ID,
              type: 'list',
            },
          },
        },
      },
    })

    const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs'
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/vnd.api+json',
        revision: '2025-04-15',
        'content-type': 'application/vnd.api+json',
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
      },
      body,
    }

    const fetchResponse = await fetch(url, options)

    if (fetchResponse.status === 202) {
      response.status(202).send('Successfully subscribed!')
    } else {
      response.status(fetchResponse.status).send('Subscription failed.')
    }
  } catch (error) {
    console.error('Error Subscribing:', error)

    response.status(500).send('An error occurred.')
  }
}
