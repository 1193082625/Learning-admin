import { Repository } from "@/Server/RepositoryService/RepositoryService";
import { IBook, IBookService } from "./IBookService";

export class BookService implements IBookService {
  private repository: Repository<IBook>;

  constructor() {
    this.repository = new Repository<IBook>("articles");
  }

  async searchBook(
    filter: Partial<IBook>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: IBook[], totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }
}