import Snippet, { ISnippet } from '../models/snippet.model';
import { generateSummary } from './ai/ai.service';

export const createSnippet = async (text: string): Promise<ISnippet> => {
  const summary = await generateSummary(text);
  const snippet = new Snippet({ text, summary });
  return snippet.save();
};

export const getSnippetById = async (id: string): Promise<ISnippet | null> => {
  return Snippet.findById(id).exec();
};
