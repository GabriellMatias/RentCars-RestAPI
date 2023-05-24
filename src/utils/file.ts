import fs from 'fs'
export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename)
  } catch {}

  /* responsavel por remover o arquivo que tem o msm nome, ou sej, que ja existe */
  await fs.promises.unlink(filename)
}
