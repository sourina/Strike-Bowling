import { useState } from "react";
import "./Booking.scss";

import BookingInfo from "../components/BookingInfo/BookingInfo";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Navigation from "../components/Navigation/Navigation";
import Shoes from "../components/Shoes/Shoes";
import Top from "../components/Top/Top";
import Confirmation from "../components/Confirmation/Confirmation";

function Booking() {
  const [booking, setBooking] = useState({
    when: "",
    time: "",
    lanes: 0,
    people: 0,
  });
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState({});

  function updateBookingDetails(event) {
    if (event.target.name === "when" && event.target.value !== "") {
      validateDate(event);
    }
    if (event.target.name === "people" && event.target.value !== "") {
      validatePeople(event);
    }
    if (event.target.name === "lanes" && event.target.value !== "") {
      validateLane(event);
    }

    const { name, value } = event.target;
    setError(false);

    setBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function validateDate(event) {
    const currentDate = new Date().toISOString().split("T")[0];
    if (event.target.value < currentDate) {
      return (event.target.value = "");
    }
  }

  function validatePeople(event) {
    if (event.target.value < 1) {
      return (event.target.value = "");
    }
  }
  function validateLane(event) {
    if (event.target.value < 1) {
      return (event.target.value = "");
    }
  }

  function updateSize(event) {
    const { value, name } = event.target;
    console.log("value", value);
    setError(false);
      if (value.length === 2 || value.length === 0) {
        setShoes((prevState) =>
          prevState.map((shoe) =>
            shoe.id === name ? { ...shoe, size: value } : shoe
          )
        );
      }
    
  }

  function addShoe(name) {
    console.log("name", name);
    setError(false);

    setShoes([...shoes, { id: name, size: "" }]);
  }

  function removeShoe(name) {
    console.log("nameR", name);
    setError(false);

    setShoes(shoes.filter((shoe) => shoe.id !== name));
  }

  function isShoeSizesFilled() {
    let filled = true;

    shoes.map((shoe) => (shoe.size.length > 0 ? filled : (filled = false)));

    return filled;
  }

  function checkShoeSize() {
    let valid = true;

    shoes.map((shoe) => (shoe.size >=20 && shoe.size<=45 ? valid : (valid = false)));

    return valid;
  }

  function checkPlayersAndLanes() {
    const MAX_PLAYERS_PER_LANE = 4;
    const maxPlayersAllows = booking.lanes * MAX_PLAYERS_PER_LANE;

    if (booking.people <= maxPlayersAllows) return true;

    return false;
  }

  async function sendBooking(bookingInfo) {
    const response = await fetch(
      "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
      {
        method: "POST",
        headers: {
          "x-api-key": "738c6b9d-24cf-47c3-b688-f4f4c5747662",
        },
        body: JSON.stringify(bookingInfo),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  }

  function comparePeopleAndShoes() {
    return parseInt(booking.people) === shoes.length;
  }

  async function book() {
    if (
      booking.when &&
      booking.lanes &&
      booking.time &&
      shoes.length > 0 &&
      comparePeopleAndShoes() &&
      isShoeSizesFilled() &&
      checkShoeSize() &&
      checkPlayersAndLanes()
    ) {
      const bookingInfo = {
        when: `${booking.when}T${booking.time}`,
        lanes: booking.lanes,
        people: booking.people,
        shoes: shoes.map((shoe) => shoe.size),
      };

      const confirmation = await sendBooking(bookingInfo);
      setConfirmation(confirmation);
    } else {
      setError(true);
    }
  }

  return (
    <main>
      {!confirmation?.active ? (
        <section className="booking">
          <Navigation setConfirmation={setConfirmation} />
          <Top title="Booking" />
          <BookingInfo updateBookingDetails={updateBookingDetails} />
          <Shoes
            updateSize={updateSize}
            addShoe={addShoe}
            removeShoe={removeShoe}
            shoes={shoes}
          />
          <button
            data-testid="strike_btn"
            className="button booking__button"
            onClick={book}
          >
            strIIIIIike!
          </button>
          {error ? <ErrorMessage /> : ""}
        </section>
      ) : (
        <Confirmation
          confirmationDetails={confirmation}
          setConfirmation={setConfirmation}
        />
      )}
    </main>
  );
}

export default Booking;
