import {  v4 as uuidV4 } from 'uuid';
import { supabase } from './supabase';

// Função para upload de múltiplos arquivos no Supabase Storage
export const uploadFilesToStorage = async (bucketName: string, files: File[], nameFolder: string) => {

  // Faz o upload de todos os arquivos na pasta criada
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const fileName = `${nameFolder}/${uuidV4()}-${file.name}`;
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
      }

      return fileName; // Retorna o caminho do arquivo para uso posterior
    })
  );

  return {
    uploadedFiles, // Retorna a lista de arquivos carregados
  };
};

export const uploadNewFilesToStorage = async (bucketName: string, files: File[], nameFolder: string) => {

  // Faz o upload de todos os arquivos na pasta criada
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const fileName = `${nameFolder}/${uuidV4()}-${file.name}`;
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
      }

      return fileName; // Retorna o caminho do arquivo para uso posterior
    })
  );

  return {
    uploadedFiles, // Retorna a lista de arquivos carregados
  };
};

// Função para deletar uma pasta com todos os arquivos
export const deleteFolderFromStorage = async (bucketName: string, nameFolder: string) => {
  try {
    // Lista todos os arquivos dentro da pasta
    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list(nameFolder, { limit: 100 });

    if (listError) {
      throw new Error(`Error listing files: ${listError.message}`);
    }

    if (!files || files.length === 0) {
      console.log('Folder is empty or does not exist');
      return;
    }

    // Mapeia os caminhos completos dos arquivos para deletá-los
    const filesToDelete = files.map((file) => `${nameFolder}/${file.name}`);

    // Deleta os arquivos listados
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove(filesToDelete);

    if (deleteError) {
      throw new Error(`Error deleting files: ${deleteError.message}`);
    }

    console.log(`Folder "${nameFolder}" and all its files have been deleted.`);
  } catch (error) {
    console.error('Error deleting folder:', error);
  }
};