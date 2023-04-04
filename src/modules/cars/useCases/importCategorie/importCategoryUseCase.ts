import fs from 'fs'
import { parse as csvParse } from 'csv-parse'
import { CategoriesRepositoryProps } from '../../repositories/InterfaceCategoriesRepository'

class ImportCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}
  // eslint-disable-next-line no-undef
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path)
    const parseFile = csvParse({})

    /* a cada pedaco do arquivo lido ele manda para o local que voce escolhar */
    stream.pipe(parseFile)

    parseFile.on('data', async (line) => {
      console.log(line)
    })
  }
}

export { ImportCategoryUseCase }
