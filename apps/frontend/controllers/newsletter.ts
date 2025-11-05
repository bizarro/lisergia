export default async (context: any) => {
  const { email } = context.body

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
      return new Response('Successfully subscribed!', { status: 202 })
    } else {
      return new Response('Subscription failed.', { status: fetchResponse.status })
    }
  } catch (error) {
    console.error('Error Subscribing:', error)
    return new Response('An error occurred.', { status: 500 })
  }
}
