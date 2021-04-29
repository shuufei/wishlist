import { DynamoDB } from 'aws-sdk';
import { WishlistItem as _WishlistItem } from '@wishlist/shared/domain';

export type WishlistItem = _WishlistItem;
export type CreateWishlistItemParams = Pick<
  WishlistItem,
  'title' | 'description'
>;

export type UpdateWishlistItemParams = CreateWishlistItemParams;

export class WishlistRepository {
  private readonly dynamodb = new DynamoDB({
    region: 'us-west-2',
    // endpoint: `http://${process.env.DYNAMODB_HOST}:8000`,
    endpoint: `http://localhost:8000`,
    accessKeyId: 'fakeMyKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
  });
  private readonly tableName = 'wishlist';

  async create(params: CreateWishlistItemParams): Promise<WishlistItem> {
    const id = `${new Date().valueOf()}${Math.floor(Math.random() * 100)}`;
    const putParams: DynamoDB.PutItemInput = {
      Item: {
        id: {
          S: id,
        },
        title: {
          S: params.title,
        },
        description: {
          S: params.description,
        },
      },
      TableName: this.tableName,
    };
    await this.dynamodb.putItem(putParams).promise();
    return {
      id,
      title: params.title,
      description: params.description,
    };
  }

  async list(): Promise<WishlistItem[]> {
    const scanParams: DynamoDB.ScanInput = {
      TableName: this.tableName,
    };
    const res = await this.dynamodb.scan(scanParams).promise();
    return (
      res.Items?.map((item) => ({
        id: item.id.S as string,
        title: item.title.S as string,
        description: item.description.S as string,
      })) ?? []
    );
  }

  async update(
    id: WishlistItem['id'],
    params: UpdateWishlistItemParams
  ): Promise<WishlistItem> {
    const putParams: DynamoDB.PutItemInput = {
      Item: {
        id: {
          S: `${id}`,
        },
        title: {
          S: params.title,
        },
        description: {
          S: params.description,
        },
      },
      TableName: this.tableName,
    };
    await this.dynamodb.putItem(putParams).promise();
    return {
      id,
      title: params.title,
      description: params.description,
    };
  }

  async delete(id: WishlistItem['id']): Promise<WishlistItem['id']> {
    const deleteParams: DynamoDB.DeleteItemInput = {
      Key: {
        id: {
          S: `${id}`,
        },
      },
      TableName: this.tableName,
    };
    await this.dynamodb.deleteItem(deleteParams).promise();
    return id;
  }
}

export class MockWishlistRepository {
  async create(): ReturnType<WishlistRepository['create']> {
    return {
      id: 'mock id',
      title: 'mock title',
      description: 'mock description',
    };
  }

  async list(): ReturnType<WishlistRepository['list']> {
    return [
      {
        id: 'mock id',
        title: 'mock title',
        description: 'mock description',
      },
    ];
  }

  async update(): ReturnType<WishlistRepository['update']> {
    return {
      id: 'mock id',
      title: 'mock title',
      description: 'mock description',
    };
  }

  async delete(): ReturnType<WishlistRepository['delete']> {
    return 'id';
  }
}
