import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../../helpers/api-util'
import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import { Fragment, useEffect, useState } from 'react'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import Head from 'next/head'

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()

  const filteredData = router.query.slug

  const { data, error } = useSWR(
    'https://nextjs-course-32367-default-rtdb.firebaseio.com/events.json',
    fetcher
  )

  useEffect(() => {
    if (data) {
      const events = []
      for (let key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setLoadedEvents(events)
    }
  }, [data])

  let pageHeadData = (
    <Head>
      <title>Filterd Events</title>
      <meta name='description' content={`A List of Filtered Events`} />
    </Head>
  )

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </Fragment>
    )
  }

  const filterdYear = filteredData[0]
  const filterdMonth = filteredData[1]

  const numYear = +filterdYear
  const numMonth = +filterdMonth

  pageHeadData = (
    <Head>
      <title>Filterd Events</title>
      <meta
        name='description'
        content={`All Events For ${numMonth}/${numYear}`}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>Invalid filter. Please adjust your values !</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for this filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

//server side rendering <= this is the only way to get the data from the server

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filteredData = params.slug

//   const filterdYear = filteredData[0]
//   const filterdMonth = filteredData[1]

//   const numYear = +filterdYear
//   const numMonth = +filterdMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//       notFound: true,
//       redirect : {
//         destination: '/error',
//       }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   }
// }

export default FilteredEventsPage
