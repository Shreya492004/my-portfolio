import { Module } from "@nestjs/common";
import { ContactController } from "./contact/contact.controller";
import { ContactService } from "./contact/contact.service";

@Module({
  imports: [],
  controllers: [ContactController],
  providers: [ContactService],
})
export class AppModule {}
