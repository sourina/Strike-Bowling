import "./BookingInfo.scss";

import Input from "../Input/Input";

function BookingInfo({ updateBookingDetails }) {
  return (
    <section className="booking-info">
      <header>
        <h2 className="booking-info__heading">When, WHAT & Who</h2>
      </header>
      <form className="booking-info__details">
        <section className="booking-info__when">
          <Input
            testId='date_when'
            label="Date"
            type="date"
            customClass="booking-info__date"
            name="when"
            handleChange={updateBookingDetails}
          />
          <Input
            testId='selected_time'
            label="Time"
            type="time"
            name="time"
            handleChange={updateBookingDetails}
          />
        </section>
        <Input
          testId='no_of_bowlers'
          label="Number of awesome bowlers"
          type="number"
          customClass="booking-info__who"
          name="people"
          handleChange={updateBookingDetails}
        />
        <Input
          testId='no_of_lanes'
          label="Number of lanes"
          type="number"
          customClass="booking-info__lanes"
          name="lanes"
          handleChange={updateBookingDetails}
        />
      </form>
    </section>
  );
}

export default BookingInfo;
