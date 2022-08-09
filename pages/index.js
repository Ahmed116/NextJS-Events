import Head from 'next/head'
import { getFeaturedEvents } from '../helpers/api-util'
import EventsList from '../components/events/event-list'

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NextJS Events' />
      </Head>
      <EventsList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
    // revaledate: 1000,
  }
}

export default HomePage
