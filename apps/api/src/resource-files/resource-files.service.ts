import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UpdateResourceFileDto } from './dto/update-resource-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceFile } from './entities/resource-file.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ResourceFilesService {
  constructor(
    @InjectRepository(ResourceFile)
    private resourceFileRepository: Repository<ResourceFile>,
    private awsService: AwsService,
  ) {}
  async create(createResourceFileDto: any, file: Express.Multer.File) {
    const resourceFile = new ResourceFile();
    resourceFile.name = createResourceFileDto.fileName;
    resourceFile.url = await this.awsService.uploadFile(file, 'resources');
    const savedFile = await this.resourceFileRepository.save(resourceFile);
    savedFile.url = await this.awsService.getSignedURL(savedFile.url);
    return savedFile;
  }

  async findAll() {
    const files = await this.resourceFileRepository.find();
    const filesWithLink = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await this.awsService.getSignedURL(file.url),
      })),
    );
    return filesWithLink;
  }

  findOne(id: number) {
    return this.resourceFileRepository.findOneByOrFail({ id });
  }

  update(id: number, updateResourceFileDto: UpdateResourceFileDto) {
    updateResourceFileDto;
    return `This action updates a #${id} resourceFile`;
  }

  async remove(id: number) {
    const file = await this.findOne(id);
    try {
      await this.awsService.deleteImage(file.url);
    } catch (e) {
      throw new UnprocessableEntityException('Failed to delete image');
    }
    return this.resourceFileRepository.remove(file);
  }
}
