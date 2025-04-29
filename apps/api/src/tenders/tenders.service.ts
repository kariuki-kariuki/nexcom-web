import { Injectable } from '@nestjs/common';
import { UpdateTenderDto } from './dto/update-tender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tender } from './entities/tender.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class TendersService {
  constructor(
    @InjectRepository(Tender) private tenderRepository: Repository<Tender>,
    private readonly awsService: AwsService,
  ) {}
  async create(createTenderDto: any, file: Express.Multer.File) {
    const tenderFile = new Tender();
    tenderFile.name = createTenderDto.fileName;
    tenderFile.url = await this.awsService.uploadFile(file, 'tenders');
    const savedFile = await this.tenderRepository.save(tenderFile);
    savedFile.url = await this.awsService.getSignedURL(savedFile.url);
    return savedFile;
  }

  async findAll() {
    const files = await this.tenderRepository.find();
    const filesWithLink = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await this.awsService.getSignedURL(file.url),
      })),
    );
    return filesWithLink;
  }

  findOne(id: number) {
    return this.tenderRepository.findOneByOrFail({ id });
  }

  update(id: number, updateTenderDto: UpdateTenderDto) {
    updateTenderDto;
    return `This action updates a #${id} tender`;
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    return this.tenderRepository.remove(file);
  }
}
