import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so Vite frontend (localhost:5173 / localhost:5174 etc) can connect seamlessly
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`\n🚀 NestJS Portfolio Backend with SMTP Mailer is running on http://localhost:${port}`);
  console.log(`📬 Contact endpoint: POST http://localhost:${port}/api/contact\n`);
}

bootstrap();
