import axios from "axios";
import "dotenv/config";

it("should return a code statut 200", async () => {
  expect(
    await axios
      .get(`http://localhost:8080/api/service`)
      .then((res) => res.status)
  ).toBe(200);
});
