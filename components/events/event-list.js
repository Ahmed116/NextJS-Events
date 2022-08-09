import EventItem from "./event-item";
import styles from "./event-list.module.css";


function EventList(props){
    const {items} = props;

    return(
        <ul className={styles.list}>
        {items.map(event => <EventItem
        id={event.id}
        title={event.title}
        image={event.image}
        date={event.date}
        location={event.location}
        key={event.id}
        />)}
        </ul>
    )
}
export default EventList;