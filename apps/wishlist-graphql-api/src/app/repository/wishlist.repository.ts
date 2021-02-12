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
    endpoint: `http://${process.env.DYNAMODB_HOST}:8000`,
    accessKeyId: 'fakeMyKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
  });
  private readonly tableName = 'wishlist';

  async create(params: CreateWishlistItemParams): Promise<WishlistItem> {
    const id = `${new Date().valueOf()}${Math.floor(Math.random() * 100)}`;
    const putParams: DynamoDB.PutItemInput = {
      Item: {
        id: {
          N: id,
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
      id: Number(id),
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
        id: Number(item.id.N),
        title: item.title.S,
        description: item.description.S,
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
          N: `${id}`,
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
          N: `${id}`,
        },
      },
      TableName: this.tableName,
    };
    await this.dynamodb.deleteItem(deleteParams).promise();
    return id;
  }
}
