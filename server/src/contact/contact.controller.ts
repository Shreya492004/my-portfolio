import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  BadRequestException,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@Controller("api/contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleContact(@Body() createContactDto: CreateContactDto) {
    try {
      const result = await this.contactService.sendContactEmail(createContactDto);
      return result;
    } catch (error: any) {
      throw new BadRequestException(
        error.message || "Unable to send email via SMTP at this time."
      );
    }
  }
}
