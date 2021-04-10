import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IServiceEntity } from 'src/shared/interfaces';

@Injectable()
export class ServicesService extends InMemoryDbService<IServiceEntity> {
  constructor() {
    super();

    this.createMany([
      {
        name: 'Маникюр',
        description: 'Аппаратный, комбинированный или классический.',
        price: 1200,
      },
      {
        name: 'Покрытие гель-лак',
        description: 'Гель-лак наносится в несколько слоев с использование базы и топа. Каждый слой полимеризуется в LED-лампе.',
        price: 1200,
      },
      {
        name: 'Бразильский маникюр',
        description: 'Выполняется в одноразовых перчатках наполненных увлажняющим лосьоном.',
        price: 1200,
      },
      {
        name: 'Педикюр',
        description: 'Аппаратный, комбинированный или классический.',
        price: 1200,
      },
      {
        name: 'Парафинотерапия',
        description: 'Благодаря этой процедуре увлажнение кожи увеличивается на 80%, также выводит токсины и укрепляет суставы.',
        price: 1200,
      },
      {
        name: 'Женская стрижка',
        description: 'Короткие волосы',
        price: 1200,
      },
      {
        name: 'Мужская стрижка',
        description: 'Короткие волосы',
        price: 1200,
      },
      {
        name: 'Женская стрижка',
        description: 'Короткие волосы',
        price: 1200,
      },
      {
        name: 'Детский Стиль',
        description: 'Короткие волосы',
        price: 1200,
      },
      {
        name: 'Креативный Стиль',
        description: 'Короткие волосы',
        price: 1200,
      },
      {
        name: 'Экспресс укладка',
        description: 'Короткие волосы',
        price: 1200,
      },
    ]);
  }
}
