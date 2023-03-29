import app from "./app";
import { connectDatabase } from "./database";
import "dotenv/config";

const port = process.env.APP_PORT!;

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Server running on http://localhost:${port}`);
});
