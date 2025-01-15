import { supabase } from './supabase';
//import { Form } from '~/interfaces/FormInterface';

export const insertData = async (table: string, data: any) => {
  const { error } = await supabase.from(table).insert(data);
  return { error };
}

export const getData = async (table: string, name: string) => {
  const { data, error } = await supabase.from(table).select("*").eq("name", name);
  return { data, error };
}

export const updateData = async (table: string, name: string, data: any) => {
  const { error } = await supabase.from(table).update(data).match({ name: name });
  return { error };
}

export const deleteData = async (table: string, name: string) => {
  const { error } = await supabase.from(table).delete().match({ name: name });
  return { error };
}