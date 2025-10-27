import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
    private awsService: AwsService,
  ) {}
  create(createGalleryDto: CreateGalleryDto) {
    const gallery = this.galleryRepository.create(createGalleryDto);

    return this.galleryRepository.save(gallery);
  }

  async findAll() {
    const galleries = await this.galleryRepository.find({
      relations: {
        images: true,
      },
    });

    return galleries;
  }

  async findOne(id: number) {
    return this.galleryRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    const gallery = await this.findOne(id);
    const { name = gallery.name } = updateGalleryDto;
    gallery.name = name;
    return this.galleryRepository.save(gallery);
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
