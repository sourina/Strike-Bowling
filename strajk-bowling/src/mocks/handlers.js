import { http, HttpResponse } from "msw";

export const handlers = [
  // http.get('https://jsonplaceholder.typicode.com/todos', () => {
  //   return HttpResponse.json(todos);
  // }),
  http.post("https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com", () => {
    console.log("handlers");
    return HttpResponse.json({
      when: "2024-05-30T10:35",
      lanes: "1",
      people: "2",
      shoes: ["20", "30"],
      price: 340,
      id: "STR3203CZTN",
      active: true,
    });
  }),
];
