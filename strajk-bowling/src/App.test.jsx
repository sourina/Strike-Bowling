import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import App from "./App";
import Shoes from "./components/Shoes/Shoes";
import { expect, it } from "vitest";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should have all input labels", () => {
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Number of awesome bowlers")).toBeInTheDocument();
    expect(screen.getByText("Number of lanes")).toBeInTheDocument();
  });

  it("should select current date", () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const input = screen.getByTestId("date_when");
    fireEvent.change(input, {
      target: { value: currentDate },
    });
    expect(input.value).toBe(currentDate);
  });

  it("should select future date", () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    const futureDate = currentDate.toISOString().split("T")[0];
    const input = screen.getByTestId("date_when");
    fireEvent.change(input, {
      target: { value: futureDate },
    });
    expect(input.value).toBe(futureDate);
  });

  it("should not select past date", () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const pastDate = currentDate.toISOString().split("T")[0];
    const input = screen.getByTestId("date_when");
    fireEvent.change(input, {
      target: { value: pastDate },
    });
    expect(input.value).toBe("");
  });

  it("time should always be number", () => {
    const input = screen.getByTestId("selected_time");
    const selectedtime = "ghj";
    fireEvent.change(input, {
      target: { value: selectedtime },
    });
    expect(input.value).toBe("");
  });

  it("hour range should always be between 0-24", () => {
    const input = screen.getByTestId("selected_time");
    const selectedtime = "30:00";
    fireEvent.change(input, {
      target: { value: selectedtime },
    });
    expect(input.value).toBe("");
  });

  it("minute range should always be between 0-60", () => {
    const input = screen.getByTestId("selected_time");
    const selectedtime = "10:80";
    fireEvent.change(input, {
      target: { value: selectedtime },
    });
    expect(input.value).toBe("");
  });

  it("number of bowlers should always be 1 or more", () => {
    const input = screen.getByTestId("no_of_bowlers");
    fireEvent.change(input, {
      target: { value: "0" },
    });
    expect(input.value).toBe("");
  });

  it("number of bowlers should always be number", () => {
    const input = screen.getByTestId("no_of_bowlers");
    fireEvent.change(input, {
      target: { value: "abc" },
    });
    expect(input.value).toBe("");
  });
  it("number of lanes should always be 1 or more", () => {
    const input = screen.getByTestId("no_of_lanes");
    fireEvent.change(input, {
      target: { value: "0" },
    });
    expect(input.value).toBe("");
  });
  it("number of bowlers should always be number", () => {
    const input = screen.getByTestId("no_of_lanes");
    fireEvent.change(input, {
      target: { value: "abc" },
    });
    expect(input.value).toBe("");
  });

  it("add shoe button opens a input box", async () => {
    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);
    await waitFor(() => {
      expect(screen.getByTestId("player_shoe_id_1")).toBeInTheDocument();
    });
  });

  it("shoe size must always be number", async () => {
    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);
    await waitFor(() => {
      const input = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(input, {
        target: { value: "abc" },
      });
      expect(input.value).toBe("");
    });
  });

  it("shoe size must be between 20 and 45", async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const when = screen.getByTestId("date_when");
    fireEvent.change(when, {
      target: { value: currentDate },
    });

    const time = screen.getByTestId("selected_time");
    const selectedtime = "12:00";
    fireEvent.change(time, {
      target: { value: selectedtime },
    });

    const bowler = screen.getByTestId("no_of_bowlers");
    fireEvent.change(bowler, {
      target: { value: "1" },
    });

    const lane = screen.getByTestId("no_of_lanes");
    fireEvent.change(lane, {
      target: { value: "1" },
    });

    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);

    await waitFor(() => {
      const input = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(input, {
        target: { value: "18" },
      });
    });
    const stikeBtn = screen.getByTestId("strike_btn");
    fireEvent.click(stikeBtn);
    await waitFor(() => {
      expect(screen.getByTestId("error_msg")).toBeInTheDocument();
    });

    await waitFor(() => {
      const input = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(input, {
        target: { value: "50" },
      });
    });
    const stikeBtn2 = screen.getByTestId("strike_btn");
    fireEvent.click(stikeBtn2);
    await waitFor(() => {
      expect(screen.getByTestId("error_msg")).toBeInTheDocument();
    });

    await waitFor(() => {
      const input = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(input, {
        target: { value: "30" },
      });
    });
    const stikeBtn1 = screen.getByTestId("strike_btn");
    fireEvent.click(stikeBtn1);
    await waitFor(() => {
      expect(screen.getByTestId("booking_no")).toBeInTheDocument();
      //  expect(screen.getByTestId("booking_no").value).toBe("STR3203CZTN");
    });
  });

  it("add shoe button opens a remove shoe option", async () => {
    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);
    await waitFor(() => {
      expect(screen.getByTestId("remove_shoe-btn")).toBeInTheDocument();
    });
  });

  it("remove shoe button removes shoe size input field", async () => {
    const addshoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(addshoebtn);

    const removeBtn = screen.getByTestId("remove_shoe-btn");
    fireEvent.click(removeBtn);
    await waitFor(() => {
      expect(screen.queryByTestId("player_shoe_id_1")).not.toBeInTheDocument();
    });
  });

  it("should get back a booking reference number", async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const when = screen.getByTestId("date_when");
    fireEvent.change(when, {
      target: { value: currentDate },
    });

    const time = screen.getByTestId("selected_time");
    const selectedtime = "12:00";
    fireEvent.change(time, {
      target: { value: selectedtime },
    });

    const bowler = screen.getByTestId("no_of_bowlers");
    fireEvent.change(bowler, {
      target: { value: "1" },
    });

    const lane = screen.getByTestId("no_of_lanes");
    fireEvent.change(lane, {
      target: { value: "1" },
    });

    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);

    await waitFor(() => {
      const input = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(input, {
        target: { value: "30" },
      });
    });
    const stikeBtn1 = screen.getByTestId("strike_btn");
    fireEvent.click(stikeBtn1);
    await waitFor(() => {
      expect(screen.getByTestId("booking_no").value).toBe("STR3203CZTN");
    });
  });

  it("show total price",async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const when = screen.getByTestId("date_when");
    fireEvent.change(when, {
      target: { value: currentDate },
    });

    const time = screen.getByTestId("selected_time");
    const selectedtime = "12:00";
    fireEvent.change(time, {
      target: { value: selectedtime },
    });

    const bowler = screen.getByTestId("no_of_bowlers");
    fireEvent.change(bowler, {
      target: { value: "2" },
    });

    const lane = screen.getByTestId("no_of_lanes");
    fireEvent.change(lane, {
      target: { value: "1" },
    });

    const shoebtn = screen.getByTestId("add_shoe-btn");
    fireEvent.click(shoebtn);
    fireEvent.click(shoebtn);
    await waitFor(() => {
      const player1Shoe = screen.getByTestId("player_shoe_id_1");
      fireEvent.change(player1Shoe, {
        target: { value: "30" },
      });
      const player2Shoe = screen.getByTestId("player_shoe_id_2");
      fireEvent.change(player2Shoe, {
        target: { value: "30" },
      });
    });
   
    const stikeBtn1 = screen.getByTestId("strike_btn");
    fireEvent.click(stikeBtn1);
    await waitFor(() => {
      expect(screen.getByTestId("total_price").textContent).toBe(340+" sek");
    });
  });


});


