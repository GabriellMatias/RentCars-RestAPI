import fs from 'fs'
import { parse as csvParse } from 'csv-parse'
import { CategoriesRepositoryProps } from '../../repositories/implementations/InterfaceCategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface ImportCategoryProps {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProps,
  ) {}

  async loadCategories(
    // eslint-disable-next-line no-undef
    file: Express.Multer.File,
  ): Promise<ImportCategoryProps[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse({})
      const categories: ImportCategoryProps[] = []

      /* a cada pedaco do arquivo lido ele manda para o local que voce escolhar */
      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          /* removendo arquivo apos a utilizacao */
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  // eslint-disable-next-line no-undef
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map(async (category) => {
      const { name, description } = category
      const categoryExists = await this.categoriesRepository.findByName(name)

      if (!categoryExists) {
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
